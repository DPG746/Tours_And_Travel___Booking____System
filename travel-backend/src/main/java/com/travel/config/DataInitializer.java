package com.travel.config;

import com.travel.entity.User;
import com.travel.entity.User.Role;
import com.travel.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (!userRepository.existsByUsername("admin")) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setEmail("admin@travelwise.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setFullName("Admin User");
            admin.setRole(Role.ADMIN);
            userRepository.save(admin);
            System.out.println(">>> Admin user created: admin / admin123");
        }

        if (!userRepository.existsByUsername("user")) {
            User user = new User();
            user.setUsername("user");
            user.setEmail("user@travelwise.com");
            user.setPassword(passwordEncoder.encode("user123"));
            user.setFullName("Demo User");
            user.setPhone("+1 555-0123");
            user.setRole(Role.USER);
            userRepository.save(user);
            System.out.println(">>> Demo user created: user / user123");
        }
    }
}

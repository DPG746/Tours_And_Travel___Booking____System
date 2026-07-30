package com.travel.controller;

import com.travel.entity.Booking;
import com.travel.entity.User;
import com.travel.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/booking")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody Booking booking,
                                           @AuthenticationPrincipal User user) {
        if (user != null) {
            booking.setUserId(user.getId());
            booking.setUsername(user.getUsername());
        }
        Booking saved = bookingService.createBooking(booking);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    @GetMapping("/my-bookings")
    public ResponseEntity<List<Booking>> getMyBookings(@AuthenticationPrincipal User user) {
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(bookingService.getBookingsByUserId(user.getId()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
        return ResponseEntity.ok("Booking deleted successfully");
    }

    @DeleteMapping("/all")
    public ResponseEntity<String> deleteAllBookings() {
        bookingService.deleteAllBookings();
        return ResponseEntity.ok("All bookings deleted successfully");
    }
}

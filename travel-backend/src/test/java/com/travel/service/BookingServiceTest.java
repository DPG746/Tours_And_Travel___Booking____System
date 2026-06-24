package com.travel.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.travel.entity.Booking;
import com.travel.repository.BookingRepository;

@ExtendWith(MockitoExtension.class)
class BookingServiceTest {

    @Mock
    private BookingRepository bookingRepository;

    @InjectMocks
    private BookingService bookingService;

    @Test
    void createBooking_shouldSaveAndReturnBooking() {
        Booking booking = new Booking();
        booking.setFullName("John Doe");
        booking.setEmail("john@example.com");

        Booking savedBooking = new Booking();
        savedBooking.setId(1L);
        savedBooking.setFullName("John Doe");
        savedBooking.setEmail("john@example.com");

        when(bookingRepository.save(booking)).thenReturn(savedBooking);

        Booking result = bookingService.createBooking(booking);

        assertThat(result).isEqualTo(savedBooking);
    }

    @Test
    void getAllBookings_shouldReturnList() {
        Booking booking = new Booking();
        booking.setId(1L);
        booking.setFullName("Jane Doe");

        when(bookingRepository.findAll()).thenReturn(List.of(booking));

        List<Booking> result = bookingService.getAllBookings();

        assertThat(result).hasSize(1);
        assertThat(result.get(0).getFullName()).isEqualTo("Jane Doe");
    }

    @Test
    void deleteBooking_shouldCallRepositoryDeleteById() {
        bookingService.deleteBooking(42L);

        verify(bookingRepository).deleteById(42L);
    }

    @Test
    void deleteAllBookings_shouldCallRepositoryDeleteAll() {
        bookingService.deleteAllBookings();

        verify(bookingRepository).deleteAll();
    }
}

package com.travel.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.travel.entity.Booking;
import com.travel.service.BookingService;

@WebMvcTest(BookingController.class)
class BookingControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private BookingService bookingService;

    @Test
    void createBooking_shouldReturnCreatedBooking() throws Exception {
        Booking booking = new Booking();
        booking.setFullName("John Doe");
        booking.setEmail("john@example.com");

        Booking savedBooking = new Booking();
        savedBooking.setId(1L);
        savedBooking.setFullName("John Doe");
        savedBooking.setEmail("john@example.com");

        when(bookingService.createBooking(any(Booking.class))).thenReturn(savedBooking);

        mockMvc.perform(post("/api/booking")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(booking)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.fullName").value("John Doe"))
                .andExpect(jsonPath("$.email").value("john@example.com"));
    }

    @Test
    void getAllBookings_shouldReturnBookingList() throws Exception {
        Booking booking = new Booking();
        booking.setId(1L);
        booking.setFullName("Jane Doe");

        when(bookingService.getAllBookings()).thenReturn(List.of(booking));

        mockMvc.perform(get("/api/booking"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].fullName").value("Jane Doe"));
    }

    @Test
    void deleteBooking_shouldReturnSuccessMessage() throws Exception {
        doNothing().when(bookingService).deleteBooking(eq(1L));

        mockMvc.perform(delete("/api/booking/1"))
                .andExpect(status().isOk())
                .andExpect(content().string("Booking deleted successfully"));
    }

    @Test
    void deleteAllBookings_shouldReturnSuccessMessage() throws Exception {
        doNothing().when(bookingService).deleteAllBookings();

        mockMvc.perform(delete("/api/booking/all"))
                .andExpect(status().isOk())
                .andExpect(content().string("All bookings deleted successfully"));
    }
}

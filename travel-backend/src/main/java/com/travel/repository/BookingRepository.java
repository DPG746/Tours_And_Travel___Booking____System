package com.travel.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.travel.entity.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {
}

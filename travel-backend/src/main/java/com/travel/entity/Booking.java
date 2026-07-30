package com.travel.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "booking")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;
    private String email;
    private String phone;
    private String travelers;
    private String startDate;
    private String endDate;
    private String specialRequests;

    private Long destinationId;
    private String destinationName;

    private Long userId;
    private String username;
}

package com.codecool.lookatthis.models;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "location")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Location {

    @Id
    @Column(name="id", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="title", nullable = false)
    private String title;

    @Column(name="message", nullable = false)
    private String message;

    @Column(name="image", nullable = false)
    private byte[] imageData;

    @Column(name="latitude", nullable = false)
    private double latitude;

    @Column(name="longitude", nullable = false)
    private double longitude;
}

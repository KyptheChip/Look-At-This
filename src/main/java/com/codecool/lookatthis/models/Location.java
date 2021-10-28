package com.codecool.lookatthis.models;

import javax.persistence.*;

@Entity
@Table(name = "locations_table")
public class Location {

    @Id
    @Column(name="id", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name="title", nullable = false)
    private String title;

    @Column(name="message", nullable = false)
    private String message;

    @Column(name="image")
    private byte[] imageData;

    public Location(String title, String message, byte[] imageData) {
        this.title = title;
        this.message = message;
        this.imageData = imageData;
    }

    public Location() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public byte[] getImageData() {
        return imageData;
    }

    public void setImageData(byte[] imageUrl) {
        this.imageData = imageUrl;
    }


    @Override
    public String toString() {
        return "Location{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", message='" + message + '\'' +
                ", imageUrl='" + imageData + '\'' +
                '}';
    }
}

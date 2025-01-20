package com.example.auth_service.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role; // Admin, Artisan, User

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String username;

    @Column
    private String phone;

    @Column
    private String address;

    @Column
    private String workType; // Only for ARTISAN

    @Column(length = 1000)
    private String description; // Only for ARTISAN

    @Column(nullable = false)
    private Boolean isApproved = false; // For Artisan approval

    // Default constructor (required for JPA)
    public User() {}

    // Constructor for common attributes (Admin, User, and Artisan)
    public User(String email, String password, String role, String name, String username) {
        this.email = email;
        this.password = password;
        this.role = role;
        this.name = name;
        this.username = username;
    }

    // Constructor for Artisan-specific attributes
    public User(String email, String password, String role, String name, String username, String phone, String address, String workType, String description, Boolean isApproved) {
        this.email = email;
        this.password = password;
        this.role = role;
        this.name = name;
        this.username = username;
        this.phone = phone;
        this.address = address;
        this.workType = workType;
        this.description = description;
        this.isApproved = isApproved;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getWorkType() {
        return workType;
    }

    public void setWorkType(String workType) {
        this.workType = workType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getIsApproved() {
        return isApproved;
    }

    public void setIsApproved(Boolean isApproved) {
        this.isApproved = isApproved;
    }
}
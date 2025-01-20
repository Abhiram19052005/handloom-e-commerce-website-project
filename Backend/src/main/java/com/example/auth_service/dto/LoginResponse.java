package com.example.auth_service.dto;

public class LoginResponse {
    private String email;
    private String role;
    private boolean isApproved;

    public LoginResponse(String email, String role, boolean isApproved) {
        this.email = email;
        this.role = role;
        this.isApproved = isApproved;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }

    public boolean isApproved() {
        return isApproved;
    }
}
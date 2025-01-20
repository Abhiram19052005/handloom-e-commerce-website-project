package com.example.auth_service.controller;

import com.example.auth_service.entity.User;
import com.example.auth_service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    // User Registration
    @PostMapping("/signup")
    public ResponseEntity<User> signup(@RequestBody User user) {
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("USER");
        }
        User registeredUser = userService.registerUser(user);
        return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
    }

    // User Login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        try {
            User user = userService.authenticateUser(loginRequest.getEmail(), loginRequest.getPassword());
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    // Fetch All Users (Admin Feature)
    @GetMapping("/admin/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    // Approve Artisan Account (Admin Feature)
    @PutMapping("/admin/users/approve-artisan")
    public ResponseEntity<?> approveArtisan(@RequestParam Long id) {
        try {
            User updatedArtisan = userService.approveArtisan(id);
            return ResponseEntity.ok(updatedArtisan);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // Update User Profile
    @PutMapping("/user/update-profile")
    public ResponseEntity<?> updateUserProfile(@RequestBody User user) {
        try {
            User updatedUser = userService.updateUserProfile(user);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating profile: " + e.getMessage());
        }
    }

    // Update Artisan Profile
    @PutMapping("/artisan/update-profile")
    public ResponseEntity<?> updateArtisanProfile(@RequestBody User artisan) {
        try {
            User updatedArtisan = userService.updateArtisanProfile(artisan);
            return ResponseEntity.ok(updatedArtisan);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating profile: " + e.getMessage());
        }
    }

    // Get User Profile (For Both User and Artisan)
    @GetMapping("/{userType}/profile")
    public ResponseEntity<User> getProfile(@PathVariable String userType, @RequestParam String email) {
        try {
            User user = userService.getUserByEmail(email);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}
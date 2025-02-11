package com.example.auth_service.service;

import com.example.auth_service.entity.User;
import com.example.auth_service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Register a new user
    public User registerUser(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("User already exists with email: " + user.getEmail());
        }

        // If the user is an artisan, set isApproved to false by default
        if ("ARTISAN".equalsIgnoreCase(user.getRole())) {
            user.setIsApproved(false);
        }

        return userRepository.save(user);
    }

    // Authenticate user login
    public User authenticateUser(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid credentials.");
        }

        if ("ARTISAN".equalsIgnoreCase(user.getRole()) && !user.getIsApproved()) {
            throw new RuntimeException("Your artisan account is not approved yet.");
        }

        return user;
    }

    // Update user profile
    public User updateUserProfile(User updatedUser) {
        User existingUser = userRepository.findByEmail(updatedUser.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found with email: " + updatedUser.getEmail()));

        existingUser.setName(updatedUser.getName());
        existingUser.setPhone(updatedUser.getPhone());
        existingUser.setAddress(updatedUser.getAddress());

        return userRepository.save(existingUser);
    }

    // Update artisan profile
    public User updateArtisanProfile(User updatedArtisan) {
        User existingArtisan = userRepository.findByEmail(updatedArtisan.getEmail())
                .orElseThrow(() -> new RuntimeException("Artisan not found with email: " + updatedArtisan.getEmail()));

        existingArtisan.setName(updatedArtisan.getName());
        existingArtisan.setPhone(updatedArtisan.getPhone());
        existingArtisan.setAddress(updatedArtisan.getAddress());
        existingArtisan.setWorkType(updatedArtisan.getWorkType());
        existingArtisan.setDescription(updatedArtisan.getDescription());

        return userRepository.save(existingArtisan);
    }

    // Approve artisan by ID (Admin functionality)
    public User approveArtisan(Long id) {
        User artisan = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Artisan not found with ID: " + id));

        artisan.setIsApproved(true);
        return userRepository.save(artisan);
    }

    // Fetch all users (Admin functionality)
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get user details by email
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    }
}
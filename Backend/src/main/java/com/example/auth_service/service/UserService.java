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
            throw new RuntimeException("Artisan account is not approved by the admin.");
        }

        return user;
    }


    public User updateUserProfile(User updatedUser) {
        User existingUser = userRepository.findByEmail(updatedUser.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found with email: " + updatedUser.getEmail()));

        System.out.println("Existing User: " + existingUser); // Debugging
        System.out.println("Updated User Data: " + updatedUser); // Debugging

        // Update fields
        existingUser.setName(updatedUser.getName());
        existingUser.setPhone(updatedUser.getPhone());
        existingUser.setAddress(updatedUser.getAddress());

        User savedUser = userRepository.save(existingUser);
        System.out.println("Saved User: " + savedUser); // Debugging

        return savedUser;
    }

    // Update artisan profile
    public User updateArtisanProfile(User updatedArtisan) {
        User existingArtisan = userRepository.findByEmail(updatedArtisan.getEmail())
                .orElseThrow(() -> new RuntimeException("Artisan not found with email: " + updatedArtisan.getEmail()));

        System.out.println("Existing Artisan: " + existingArtisan); // Debugging
        System.out.println("Updated Artisan Data: " + updatedArtisan); // Debugging

        // Update fields
        existingArtisan.setName(updatedArtisan.getName());
        existingArtisan.setPhone(updatedArtisan.getPhone());
        existingArtisan.setAddress(updatedArtisan.getAddress());
        existingArtisan.setWorkType(updatedArtisan.getWorkType());
        existingArtisan.setDescription(updatedArtisan.getDescription());

        User savedArtisan = userRepository.save(existingArtisan);
        System.out.println("Saved Artisan: " + savedArtisan); // Debugging

        return savedArtisan;
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
package com.example.auth_service.config;

import com.example.auth_service.entity.User;
import com.example.auth_service.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AdminConfig {

    @Bean
    public CommandLineRunner createAdmin(UserRepository userRepository) {
        return args -> {
            // Check if the admin user already exists
            if (userRepository.findByEmail("admin@gmail.com").isEmpty()) {
                // Provide a value for username
                User admin = new User(
                    "admin@gmail.com",    // Email
                    "admin123",           // Password (plain text)
                    "ADMIN",              // Role
                    "Admin User",         // Name
                    "admin"               // Username (non-nullable)
                );
                userRepository.save(admin);
            }
        };
    }
}
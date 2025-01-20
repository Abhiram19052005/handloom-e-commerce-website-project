package com.example.auth_service.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.auth_service.entity.PaymentRequest;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {

    @PostMapping("/process")
    public ResponseEntity<String> processPayment(@RequestBody PaymentRequest paymentRequest) {
        // Validate card details (you can add more complex validation here)
        if (paymentRequest.getCardDetails().getCardNumber().length() != 16) {
            return ResponseEntity.badRequest().body("Invalid card number.");
        }

        // Simulate payment processing
        System.out.println("Processing payment for: " + paymentRequest.getEmail());
        System.out.println("Amount: $" + paymentRequest.getAmount());

        return ResponseEntity.ok("Payment successful!");
    }
}
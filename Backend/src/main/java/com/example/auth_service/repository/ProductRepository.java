package com.example.auth_service.repository;

import com.example.auth_service.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // Fetch products by Artisan email
    List<Product> findByUploadedBy(String uploadedBy);

    // Fetch products by approval status
    List<Product> findByIsApproved(boolean isApproved);

    // Fetch a product by its name
    Optional<Product> findByName(String name);

    // Fetch rejected products for a specific artisan
    List<Product> findAllByUploadedByAndIsRejected(String uploadedBy, boolean isRejected);
}
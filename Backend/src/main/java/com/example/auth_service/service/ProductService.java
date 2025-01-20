package com.example.auth_service.service;

import com.example.auth_service.entity.Product;
import com.example.auth_service.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // Add a new product
    public Product addProduct(Product product) {
        product.setApproved(false); // Default to not approved
        return productRepository.save(product);
    }

    // Get all products
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Get products uploaded by a specific Artisan
    public List<Product> getProductsByArtisan(String uploadedBy) {
        return productRepository.findByUploadedBy(uploadedBy);
    }

    // Approve a product
    public Product approveProduct(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + productId));
        product.setApproved(true); // Set product as approved
        return productRepository.save(product);
    }

    // Get approved products
    public List<Product> getApprovedProducts() {
        return productRepository.findByIsApproved(true);
    }

    // Get unapproved (pending) products
    public List<Product> getPendingProducts() {
        return productRepository.findByIsApproved(false);
    }

    // Get a single product by ID
    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));
    }

    // Update product details
    public Product updateProduct(Long productId, Product updatedProduct) {
        Product existingProduct = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + productId));

        // Update only non-null fields
        if (updatedProduct.getName() != null) {
            existingProduct.setName(updatedProduct.getName());
        }
        if (updatedProduct.getDescription() != null) {
            existingProduct.setDescription(updatedProduct.getDescription());
        }
        if (updatedProduct.getPrice() != null) {
            existingProduct.setPrice(updatedProduct.getPrice());
        }
        if (updatedProduct.getImage() != null) {
            existingProduct.setImage(updatedProduct.getImage());
        }

        // Reset approval status
        existingProduct.setApproved(false);

        return productRepository.save(existingProduct);
    }
    public Product rejectProduct(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        product.setRejected(true);
        return productRepository.save(product);
    }
    public List<Product> getRejectedProducts(String artisanEmail) {
        return productRepository.findAllByUploadedByAndIsRejected(artisanEmail, true);
    }
}

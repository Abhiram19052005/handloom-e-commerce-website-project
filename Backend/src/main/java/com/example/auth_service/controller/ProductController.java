package com.example.auth_service.controller;

import com.example.auth_service.entity.Product;
import com.example.auth_service.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    @Autowired
    private ProductService productService;

    // Add a new product
    @PostMapping("/add")
    public ResponseEntity<?> addProduct(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("price") Double price,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam("uploadedBy") String uploadedBy) {
        try {
            if (image != null && image.getSize() > 2 * 1024 * 1024) { // 2 MB limit
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("File size exceeds the limit of 2 MB.");
            }

            Product product = new Product();
            product.setName(name);
            product.setDescription(description);
            product.setPrice(price);
            product.setUploadedBy(uploadedBy);

            if (image != null && !image.isEmpty()) {
                product.setImage(image.getBytes());
            }

            Product savedProduct = productService.addProduct(product);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedProduct);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error adding product: " + e.getMessage());
        }
    }

    // Get all products
    @GetMapping("/all")
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    // Get approved products
    @GetMapping("/approved")
    public ResponseEntity<List<Product>> getApprovedProducts() {
        return ResponseEntity.ok(productService.getApprovedProducts());
    }

    // Approve a product
    @PutMapping("/approve")
    public ResponseEntity<?> approveProduct(@RequestParam("id") Long productId) {
        try {
            Product approvedProduct = productService.approveProduct(productId);
            return ResponseEntity.ok(approvedProduct);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // Get product image by product ID
    @GetMapping("/image/{id}")
    public ResponseEntity<byte[]> getProductImage(@PathVariable Long id) {
        try {
            Product product = productService.getProductById(id);
            if (product.getImage() != null) {
                return ResponseEntity.ok()
                        .header("Content-Type", "image/jpeg")
                        .body(product.getImage());
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Update product details
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateProduct(
            @PathVariable Long id,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "price", required = false) Double price,
            @RequestParam(value = "image", required = false) MultipartFile image) {
        try {
            Product updatedProduct = new Product();
            updatedProduct.setName(name);
            updatedProduct.setDescription(description);
            updatedProduct.setPrice(price);

            if (image != null && !image.isEmpty()) {
                updatedProduct.setImage(image.getBytes());
            }

            Product savedProduct = productService.updateProduct(id, updatedProduct);
            return ResponseEntity.ok(savedProduct);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating product: " + e.getMessage());
        }
    }
    @PutMapping("/reject/{id}")
    public ResponseEntity<Product> rejectProduct(@PathVariable Long id) {
        return ResponseEntity.ok(productService.rejectProduct(id));
    }

    @GetMapping("/rejected")
    public ResponseEntity<List<Product>> getRejectedProducts(@RequestParam String artisanEmail) {
        return ResponseEntity.ok(productService.getRejectedProducts(artisanEmail));
    }
    
}
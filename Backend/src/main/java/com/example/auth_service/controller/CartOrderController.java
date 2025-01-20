package com.example.auth_service.controller;

import com.example.auth_service.entity.CartOrder;
import com.example.auth_service.service.CartOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart-orders")
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend requests
public class CartOrderController {

    @Autowired
    private CartOrderService cartOrderService;

    // Add to cart
    @PostMapping("/cart/add")
    public ResponseEntity<String> addToCart(
            @RequestParam String email,
            @RequestParam String productName,
            @RequestParam int quantity) {
        try {
            cartOrderService.addToCart(email, productName, quantity);
            return ResponseEntity.ok("Item added to cart.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to add item to cart: " + e.getMessage());
        }
    }

    // Direct buy
    @PostMapping("/cart/direct-buy")
    public ResponseEntity<String> directBuy(
            @RequestParam String email,
            @RequestParam String productName,
            @RequestParam int quantity,
            @RequestParam String paymentMethod) {
        try {
            cartOrderService.directBuy(email, productName, quantity, paymentMethod);
            return ResponseEntity.ok("Order placed successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to place order: " + e.getMessage());
        }
    }

    // View cart items
    @GetMapping("/cart")
    public ResponseEntity<List<CartOrder>> getCartItems(@RequestParam String email) {
        try {
            return ResponseEntity.ok(cartOrderService.getCartItems(email));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Place order
    @PostMapping("/cart/place-order")
    public ResponseEntity<String> placeOrder(
            @RequestParam String email,
            @RequestParam String paymentMethod) {
        try {
            cartOrderService.placeOrder(email, paymentMethod);
            return ResponseEntity.ok("Order placed successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to place order: " + e.getMessage());
        }
    }

    // View order history
    @GetMapping("/orders")
    public ResponseEntity<List<CartOrder>> getOrderHistory(@RequestParam String email) {
        try {
            return ResponseEntity.ok(cartOrderService.getOrderHistory(email));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Admin: View all orders
    @GetMapping("/admin/orders")
    public ResponseEntity<List<CartOrder>> getAllOrders() {
        try {
            return ResponseEntity.ok(cartOrderService.getAllOrders());
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Admin: Update order status
    @PutMapping("/admin/order-status")
    public ResponseEntity<String> updateOrderStatus(
            @RequestParam Long orderId,
            @RequestParam String status) {
        try {
            CartOrder.OrderStatus orderStatus = CartOrder.OrderStatus.valueOf(status.toUpperCase());
            cartOrderService.updateOrderStatus(orderId, orderStatus);
            return ResponseEntity.ok("Order status updated successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to update order status: " + e.getMessage());
        }
    }

    // Admin: Confirm payment
    @PutMapping("/admin/confirm-payment")
    public ResponseEntity<String> confirmPayment(@RequestParam String email, @RequestParam Long orderId) {
        try {
            cartOrderService.confirmOrderPayment(email, orderId);
            return ResponseEntity.ok("Payment confirmed and email sent to user.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to confirm payment: " + e.getMessage());
        }
    }

    // Admin: Mark as shipped
    @PutMapping("/admin/mark-shipped")
    public ResponseEntity<String> markAsShipped(@RequestParam String email, @RequestParam Long orderId) {
        try {
            cartOrderService.markAsShipped(email, orderId);
            return ResponseEntity.ok("Order marked as shipped and email sent to user.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to mark as shipped: " + e.getMessage());
        }
    }

    // Admin: Mark as delivered
    @PutMapping("/admin/mark-delivered")
    public ResponseEntity<String> markAsDelivered(@RequestParam String email, @RequestParam Long orderId) {
        try {
            cartOrderService.markAsDelivered(email, orderId);
            return ResponseEntity.ok("Order marked as delivered and email sent to user.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to mark as delivered: " + e.getMessage());
        }
    }

    // Get product image for cart
    @GetMapping("/cart/product-image")
    public ResponseEntity<byte[]> getProductImage(@RequestParam String productName) {
        try {
            byte[] image = cartOrderService.getProductImage(productName);
            return ResponseEntity.ok().header("Content-Type", "image/jpeg").body(image);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Update cart item quantity
    @PutMapping("/cart/update")
    public ResponseEntity<CartOrder> updateCartItem(
            @RequestParam Long itemId,
            @RequestParam int quantity) {
        try {
            return ResponseEntity.ok(cartOrderService.updateCartItem(itemId, quantity));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}
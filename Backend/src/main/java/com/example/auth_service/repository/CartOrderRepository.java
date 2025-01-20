package com.example.auth_service.repository;

import com.example.auth_service.entity.CartOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface CartOrderRepository extends JpaRepository<CartOrder, Long> {

    // Custom update query for updating order status
    @Modifying
    @Transactional
    @Query("UPDATE CartOrder c SET c.orderStatus = :status WHERE c.id = :orderId")
    int updateOrderStatusById(@Param("orderId") Long orderId, @Param("status") CartOrder.OrderStatus status);

    // Find a specific item in the cart by email, product name, and order status
    Optional<CartOrder> findByEmailAndProductNameAndOrderStatus(
        String email, String productName, CartOrder.OrderStatus orderStatus);

    // Find all items in the cart for a specific email and order status
    List<CartOrder> findByEmailAndOrderStatus(String email, CartOrder.OrderStatus orderStatus);

    // Delete a specific item in the cart by email, product name, and order status
    @Modifying
    @Transactional
    void deleteByEmailAndProductNameAndOrderStatus(
        String email, String productName, CartOrder.OrderStatus orderStatus);

    // Find an item in the cart by email and product name
    Optional<CartOrder> findByEmailAndProductName(String email, String productName);

    // Find all orders with a specific status (for admin viewing)
    List<CartOrder> findByOrderStatus(CartOrder.OrderStatus status);

    // Find all orders or cart items for a specific user by email
    List<CartOrder> findByEmail(String email);
}
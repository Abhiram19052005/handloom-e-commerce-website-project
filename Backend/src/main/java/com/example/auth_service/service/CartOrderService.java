package com.example.auth_service.service;

import com.example.auth_service.entity.CartOrder;
import com.example.auth_service.entity.Product;
import com.example.auth_service.repository.CartOrderRepository;
import com.example.auth_service.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
public class CartOrderService {

    @Autowired
    private CartOrderRepository cartOrderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private MailService mailService;

    // Add item to cart
    public void addToCart(String email, String productName, int quantity) {
        Product product = productRepository.findByName(productName)
                .orElseThrow(() -> new RuntimeException("Product not found: " + productName));

        CartOrder cartOrder = cartOrderRepository.findByEmailAndProductNameAndOrderStatus(email, productName, CartOrder.OrderStatus.CART)
                .orElseGet(() -> {
                    CartOrder newCartOrder = new CartOrder();
                    newCartOrder.setEmail(email);
                    newCartOrder.setProductName(product.getName());
                    newCartOrder.setProductDescription(product.getDescription());
                    newCartOrder.setProductPrice(product.getPrice());
                    newCartOrder.setQuantity(0); // Initialize quantity
                    newCartOrder.setOrderStatus(CartOrder.OrderStatus.CART);
                    newCartOrder.setPaymentMethod(CartOrder.PaymentMethod.PENDING); // Default payment method
                    newCartOrder.setProductImage(product.getImage()); // Set product image
                    return newCartOrder;
                });

        cartOrder.setQuantity(cartOrder.getQuantity() + quantity);
        cartOrderRepository.save(cartOrder);
    }

    // Direct buy functionality
    public CartOrder directBuy(String email, String productName, int quantity, String paymentMethod) {
        Product product = productRepository.findByName(productName)
                .orElseThrow(() -> new RuntimeException("Product not found: " + productName));

        CartOrder cartOrder = new CartOrder();
        cartOrder.setEmail(email);
        cartOrder.setProductName(product.getName());
        cartOrder.setProductDescription(product.getDescription());
        cartOrder.setProductPrice(product.getPrice());
        cartOrder.setQuantity(quantity);
        cartOrder.setOrderStatus(CartOrder.OrderStatus.ORDERED);
        cartOrder.setOrderDate(new Timestamp(System.currentTimeMillis()));
        cartOrder.setPaymentMethod(CartOrder.PaymentMethod.valueOf(paymentMethod));
        cartOrder.setProductImage(product.getImage()); // Set product image

        return cartOrderRepository.save(cartOrder);
    }

    // Fetch cart items for a user
    public List<CartOrder> getCartItems(String email) {
        return cartOrderRepository.findByEmailAndOrderStatus(email, CartOrder.OrderStatus.CART);
    }

    // Place order (for all items in the cart)
    public void placeOrder(String email, String paymentMethod) {
        List<CartOrder> cartItems = cartOrderRepository.findByEmailAndOrderStatus(email, CartOrder.OrderStatus.CART);

        if (cartItems.isEmpty()) {
            throw new RuntimeException("No items in the cart to place an order.");
        }

        for (CartOrder cartItem : cartItems) {
            cartItem.setOrderStatus(CartOrder.OrderStatus.ORDERED);
            cartItem.setOrderDate(new Timestamp(System.currentTimeMillis()));
            cartItem.setPaymentMethod(CartOrder.PaymentMethod.valueOf(paymentMethod));
        }

        cartOrderRepository.saveAll(cartItems);
    }

    // Fetch order history for a user
    public List<CartOrder> getOrderHistory(String email) {
        return cartOrderRepository.findByEmailAndOrderStatus(email, CartOrder.OrderStatus.ORDERED);
    }

    // Admin: Fetch all orders
    public List<CartOrder> getAllOrders() {
        return cartOrderRepository.findByOrderStatus(CartOrder.OrderStatus.ORDERED);
    }

    // Admin: Update order status
    public CartOrder updateOrderStatus(Long orderId, CartOrder.OrderStatus status) {
        CartOrder order = cartOrderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with ID: " + orderId));

        order.setOrderStatus(status);
        order.setOrderDate(new Timestamp(System.currentTimeMillis())); // Update timestamp
        return cartOrderRepository.save(order);
    }

    // Fetch product image by product name
    public byte[] getProductImage(String productName) {
        Product product = productRepository.findByName(productName)
                .orElseThrow(() -> new RuntimeException("Product not found: " + productName));

        if (product.getImage() == null) {
            throw new RuntimeException("No image found for product: " + productName);
        }

        return product.getImage();
    }

    // Update cart item quantity
    public CartOrder updateCartItem(Long itemId, int quantity) {
        CartOrder cartOrder = cartOrderRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found with ID: " + itemId));

        // Update the quantity
        cartOrder.setQuantity(quantity);

        // Ensure the product image is associated correctly
        Product product = productRepository.findByName(cartOrder.getProductName())
                .orElseThrow(() -> new RuntimeException("Product not found: " + cartOrder.getProductName()));
        cartOrder.setProductImage(product.getImage());

        return cartOrderRepository.save(cartOrder);
    }

    // Confirm Order Payment and Send Email
    public void confirmOrderPayment(String email, Long orderId) {
        CartOrder order = cartOrderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with ID: " + orderId));

        order.setOrderStatus(CartOrder.OrderStatus.ORDERED);
        cartOrderRepository.save(order);

        // Send email notification
        mailService.sendEmail(
                email,
                "Order Payment Successful",
                "Your order with ID " + orderId + " has been successfully paid. Thank you for shopping with us!"
        );
    }

    // Mark Order as Shipped and Send Email
    public void markAsShipped(String email, Long orderId) {
        CartOrder order = cartOrderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with ID: " + orderId));

        order.setOrderStatus(CartOrder.OrderStatus.SHIPPED);
        cartOrderRepository.save(order);

        // Send email notification
        mailService.sendEmail(
                email,
                "Your Order Has Been Shipped",
                "Your order with ID " + orderId + " has been shipped and is on its way!"
        );
    }

    // Mark Order as Delivered and Send Email
    public void markAsDelivered(String email, Long orderId) {
        CartOrder order = cartOrderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with ID: " + orderId));

        order.setOrderStatus(CartOrder.OrderStatus.DELIVERED);
        cartOrderRepository.save(order);

        // Send email notification
        mailService.sendEmail(
                email,
                "Your Order Has Been Delivered",
                "Your order with ID " + orderId + " has been delivered. We hope you enjoy your purchase!"
        );
    }
}
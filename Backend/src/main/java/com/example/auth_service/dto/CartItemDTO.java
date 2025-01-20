package com.example.auth_service.dto;

public class CartItemDTO {
    private String productName;
    private int quantity;
    private double price;
    private byte[] image; // Assuming product image is stored as a byte[]

    public CartItemDTO(String productName, int quantity, double price, byte[] image) {
        this.productName = productName;
        this.quantity = quantity;
        this.price = price;
        this.image = image;
    }

    // Getters and Setters
    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }
}
    
    
package com.example.auth_service.entity;

import lombok.Data;

@Data
public class PaymentRequest {
    private String email;
    private double amount;
    private CardDetails cardDetails;
    
    

    public String getEmail() {
		return email;
	}



	public void setEmail(String email) {
		this.email = email;
	}



	public double getAmount() {
		return amount;
	}



	public void setAmount(double amount) {
		this.amount = amount;
	}



	public CardDetails getCardDetails() {
		return cardDetails;
	}



	public void setCardDetails(CardDetails cardDetails) {
		this.cardDetails = cardDetails;
	}



	@Data
    public static class CardDetails {
        private String cardNumber;
        private String expiryDate;
        private String cvv;
        private String cardHolderName;
		public String getCardNumber() {
			return cardNumber;
		}
		public void setCardNumber(String cardNumber) {
			this.cardNumber = cardNumber;
		}
		public String getExpiryDate() {
			return expiryDate;
		}
		public void setExpiryDate(String expiryDate) {
			this.expiryDate = expiryDate;
		}
		public String getCvv() {
			return cvv;
		}
		public void setCvv(String cvv) {
			this.cvv = cvv;
		}
		public String getCardHolderName() {
			return cardHolderName;
		}
		public void setCardHolderName(String cardHolderName) {
			this.cardHolderName = cardHolderName;
		}
        
        
    }
}
import React, { useState } from "react";
import { FiX } from "react-icons/fi";

const PremiumPopup = ({ onClose, onApplyCoupon }) => {
  const [couponCode, setCouponCode] = useState("");

  const handleCouponChange = (e) => {
    setCouponCode(e.target.value);
  };

  const handleApplyCoupon = () => {
    onApplyCoupon(couponCode);
  };

  const handleBuyNow = () => {
    window.open('https://www.soorya.online/', '_blank');
  };

  // Styles optimized for mobile
  const popupStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    borderRadius: "8px",
    zIndex: 1000,
    width: "90%",
    maxWidth: "400px",
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
  };

  const closeButtonStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "24px",
    color: "#333",
  };

  const inputStyle = {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "100%",
    marginBottom: "12px",
    fontSize: "16px",
    boxSizing: "border-box",
  };

  const buttonContainerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  };

  const buttonStyle = {
    padding: "12px",
    backgroundColor: "#4CAF50",
    color: "white",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    width: "100%",
    boxSizing: "border-box",
  };

  const buyBtn = {
    padding: "12px",
    backgroundColor: "#f7b202",
    color: "white",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    width: "100%",
    boxSizing: "border-box",
  };

  return (
    <>
      <div style={overlayStyle} onClick={onClose} />
      <div style={popupStyle}>
        <button style={closeButtonStyle} onClick={onClose}>
          <FiX />
        </button>
        <h2 style={{ textAlign: "center" }}>Upgrade to Premium</h2>
        <input
          type="text"
          placeholder="Enter Coupon Code"
          value={couponCode}
          onChange={handleCouponChange}
          style={inputStyle}
        />
        <div style={buttonContainerStyle}>
          <button style={buttonStyle} onClick={handleApplyCoupon}>
            Apply Coupon
          </button>
          <button style={buyBtn} onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>
      </div>
    </>
  );
};

export default PremiumPopup;

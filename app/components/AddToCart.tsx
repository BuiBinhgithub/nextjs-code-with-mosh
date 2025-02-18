"use client";
import React from "react";

const AddToCart = () => {
  return (
    <button
      className="btn btn-primary my-5"
      onClick={() => {
        alert("clicked");
      }}
    >
      Add to cart
    </button>
  );
};

export default AddToCart;

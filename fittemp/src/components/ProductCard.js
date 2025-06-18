import React, { useState, useEffect } from "react";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import "../styles/styles.css";
import axios from 'axios';

const ProductCard = ({ product }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/products/${product.id}/reviews`);
        setReviews(res.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [product.id]);

  const addReview = async (newReview) => {
    try {
      const alreadyReviewed = reviews.find(r => r.userId === newReview.user);
      if (alreadyReviewed) {
        alert("You've already reviewed this product!");
        return;
      }

      const res = await axios.post(`http://localhost:5000/products/${product.id}/reviews`, {
        userId: newReview.user,
        productId: product.id,
        rating: newReview.rating,
        review: newReview.review
      });

      setReviews(prev => [
        ...prev,
        {
          userId: newReview.user,
          rating: newReview.rating,
          review: newReview.review
        }
      ]);
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Please try again.");
    }
  };

  const avgRating = (
    reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / (reviews.length || 1)
  ).toFixed(1);

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p><strong>Avg Rating:</strong> {avgRating}</p>

      <ReviewForm onSubmit={addReview} />
      <ReviewList reviews={reviews} />
    </div>
  );
};

export default ProductCard;

import React, { useState } from "react";
import "../styles/styles.css";

const ReviewForm = ({ onSubmit }) => {
  const [user, setUser] = useState("");
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user || (!rating && !review)) {
      alert("Enter name and at least a rating or review");
      return;
    }

    onSubmit({
      user,
      rating: parseFloat(rating),
      review
    });

    setUser("");
    setRating("");
    setReview("");
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <input
        placeholder="Your name"
        value={user}
        onChange={e => setUser(e.target.value)}
      />
      <input
        type="number"
        min="1"
        max="5"
        placeholder="Rating (1-5)"
        value={rating}
        onChange={e => setRating(e.target.value)}
      />
      <textarea
        placeholder="Write your review..."
        value={review}
        onChange={e => setReview(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ReviewForm;

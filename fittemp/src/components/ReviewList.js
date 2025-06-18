import React from "react";
import "../styles/styles.css"; // ✅ use shared styles


const ReviewList = ({ reviews }) => {
  if (reviews.length === 0) return <p>No reviews yet.</p>;

  return (
    <div className="review-list">
      <h4>Reviews:</h4>
      <ul>
        {reviews.map((r, idx) => (
          <li key={idx}>
            <strong>{r.user}</strong> - ⭐ {r.rating || "No Rating"}<br />
            <em>{r.review || "No Review"}</em>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewList;

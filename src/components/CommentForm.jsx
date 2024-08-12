import React, { useState } from "react";

import service from "../service/service.config";

function CommentForm({ reviewId, onCommentAdded }) {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(1);
  const [error, setError] = useState(null);

  const options = [1, 2, 3, 4, 5];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await service.post(`/reviews/${reviewId}/comments`, {
        text,
        rating,
      });
      console.log(response);
      onCommentAdded(response.data.comments);
      setText("");
      setRating(1);
    } catch (err) {
      setError("An error occurred while adding the comment.");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Añadir comentario</h3>
      {error && <p className="error">{error}</p>}
      <div>
        <label>
          Rating
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            {options.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label className="comment-text">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default CommentForm;

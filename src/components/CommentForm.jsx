import React, { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";

import service from "../service/service.config";

function CommentForm({ reviewId, onCommentAdded }) {
  const { user } = useContext(AuthContext);
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

  return user ? (
    <form onSubmit={handleSubmit}>
      <h3>Añadir comentario</h3>
      {error && <p className="error">{error}</p>}
      <div>
        <label>
          Puntuación
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            style={{
              backgroundColor: "#559095",
              marginLeft: "10px",
            }}
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
            style={{ backgroundColor: "#F9CF78", color: "black" }}
          />
        </label>
      </div>
      <button type="submit" className="detailsBtn">
        ↪
      </button>
    </form>
  ) : (
    <h4> Registrate para poder crear comentarios </h4>
  );
}

export default CommentForm;

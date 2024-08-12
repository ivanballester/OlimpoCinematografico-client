import React, { useState } from "react";
import axios from "axios";

const CommentForm = ({ reviewId, addComment }) => {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/reviews/${reviewId}/comments`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        addComment(response.data.comments);
        setText("");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Escribe tu comentario"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button type="submit">Add Comment</button>
    </form>
  );
};

export default CommentForm;

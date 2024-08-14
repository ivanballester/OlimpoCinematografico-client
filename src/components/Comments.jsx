import React from "react";
import Stars from "./ReviewRatingStars";

function Comments({ comments, user, isAdmin, handleDeleteComment }) {
  return (
    <div>
      <h3 style={{ marginBottom: "16px" }}>Comentarios</h3>
      {comments.map((comment, index) => (
        <div key={index} className="comment">
          <p
            style={{ display: "flex", alignItems: "center", marginBottom: "0" }}
          >
            <strong>
              {(comment.creator?.name || "Unknown User")[0].toUpperCase() +
                (comment.creator?.name || "Unknown User").slice(1)}
            </strong>
            <span style={{ marginBottom: "8px", marginTop: "8px" }}>
              {<Stars review={comment} />}
            </span>
          </p>

          <p
            style={{
              marginTop: "0",
              marginBottom: "5px",
              textAlign: "justify",
            }}
          >
            {comment.text}
          </p>
          {(comment.creator?._id === user || isAdmin) && (
            <button
              onClick={() => handleDeleteComment(comment._id)}
              className="detailsBtn"
            >
              🗑️
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Comments;

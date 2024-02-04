import React, { useState } from "react";

export const CommentSection = () => {
  // Estado para almacenar los comentarios
  const [comments, setComments] = useState([]);
  // Estado para el formulario de comentario
  const [newComment, setNewComment] = useState({ username: "", comment: "" });

  // Manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewComment({ ...newComment, [name]: value });
  };

  // Manejar el envío del formulario
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Agregar el nuevo comentario al estado de comentarios
    setComments([...comments, newComment]);
    // Limpiar el formulario después de agregar el comentario
    setNewComment({ username: "", comment: "" });
  };

  return (
    <div className="movie-comments mt-4">
      <h3>Comments</h3>

      {/* Mostrar comentarios existentes */}
      {comments.map((comment, index) => (
        <div key={index} className="comment">
          <strong>{comment.username}:</strong> {comment.comment}
        </div>
      ))}

      {/* Formulario para agregar nuevos comentarios */}
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={newComment.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="comment" className="form-label">
            Comment
          </label>
          <textarea
            className="form-control"
            id="comment"
            name="comment"
            rows="3"
            value={newComment.comment}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Comment
        </button>
      </form>
    </div>
  );
};


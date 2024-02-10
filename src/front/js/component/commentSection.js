
import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";

export const CommentSection = (props) => {
  const [newComment, setNewComment] = useState({ username: "", comment: "" });
  const { store, actions } = useContext(Context);

  useEffect(() => {
    // Al cargar el componente, obtén los comentarios de la API
    actions.getComments(props.movieId);
  }, [props.movieId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewComment({ ...newComment, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Verifica si el comentario está vacío antes de enviarlo
    if (!newComment.comment.trim()) {
      alert("Please enter a comment before submitting.");
      return;
    }

    // Intenta agregar el comentario
    const success = await actions.addComment(props.movieId, newComment.comment);

    if (success) {
      // Si se agregó correctamente, actualiza la lista de comentarios
      actions.getComments(props.movieId);
      // Limpia el campo de comentario
      setNewComment({ ...newComment, comment: "" });
    } else {
      alert("There was an error adding the comment. Please try again.");
    }
  };

  return (
    <div className="movie-comments mt-4">
      <h2> Comments</h2>
      {/* Muestra los comentarios recuperados de la API */}
      {store.comments.map((comment, index) => (
        <div key={index} className="comment-container">
          <div className="comment-content">
            <strong>{comment.user_name}:</strong> {comment.text}
          </div>
          <div className="comment-date">
            <small>{new Date(comment.created_at).toLocaleString()}</small>
          </div>
        </div>
      ))}

      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
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

import React from 'react';

const ErrorMessage = ({ message }) => {
  if (!message) return null; // Ne rien afficher si aucun message n'est passé

  return (
    <div className="error-message">
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;

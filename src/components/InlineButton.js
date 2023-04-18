import React from 'react';

export const InlineButton = ({ buttonText, handleClick}) => {
  return (
    <button
      className="btn btn-link p-0"
      style={{ verticalAlign: 'unset' }}
      onClick={handleClick}
    >
      {buttonText}
    </button>
  );
};

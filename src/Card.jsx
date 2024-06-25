import React from 'react';

const Card = ({ children }) => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6 mb-6">
      {children}
    </div>
  );
};

export default Card;

import React from 'react';

type ButtonProps = {
  label: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
};

const Button: React.FC<ButtonProps> = ({ label, onClick, type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        padding: '10px',
        width: '100%',
        backgroundColor: '#2c3e50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
    >
      {label}
    </button>
  );
};

export default Button;

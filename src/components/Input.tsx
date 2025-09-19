import React from 'react';

type InputProps = {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({ label, type, value, onChange }) => {
  return (
    <div style={{ marginBottom: '10px' }}>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
        required
      />
    </div>
  );
};

export default Input;

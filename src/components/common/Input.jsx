import React from 'react';

const Input = ({ name, value, label, type, onChange }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        id={name}
        onChange={(e) => onChange(e)}
        className="form-control"
      />
    </div>
  );
};

export default Input;

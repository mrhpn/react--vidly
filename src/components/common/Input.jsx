import React from 'react';

const Input = ({ name, value, label, type, error, onChange }) => {
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
      <small className="form-text text-danger">{error}</small>
    </div>
  );
};

export default Input;

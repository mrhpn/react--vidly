import React from 'react';

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input {...rest} name={name} id={name} className="form-control" />
      <small className="form-text text-danger">{error}</small>
    </div>
  );
};

export default Input;

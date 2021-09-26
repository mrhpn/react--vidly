import React from 'react';

const Select = ({ name, label, options, error, ...rest }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select name={name} id={label} {...rest} className="form-control">
        <option disabled value="">
          Choose
        </option>
        {options.map((option) => (
          <option value={option._id} key={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <small className="form-text text-danger">{error}</small>}
    </div>
  );
};

export default Select;

import React from 'react';

const SearchBox = ({ value, onChange }) => {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
      className="form-control"
      placeholder="Search..."
    />
  );
};

export default SearchBox;

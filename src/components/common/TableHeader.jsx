import React from 'react';

const TableHeader = ({ columns, sortColumn: sortCol, onSort }) => {
  const raiseSort = (path) => {
    let sortColumn = { ...sortCol };

    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
    } else {
      sortColumn.path = path;
      sortColumn.order = 'asc';
    }

    onSort(sortColumn);
  };

  return (
    <thead>
      <tr>
        {columns.map((col) => (
          <th key={col.path || col.key} scope="col" onClick={() => raiseSort(col.path)}>
            {col.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;

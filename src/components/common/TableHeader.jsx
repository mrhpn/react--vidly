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

  const renderSortIcon = (column) => {
    if (column.path !== sortCol.path) return null;

    if (sortCol.order === 'asc') return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };

  return (
    <thead>
      <tr>
        {columns.map((col) => (
          <th
            className="clickable"
            key={col.path || col.key}
            scope="col"
            onClick={() => raiseSort(col.path)}
          >
            {col.label} {renderSortIcon(col)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;

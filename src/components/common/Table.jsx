import React from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

const Table = ({ data, columns, sortColumn, onSort }) => {
  return (
    <table className="table my-4">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody data={data} columns={columns} sortColumn={sortColumn} />
    </table>
  );
};

export default Table;

import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

const TableBody = ({ data, columns }) => {
  const renderCell = (item, column) => {
    if (column.content) return column.content(item);

    if (column.path === 'title') return <Link to={`/movies/${item._id}`}>{item.title}</Link>;

    return _.get(item, column.path);
  };

  const createKey = (item, column) => {
    return item._id + (column.label || column.key);
  };

  return (
    <tbody>
      {data.map((item) => (
        <tr key={item._id}>
          {columns.map((column) => (
            <td key={createKey(item, column)}>{renderCell(item, column)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;

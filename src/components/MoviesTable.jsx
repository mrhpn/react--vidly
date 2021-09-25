import React from 'react';
import TableHeader from './common/TableHeader';
import TableBody from './common/TableBody';
import Like from './common/Like';

const MoviesTable = ({ movies, sortColumn, onLike, onDelete, onSort }) => {
  const columns = [
    { label: 'Title', path: 'title' },
    { label: 'Genre', path: 'genre.name' },
    { label: 'Stock', path: 'numberInStock' },
    { label: 'Rate', path: 'dailyRentalRate' },
    { key: 'like', content: (movie) => <Like liked={movie.liked} onClick={() => onLike(movie)} /> },
    {
      key: 'delete',
      content: (movie) => (
        <button className="btn btn-danger btn-sm" onClick={() => onDelete(movie)}>
          Delete
        </button>
      ),
    },
  ];

  return (
    <table className="table my-4">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody data={movies} columns={columns} sortColumn={sortColumn} />
    </table>
  );
};

export default MoviesTable;

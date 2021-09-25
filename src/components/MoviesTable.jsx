import React from 'react';
import Table from './common/Table';
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

  return <Table data={movies} columns={columns} sortColumn={sortColumn} onSort={onSort} />;
};

export default MoviesTable;

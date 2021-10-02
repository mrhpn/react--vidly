import React, { useState, useEffect } from 'react';
import Table from './common/Table';
import Like from './common/Like';
import auth from '../services/auth';

const MoviesTable = ({ movies, sortColumn, onLike, onDelete, onSort }) => {
  const [user] = useState(auth.getCurrentUser());
  const [columns, setColumns] = useState([
    { label: 'Title', path: 'title' },
    { label: 'Genre', path: 'genre.name' },
    { label: 'Stock', path: 'numberInStock' },
    { label: 'Rate', path: 'dailyRentalRate' },
    { key: 'like', content: (movie) => <Like liked={movie.liked} onClick={() => onLike(movie)} /> },
  ]);

  useEffect(() => {
    const deleteButton = {
      key: 'delete',
      content: (movie) => (
        <button className="btn btn-danger btn-sm" onClick={() => onDelete(movie)}>
          Delete
        </button>
      ),
    };

    if (user && user.isAdmin) {
      const cols = [...columns];
      cols.push(deleteButton);
      setColumns(cols);
    }
  }, [user, columns, onDelete]);

  return <Table data={movies} columns={columns} sortColumn={sortColumn} onSort={onSort} />;
};

export default MoviesTable;

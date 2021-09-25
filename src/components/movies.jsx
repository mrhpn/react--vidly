import React, { Component } from 'react';
import _ from 'lodash';

import Like from './common/Like';
import Pagination from './common/Pagination';
import { getMovies } from '../services/fakeMovieService';
import { paginate } from '../util/paginate';

class Movies extends React.Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
    currentPage: 1,
  };

  handleDelete = (movie) => {
    let movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    let movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  render() {
    const { length: count } = this.state.movies;
    const { movies: allMovies, pageSize, currentPage } = this.state;

    if (count === 0) return <p>There are no movies in the database.</p>;

    const movies = paginate(allMovies, currentPage, pageSize);

    return (
      <div className="mt-4">
        <p>Showing {count} movies in the database.</p>
        <table className="table my-4">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like liked={movie.liked} onClick={() => this.handleLike(movie)} />
                </td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => this.handleDelete(movie)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination pageSize={pageSize} itemsCount={count} currentPage={currentPage} onPageChange={this.handlePageChange} />
      </div>
    );
  }
}

export default Movies;

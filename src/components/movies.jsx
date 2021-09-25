import React from 'react';

import Like from './common/Like';
import Pagination from './common/Pagination';
import ListGroup from './common/ListGroup';
import { paginate } from '../util/paginate';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';

class Movies extends React.Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: 'All Genres',
  };

  componentDidMount() {
    const genres = [{ name: 'All Genres' }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

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

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  render() {
    const { length: count } = this.state.movies;
    const { movies: allMovies, selectedGenre, pageSize, currentPage } = this.state;

    if (count === 0) return <p>There are no movies in the database.</p>;

    // filter movies based on genre
    const filteredMovies = selectedGenre && selectedGenre._id ? allMovies.filter((m) => m.genre._id === selectedGenre._id) : allMovies;

    // paginate movies
    const movies = paginate(filteredMovies, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup items={this.state.genres} selected={selectedGenre} onSelect={this.handleGenreSelect} />
        </div>
        <div className="col-9">
          <p>Showing {filteredMovies.length} movies in the database.</p>
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
          <Pagination pageSize={pageSize} itemsCount={filteredMovies.length} currentPage={currentPage} onPageChange={this.handlePageChange} />
        </div>
      </div>
    );
  }
}

export default Movies;

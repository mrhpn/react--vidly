import React from 'react';
import _ from 'lodash';

import MoviesTable from './MoviesTable';
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
    sortColumn: { path: 'title', order: 'asc' },
    selectedGenre: 'All Genres',
  };

  componentDidMount() {
    const genres = [{ _id: '', name: 'All Genres' }, ...getGenres()];
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

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const { movies: allMovies, sortColumn, selectedGenre, pageSize, currentPage } = this.state;

    // filter movies based on genre
    const filteredMovies =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    // sort movies
    const sortedMovies = _.orderBy(filteredMovies, [sortColumn.path], sortColumn.order);

    // paginate movies
    const movies = paginate(sortedMovies, currentPage, pageSize);

    return { totalCount: filteredMovies.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const { sortColumn, selectedGenre, pageSize, currentPage } = this.state;

    if (count === 0) return <p>There are no movies in the database.</p>;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selected={selectedGenre}
            onSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col-9">
          <p>Showing {totalCount} movies in the database.</p>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            pageSize={pageSize}
            itemsCount={totalCount}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;

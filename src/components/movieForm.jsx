import React, { Component } from 'react';
import Joi from 'joi-browser';

import Form from './common/form';
import { getMovie, getMovies, saveMovie } from '../services/fakeMovieService';
import { genres, getGenre } from '../services/fakeGenreService';

class MovieForm extends Form {
  state = {
    data: { title: '', genreId: '', numberInStock: '', dailyRentalRate: '' },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label('Title'),
    genreId: Joi.string().required().label('Genre'),
    numberInStock: Joi.number().min(0).max(100).required().label('Number In Stock'),
    dailyRentalRate: Joi.number().min(0).max(10).required().label('Daily Rental Rate'),
  };

  componentDidMount() {
    const g = genres;
    this.setState({ genres: g });

    if (this.props.match.path.includes('new')) return;

    const movieId = this.props.match.params.id;
    console.log(movieId, 'hahah---');
    const movie = getMovie(movieId);
    if (!movie) return this.props.history.replace('/not-found');

    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };

  doSubmit = () => {
    saveMovie(this.state.data);
    this.props.history.push('/movies');
  };

  render() {
    return (
      <div className="container">
        <h1>New Movie</h1>
        <form onSubmit={this.handleSubmit} className="mt-4">
          {this.renderInput('title', 'Title')}
          {this.renderSelect('genreId', 'Genre', this.state.genres)}
          {this.renderInput('numberInStock', 'Number In Stock', 'number')}
          {this.renderInput('dailyRentalRate', 'Daily Rental Rate', 'number')}
          {this.renderButton('Add Movie')}
        </form>
      </div>
    );
  }
}

export default MovieForm;

import React from 'react';
import Joi from 'joi-browser';

import Form from './common/form';
import { getMovie, saveMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';

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

  async populateGenres() {
    const { data } = await getGenres();
    this.setState({ genres: data });
  }

  async populateMovie() {
    try {
      if (this.props.match.path.includes('new')) return;
      const movieId = this.props.match.params.id;

      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace('/not-found');
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
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

  doSubmit = async () => {
    await saveMovie(this.state.data);
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
          {this.renderButton('Save')}
        </form>
      </div>
    );
  }
}

export default MovieForm;

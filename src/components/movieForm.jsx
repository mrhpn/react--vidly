import React from 'react';
import Joi from 'joi-browser';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import Form from './common/form';
import { getMovie, saveMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';

class MovieForm extends Form {
  state = {
    data: { title: '', genreId: '', numberInStock: '', dailyRentalRate: '' },
    genres: [],
    errors: {},
    formTitle: '...',
    loadingData: false,
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().min(5).max(40).required().label('Title'),
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
      const id = this.props.match.params.id;
      if (id === 'new') {
        this.setState({ formTitle: 'New Movie' });
        return;
      }

      this.setState({ formTitle: 'Update Movie', loadingData: true });
      const movieId = id;
      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
      this.setState({ loadingData: false });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace('/not-found');
    }
  }

  async componentDidMount() {
    await this.populateMovie();
    await this.populateGenres();
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
    const { formTitle, loadingData, genres } = this.state;

    return (
      <div className="container">
        <h1 className="inline">
          {formTitle}{' '}
          {loadingData && <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />}
        </h1>
        <form onSubmit={this.handleSubmit} className="mt-4">
          {this.renderInput('title', 'Title', 'text', loadingData)}
          {this.renderSelect('genreId', 'Genre', genres, loadingData)}
          {this.renderInput('numberInStock', 'Number In Stock', 'number', loadingData)}
          {this.renderInput('dailyRentalRate', 'Daily Rental Rate', 'number', loadingData)}
          {this.renderButton('Save', loadingData)}
        </form>
      </div>
    );
  }
}

export default MovieForm;

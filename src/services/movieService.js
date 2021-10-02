import { apiUrl } from '../config.json';
import http from './httpService';

const apiEndpoint = apiUrl + '/movies';

export function getMovies() {
  return http.get(apiEndpoint);
}

export function getMovie(movieId) {
  return http.get(apiEndpoint + '/' + movieId);
}

export function saveMovie(movie) {
  if (movie.hasOwnProperty('_id')) delete movie._id;
  return http.post(apiEndpoint, movie);
}

export function deleteMovie(movieId) {
  return http.delete(apiEndpoint + '/' + movieId);
}

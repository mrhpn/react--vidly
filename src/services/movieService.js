import { apiUrl } from '../config.json';
import http from './httpService';

const apiEndpoint = apiUrl + '/movies';

export function getMovies() {
  return http.get(apiEndpoint);
}

export function deleteMovie(movieId) {
  return http.delete(apiEndpoint + '/' + movieId);
}

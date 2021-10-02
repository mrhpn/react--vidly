import { Switch, Route, Redirect } from 'react-router';
import { ToastContainer } from 'react-toastify';

import NavBar from './components/navBar';
import Movies from './components/movies';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import Login from './components/login';
import LoginFunc from './components/loginFunc';
import Register from './components/register';
import MovieForm from './components/movieForm';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer />
      <NavBar />
      <main className="container mt-5">
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          {/* <Route path="/login" component={LoginFunc} /> */}
          <Route path="/movies/new" exact component={MovieForm} />
          <Route path="/movies/:id" component={MovieForm} />
          <Route path="/movies" component={Movies} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/" exact component={Movies} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </>
  );
}

export default App;

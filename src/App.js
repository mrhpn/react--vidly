import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { ToastContainer } from 'react-toastify';

import NavBar from './components/navBar';
import Movies from './components/movies';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import Login from './components/login';
import LoginFunc from './components/loginFunc';
import Logout from './components/logout';
import Register from './components/register';
import MovieForm from './components/movieForm';
import ProtectedRoute from './components/common/ProtectedRoute';
import auth from './services/auth';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container mt-5">
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            {/* <Route path="/login" component={LoginFunc} /> */}
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route path="/movies" render={(props) => <Movies {...props} user={user} />} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </>
    );
  }
}

export default App;

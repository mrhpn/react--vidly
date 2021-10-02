import React from 'react';
import auth from '../services/auth';

class Logout extends React.Component {
  componentDidMount() {
    auth.logout();
    window.location = '/';
  }

  render() {
    return null;
  }
}

export default Logout;

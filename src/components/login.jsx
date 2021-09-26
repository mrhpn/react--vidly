import React from 'react';
import Joi from 'joi-browser';

import Form from './common/form';

class Login extends Form {
  state = {
    data: { username: '', password: '' },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password'),
  };

  doSubmit = () => {
    console.log('submitted');
  };

  render() {
    return (
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit} className="mt-4">
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderButton('Login')}
        </form>
      </div>
    );
  }
}

export default Login;

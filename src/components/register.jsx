import React from 'react';
import Joi from 'joi-browser';

import Form from './common/form';
import * as userService from '../services/userService';

class Register extends Form {
  state = {
    data: { username: '', password: '', name: '' },
    errors: {},
  };

  schema = {
    username: Joi.string().email().required().label('Username'),
    password: Joi.string().min(5).max(30).required().label('Password'),
    name: Joi.string().required().label('Name'),
  };

  doSubmit = async () => {
    await userService.register(this.state.data);
    console.log('submitted');
  };

  render() {
    return (
      <div className="container">
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit} className="mt-4">
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderInput('name', 'Name')}
          {this.renderButton('Register')}
        </form>
      </div>
    );
  }
}

export default Register;

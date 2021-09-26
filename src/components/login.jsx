import React from 'react';
import Joi from 'joi-browser';

import Input from './common/Input';
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
    const { data, errors } = this.state;

    return (
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit} className="mt-4">
          <Input
            name="username"
            value={data.username}
            label="Username"
            type="email"
            error={errors.username}
            onChange={this.handleChange}
          />
          <Input
            name="password"
            value={data.password}
            label="Password"
            type="password"
            error={errors.password}
            onChange={this.handleChange}
          />
          <button disabled={this.validate()} type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default Login;

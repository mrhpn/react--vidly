import React, { Component } from 'react';
import Input from './common/Input';

class Login extends React.Component {
  state = {
    account: { username: '', password: '' },
    errors: {},
  };

  validate = () => {
    const errors = {};
    const { account } = this.state;

    if (account.username.trim() === '') errors.username = 'Username is required';
    if (account.password.trim() === '') errors.password = 'Password is required';

    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    // call server and submit
    console.log('submitted');
  };

  validateProperty = ({ name, value }) => {
    if (name === 'username') {
      if (value.trim() === '') return 'Username is required';
    }
    if (name === 'password') {
      if (value.trim() === '') return 'Password is required';
    }
  };

  handleChange = (e) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(e.target);
    if (errorMessage) errors[e.target.name] = errorMessage;
    else delete errors[e.target.name];

    const account = { ...this.state.account };
    account[e.target.name] = e.target.value;
    this.setState({ account, errors });
  };

  render() {
    const { account, errors } = this.state;

    return (
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit} className="mt-4">
          <Input
            name="username"
            value={account.username}
            label="Username"
            type="email"
            error={errors.username}
            onChange={this.handleChange}
          />
          <Input
            name="password"
            value={account.password}
            label="Password"
            type="password"
            error={errors.password}
            onChange={this.handleChange}
          />
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default Login;

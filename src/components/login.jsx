import React, { Component } from 'react';
import Input from './common/Input';

class Login extends React.Component {
  state = {
    account: { username: '', password: '' },
  };

  handleSubmit = (e) => {
    e.preventDefault();
  };

  handleChange = (e) => {
    const account = { ...this.state.account };
    account[e.target.name] = e.target.value;
    this.setState({ account });
  };

  render() {
    return (
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit} className="mt-4">
          <Input
            name="username"
            value={this.state.account.username}
            label="Username"
            type="email"
            onChange={this.handleChange}
          />
          <Input
            name="password"
            value={this.state.account.password}
            label="Password"
            type="password"
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

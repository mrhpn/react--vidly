import React, { useState } from 'react';

const LoginFunc = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="container">
      <h1>Login (Func Component)</h1>
      <form className="mt-4">
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Email address
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="email"
            name="username"
            className="form-control"
            id="username"
            aria-describedby="emailHelp"
            autoFocus
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            className="form-control"
            id="password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginFunc;

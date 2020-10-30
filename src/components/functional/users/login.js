import React, { useState } from 'react';

const Login = () => {
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const user = { login: credential, password };

    console.log(user);
  };

  return (
    <div id="LoginPage" className="bg-main pt-1">
      <div className="container-md">
        <form className="login-form" onSubmit={handleSubmit}>
          <h4>Email or Username</h4>
          <input
            name="logincreds"
            value={credential}
            onChange={e => setCredential(e.target.vallue)}
            minLength="3"
            required
          />
          <h4>Password</h4>
          <input
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

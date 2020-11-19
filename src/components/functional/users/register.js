import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const user = {
      username: username.trim(),
      email: email.trim(),
      password,
      password_confirmation: passwordConfirm,
    };

    console.log(user);
  };

  return (
    <div id="LoginPage" className="bg-main pt-1">
      <div className="container-md">
        <h2 className="text-center mb-1">Register</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <h4>Username</h4>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.vallue)}
            minLength="3"
            required
          />
          <h4>Email</h4>
          <input
            type="text"
            value={email}
            onChange={e => setEmail(e.target.vallue)}
            minLength="3"
            required
          />
          <h4>Password</h4>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <h4>Password Confirmation</h4>
          <input
            type="password"
            value={passwordConfirm}
            onChange={e => setPasswordConfirm(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

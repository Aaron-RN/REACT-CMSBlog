import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { userLogin } from '../../misc/apiRequests';

const Login = ({ handleModal, handleLogin }) => {
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const user = { login: credential, password };

    const result = userLogin(user);
    if (result.success) handleLogin(result.user);
    else handleModal(result.errors);
  };

  return (
    <div id="LoginPage" className="bg-main pt-1">
      <div className="container-md">
        <h2 className="text-center mb-1">Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <h4>Email or Username</h4>
          <input
            type="text"
            value={credential}
            onChange={e => setCredential(e.target.vallue)}
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
          <button type="submit">Login</button>
          <Link to="/sign_up">Create an account?</Link>
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  handleModal: propTypes.func.isRequired,
  handleLogin: propTypes.func.isRequired,
};

export default Login;

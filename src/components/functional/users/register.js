import React, { useState } from 'react';
import propTypes from 'prop-types';
import { userRegister } from '../../misc/apiRequests';

const Register = ({ handleModal, handleLoader }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const user = {
      username: username.trim(),
      email: email.trim(),
      password,
      password_confirmation: passwordConfirm,
    };

    handleLoader(true);
    userRegister(user)
      .then(response => {
        console.log(response);
        if (response.success) setMessage(response.message);
        if (!response.success) handleModal(response.errors);
        handleLoader(false);
      });
    // if (result.success) setMessage(result.message);
    // else handleModal(result.errors);
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
            onChange={e => setUsername(e.target.value)}
            minLength="3"
            required
          />
          <h4>Email</h4>
          <input
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
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
          <button type="submit">Register</button>
        </form>

        <h4>{message}</h4>
      </div>
    </div>
  );
};

Register.propTypes = {
  handleModal: propTypes.func.isRequired,
  handleLoader: propTypes.func.isRequired,
};

export default Register;

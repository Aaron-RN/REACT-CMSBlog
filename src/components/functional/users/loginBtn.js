/* eslint-disable camelcase */
import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

const LoginBtn = ({ user }) => {
  const { username, logged_in } = user;

  const renderBtn = logged_in
    ? (
      <Link to={`/users/${user.id}`} className="login-btn ml-1 text-camel">
        {username}
      </Link>
    )
    : (
      <Link to="/login" className="login-btn ml-1">
        <i className="fas fa-sign-in-alt" />
        Login
      </Link>
    );

  return renderBtn;
};

LoginBtn.propTypes = {
  user: propTypes.instanceOf(Object).isRequired,
};

export default LoginBtn;

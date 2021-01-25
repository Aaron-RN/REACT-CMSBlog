import React, { useEffect, useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import propTypes from 'prop-types';
import { changePasswordWithToken } from '../../misc/apiRequests';

const ResetPassword = ({ handleModal, handleLoader }) => {
  const [redirect, setRedirect] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const loginRedirect = (<Redirect to="/login" />);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();

  const handleSubmit = e => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      return handleModal(["Password doesn't Match Confirmation!"]);
    }
    const token = query.get('token');
    const user = { password, passwordConfirm };

    handleLoader(true);
    changePasswordWithToken(token, user)
      .then(response => {
        if (response.success) { setMessage(response.message); setPasswordReset(true); }
        if (!response.success) handleModal(response.errors);
        handleLoader(false);
      });
  };

  useEffect(() => {
    let timer;
    if (passwordReset) {
      timer = setTimeout(() => {
        setRedirect(true);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [passwordReset]);

  const renderMain = passwordReset
    ? (
      <div className="bg-main pt-1">
        <div className="text-center container-md">
          <h2>{message}</h2>
          <h4>You will be redirected to the login page in a few seconds...</h4>
        </div>
      </div>
    )
    : (
      <div id="LoginPage" className="bg-main pt-1">
        <div className="container-md">
          <h2 className="text-center mb-1">Set a new Password</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <h4>New Password</h4>
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
            <button type="submit">Change Password</button>
          </form>
        </div>
      </div>
    );

  return redirect ? loginRedirect : renderMain;
};

ResetPassword.propTypes = {
  handleModal: propTypes.func.isRequired,
  handleLoader: propTypes.func.isRequired,
};

export default ResetPassword;

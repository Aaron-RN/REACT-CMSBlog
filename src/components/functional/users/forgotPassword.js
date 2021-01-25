import React, { useState } from 'react';
import propTypes from 'prop-types';
import { forgotPassword } from '../../misc/apiRequests';

const ForgotPassword = ({ handleModal, handleLoader }) => {
  const [emailSent, setEmailSent] = useState(false);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const emailTrim = email.trim();

    handleLoader(true);
    forgotPassword(emailTrim)
      .then(response => {
        if (response.success) { setMessage(response.message); setEmailSent(true); }
        if (!response.success) handleModal(response.errors);
        handleLoader(false);
      });
  };

  return emailSent
    ? (
      <div className="bg-main pt-1">
        <div className="text-center container-md">
          <h2>{message}</h2>
        </div>
      </div>
    )
    : (
      <div id="LoginPage" className="bg-main pt-1">
        <div className="container-md">
          <h2 className="text-center mb-1">Send Password Reset Email</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <h4>Email</h4>
            <input
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
              minLength="3"
              required
            />
            <button type="submit">Send Email</button>
          </form>
        </div>
      </div>
    );
};

ForgotPassword.propTypes = {
  handleModal: propTypes.func.isRequired,
  handleLoader: propTypes.func.isRequired,
};

export default ForgotPassword;

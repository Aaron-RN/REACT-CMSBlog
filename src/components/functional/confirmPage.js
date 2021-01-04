import React from 'react';
import propTypes from 'prop-types';

const ConfirmPage = ({ user }) => (
  <div id="ConfirmPage" className="bg-main pt-1">
    <div className="container-md text-center">
      <div className="section">
        <h1 className="section">
          Welcome
          <span className="text-camel text-email">{` ${user.username}`}</span>
          , and thanks for signing up!
        </h1>
        <h2 className="section">
          Please check your email
          <span className="text-email">{`(${user.email})`}</span>
          <br />
          for the account activation link
        </h2>
        <span className="text-email">PS: &#39;If you don&apos;t see the activation email, please check your Junk or Spam folders!&#39;</span>
      </div>
    </div>
  </div>
);

ConfirmPage.propTypes = {
  user: propTypes.instanceOf(Object).isRequired,
};

export default ConfirmPage;

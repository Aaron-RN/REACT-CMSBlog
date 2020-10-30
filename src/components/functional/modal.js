import React from 'react';
import propTypes from 'prop-types';

const Modal = ({ status }) => {
  const { errors } = status;

  // Returns JSX relative to whether the errors are given in array or string format
  const showErrors = () => {
    if (Array.isArray(errors)) {
      return errors.map(error => (
        <div key={error} className="errors-container">{error}</div>
      ));
    }

    return (<div className="errors-container">{errors}</div>);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="container-md">
          {showErrors()}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  status: propTypes.instanceOf(Object).isRequired,
};

export default Modal;

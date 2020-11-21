import React from 'react';
import propTypes from 'prop-types';

const Modal = ({ errors, handleModal }) => {
  // Returns JSX relative to whether the errors are given in array or string format
  const showErrors = () => {
    if (Array.isArray(errors)) {
      return errors.map(error => (
        <div key={error} className="error">{error}</div>
      ));
    }

    return (<div className="error">{errors}</div>);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="container-md">
          <div className="errors-container">
            <h4>Errors</h4>
            {showErrors()}
          </div>
        </div>
        <button type="button" className="modal-btn" onClick={() => handleModal()}>Ok</button>
      </div>
    </div>
  );
};

Modal.propTypes = {
  errors: propTypes.oneOfType([
    propTypes.instanceOf(Array),
    propTypes.string,
  ]).isRequired,
  handleModal: propTypes.func.isRequired,
};

export default Modal;

import React, { useState } from 'react';
import propTypes from 'prop-types';

const SuspendUser = ({ user, selectedUser, handleFormReset }) => {
  const [suspendPostsExpiryDate, setSuspendPostExpiry] = useState(selectedUser.can_post_date);
  const [suspendCommentsExpiryDate, setSuspendCommentsExpiry] = useState(selectedUser.can_comment_date);

  // Handle renaming of a forum
  const handleSubmit = e => {
    e.preventDefault();
    const suspendUser = {
      id: selectedUser.id,
      admin_id: user.id,
    };
    console.log(suspendUser);
    handleFormReset();
  };

  return (
    <form className="modal-form" onSubmit={handleSubmit}>
      <h3 className="text-center">Suspend User Functions</h3>
      <h3>
        <span className="text-grey">{'User '}</span>
        {selectedUser.username}
      </h3>
      <h4>Suspend Posting abilities until</h4>
      <input
        type="datetime-local"
        value={suspendPostsExpiryDate}
        onChange={e => setSuspendPostExpiry(e.target.value)}
        required
      />
      <h4>Suspend Commenting abilities until</h4>
      <input
        type="datetime-local"
        value={suspendCommentsExpiryDate}
        onChange={e => setSuspendCommentsExpiry(e.target.value)}
        required
      />
      <button type="submit">Suspend User</button>
    </form>
  );
};

SuspendUser.propTypes = {
  user: propTypes.instanceOf(Object).isRequired,
  selectedUser: propTypes.instanceOf(Object).isRequired,
  handleFormReset: propTypes.func.isRequired,
};

export default SuspendUser;

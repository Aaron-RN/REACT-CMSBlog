import React, { useState } from 'react';
import propTypes from 'prop-types';
import convertDate from '../../../../misc/convertDate';

const SuspendUser = ({ user, selectedUser, handleFormReset }) => {
  // eslint-disable-next-line camelcase
  const { can_post_date, can_comment_date } = selectedUser;
  const [suspendPostsExpiryDate, setSuspendPostExpiry] = useState(convertDate(can_post_date));
  const [
    suspendCommentsExpiryDate,
    setSuspendCommentsExpiry,
  ] = useState(convertDate(can_comment_date));

  // Handle modification of User's suspended activities
  const handleSubmit = e => {
    e.preventDefault();
    const suspendUser = {
      id: selectedUser.id,
      can_post_date: new Date(suspendPostsExpiryDate),
      can_comment_date: new Date(suspendCommentsExpiryDate),
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
        <span className="text-author">{selectedUser.username}</span>
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

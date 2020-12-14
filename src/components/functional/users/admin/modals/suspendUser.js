import React, { useState } from 'react';
import propTypes from 'prop-types';
import { userSuspendComms } from '../../../../misc/apiRequests';
import { convertRailsDate, convertToRubyDate } from '../../../../misc/convertDate';

const SuspendUser = ({
  user, selectedUser, handleSelectedUser, handleFormReset, handleLoader, handleMainModal,
}) => {
  // eslint-disable-next-line camelcase
  const { can_post_date, can_comment_date } = selectedUser;
  const [suspendPostsExpiryDate, setSuspendPostExpiry] = useState(convertRailsDate(can_post_date));
  const [
    suspendCommentsExpiryDate,
    setSuspendCommentsExpiry,
  ] = useState(convertRailsDate(can_comment_date));

  // Handle modification of User's suspended activities
  const handleSubmit = e => {
    e.preventDefault();
    const suspendUser = {
      id: selectedUser.id,
      can_post_date: convertToRubyDate(suspendPostsExpiryDate),
      can_comment_date: convertToRubyDate(suspendCommentsExpiryDate),
      admin_id: user.id,
    };
    handleLoader(true);
    userSuspendComms(suspendUser)
      .then(response => {
        if (response.success) {
          handleSelectedUser(response.user);
          handleFormReset();
        }
        if (!response.success) handleMainModal(response.errors);
        handleLoader(false);
      });
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
  handleSelectedUser: propTypes.func.isRequired,
  handleFormReset: propTypes.func.isRequired,
  handleLoader: propTypes.func.isRequired,
  handleMainModal: propTypes.func.isRequired,
};

export default SuspendUser;

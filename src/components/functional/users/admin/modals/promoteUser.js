import React, { useState } from 'react';
import propTypes from 'prop-types';
import { userToAdmin } from '../../../../misc/apiRequests';

const PromoteUser = ({
  user, selectedUser, handleSelectedUser, handleFormReset, handleLoader, handleMainModal,
}) => {
  // eslint-disable-next-line camelcase
  const { admin_level } = selectedUser;
  const [adminLevel, setAdminLevel] = useState(admin_level);

  const descList = [
    '(Basic User account privileges)',
    "(Can disable a user's ability to comment and create topics)",
    '(Can create and edit Forums and subForums)',
    '(Can remove or add Moderators)',
    '(Can not be modified by any other moderator)',
  ];

  // Used to populate a list of all capabilities related to the administrative level chosen
  // Array.slice is used to combine different capabilities together
  const populateDesc = () => {
    if (adminLevel === 0) return <li>{descList[0]}</li>;
    if (adminLevel === 1) {
      const slicedList = descList.slice(1, 3);
      return slicedList.map(priv => <li key={priv}>{priv}</li>);
    }
    if (adminLevel === 2) {
      const slicedList = descList.slice(1, 4);
      return slicedList.map(priv => <li key={priv}>{priv}</li>);
    }
    if (adminLevel === 3) {
      const slicedList = descList.slice(1);
      return slicedList.map(priv => <li key={priv}>{priv}</li>);
    }
    return null;
  };

  // Handle modification of User's administrative rights
  const handleSubmit = e => {
    e.preventDefault();
    const userStatus = {
      id: selectedUser.id,
      admin_level: adminLevel,
      admin_id: user.id,
    };
    handleLoader(true);
    userToAdmin(userStatus)
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
      <h3 className="text-center">Set User Admin Level</h3>
      <h3>
        <span className="text-grey">{'User '}</span>
        <span className="text-author">{selectedUser.username}</span>
      </h3>
      <h4>Change User&apos;s account status</h4>
      <select value={adminLevel} onChange={e => setAdminLevel(parseInt(e.target.value, 10))}>
        {/* <option value={3} disabled>Site Owner</option> */}
        <option value={2}>Moderator</option>
        <option value={1}>Forums Moderator</option>
        <option value={0}>Basic User</option>
      </select>
      <span className="size-16 text-grey">Privileges</span>
      <ul className="mb-1 size-14 text-info">{populateDesc()}</ul>
      <button type="submit">Promote/Demote</button>
    </form>
  );
};

PromoteUser.propTypes = {
  user: propTypes.instanceOf(Object).isRequired,
  selectedUser: propTypes.instanceOf(Object).isRequired,
  handleSelectedUser: propTypes.func.isRequired,
  handleFormReset: propTypes.func.isRequired,
  handleLoader: propTypes.func.isRequired,
  handleMainModal: propTypes.func.isRequired,
};

export default PromoteUser;

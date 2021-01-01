import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { URL, fetchLatestUsers } from '../../misc/apiRequests';
import '../../../assets/css/users.css';

const AllUsers = ({ handleLoader, handleModal }) => {
  const [allUsers, setAllUsers] = useState([]);

  // Returns Whether a user is an administrator or not
  const profileStatus = user => {
    if (user.admin_level === 0) {
      return <div className="text-bold text-status-gray">Member</div>;
    }
    if (user.admin_level === 1) {
      return <div className="text-bold text-status">Forums Moderator</div>;
    }
    if (user.admin_level === 2) {
      return <div className="text-bold text-status">Moderator</div>;
    }
    if (user.admin_level === 3) {
      return <div className="text-bold text-status">Site Owner</div>;
    }
    return null;
  };

  const displayUser = () => allUsers.map(user => (
    <Link to={`/users/${user.id}`} key={user.id} className="allUsers">
      <h3 className="text-camel">{user.username}</h3>
      {!user.profile_image && (
        <i className="fas fa-user profile-pic" />
      )}
      {user.profile_image && (
        <image className="profile-pic" src={`${URL}${user.profile_image}`} />
      )}
      {profileStatus(user)}
      {!user.can_comment && (
        <div className="text-suspended">User&apos;s ability to comment on posts has been suspended</div>
      )}
      {!user.can_post && (
        <div className="text-suspended">User&apos;s ability to create new posts has been suspended</div>
      )}
    </Link>
  ));

  // Fetch all Users by the latest User that signed up
  useEffect(() => {
    handleLoader(true);
    fetchLatestUsers()
      .then(response => {
        if (response.success) {
          setAllUsers(response.users);
        }
        if (!response.success) handleModal(response.errors);
        handleLoader(false);
      });
  }, [handleLoader, handleModal]);

  return (
    <div id="AllUsers" className="bg-main pt-1">
      <div className="container-md">
        <h3>Members</h3>
        <div className="flex-row flex-wrap">
          {displayUser()}
        </div>
        <div className="members">{`${allUsers.length} total members`}</div>
      </div>
    </div>
  );
};

AllUsers.propTypes = {
  handleLoader: propTypes.func.isRequired,
  handleModal: propTypes.func.isRequired,
};

export default AllUsers;

import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchLatestUsers } from '../../misc/apiRequests';
import '../../../assets/css/users.css';

const NewUsers = ({ handleModal, handleLoader }) => {
  const [latestUsers, setLatestUsers] = useState([]);

  const displayUser = () => latestUsers.map((user, index) => {
    if (index < 8) {
      return (
        <Link to={`/users/${user.id}`} key={user.id} className="user">
          {user.username}
        </Link>
      );
    }
    return null;
  });

  // Fetch all Users by the latest User that signed up
  useEffect(() => {
    handleLoader(true);
    fetchLatestUsers()
      .then(response => {
        if (response.success) {
          setLatestUsers(response.users);
        }
        if (!response.success) handleModal(response.errors);
        handleLoader(false);
      });
  }, [handleLoader, handleModal]);

  return (
    <div id="LatestUser">
      <div className="container-md">
        <h3>Newest Users</h3>
        <div className="flex-row flex-wrap">
          {displayUser()}
        </div>
        <Link to="/users" className="members text-bold">
          {`${latestUsers.length} total members`}
        </Link>
      </div>
    </div>
  );
};

NewUsers.propTypes = {
  handleLoader: propTypes.func.isRequired,
  handleModal: propTypes.func.isRequired,
};

export default NewUsers;

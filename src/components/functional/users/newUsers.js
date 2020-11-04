import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../../../assets/css/users.css';

const NewUsers = ({ allUsers }) => {
  const [latestUsers, setLatestUsers] = useState(allUsers);

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

  // Sort allUsers by the latest User that signed up
  useEffect(() => {
    setLatestUsers(allUsers.sort((a, b) => b.id - a.id));
  }, [allUsers]);

  return (
    <div id="LatestUser">
      <div className="container-md">
        <h3>Newest Users</h3>
        <div className="flex-row flex-wrap">
          {displayUser()}
        </div>
      </div>
    </div>
  );
};

NewUsers.defaultProps = {
  allUsers: [],
};

NewUsers.propTypes = {
  allUsers: propTypes.instanceOf(Array),
};

export default NewUsers;

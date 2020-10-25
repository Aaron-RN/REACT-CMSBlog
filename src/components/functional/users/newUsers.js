import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import '../../../assets/css/users.css';

const NewUsers = ({ allUsers }) => {
  const [latestUsers, setLatestUsers] = useState(allUsers);

  const displayUser = () => latestUsers.map((user, index) => {
    if (index < 8) {
      return (
        <div key={user.id} className="user">
          {user.username}
        </div>
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

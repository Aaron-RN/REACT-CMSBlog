import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { allUsersData } from '../../misc/presets/allUsersData';

const ProfilePage = ({ match, user }) => {
  const [selectedUser, setSelectedUser] = useState({});
  const isMyProfile = user.id === selectedUser.id;

  // Fetch the user based on the URL id parameter
  useEffect(() => {
    if (match.params.id) {
      const userID = parseInt(match.params.id, 10);
      const userSelected = allUsersData.find(userData => userData.id === userID);
      setSelectedUser(userSelected);
    }
  }, [match]);

  return (
    <div id="UserProfile" className="bg-main">
      <div className="container-md">
        <div className="text-center">
          {isMyProfile && (
            <div>
              <h2>My Profile</h2>
              <h3>
                <button type="button" className="login-btn">
                  <i className="fas fa-sign-out-alt" />
                  Sign out
                </button>
              </h3>
            </div>
          )}
          {!isMyProfile && <h2>{`${selectedUser.username}'s Profile`}</h2>}
          <i className="fas fa-user profile-pic" />
        </div>
        <h2>Recent Activity</h2>
        <div>
          <h3>Latest Posts</h3>
          <div className="latest-posts">Posts</div>
          <h3>Latest Comments</h3>
          <div className="latest-comments">Comments</div>
        </div>
      </div>
    </div>
  );
};

ProfilePage.propTypes = {
  match: propTypes.instanceOf(Object).isRequired,
  user: propTypes.instanceOf(Object).isRequired,
};

export default ProfilePage;

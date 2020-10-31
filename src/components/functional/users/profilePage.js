import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { allUsersData } from '../../misc/presets/allUsersData';
import AdminPanel from './admin/adminPanel';

const ProfilePage = ({ match, user, handleLogout }) => {
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
        <div className="section text-center">
          {isMyProfile && (
            <div>
              <h2>My Profile Page</h2>
              <h3>
                <button type="button" className="login-btn" onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt" />
                  Sign out
                </button>
              </h3>
            </div>
          )}
          {!isMyProfile && <h2>{`${selectedUser.username}'s Profile Page`}</h2>}
          <i className="fas fa-user profile-pic" />
        </div>
        <div className="section">
          <h2>Recent Activity</h2>
          <div className="ml-1">
            <h3>Latest Posts</h3>
            <div className="latest-posts">Posts</div>
          </div>
          <div className="ml-1">
            <h3>Latest Comments</h3>
            <div className="latest-comments">Comments</div>
          </div>
        </div>
        {isMyProfile && (<AdminPanel user={user} />)}
      </div>
    </div>
  );
};

ProfilePage.propTypes = {
  match: propTypes.instanceOf(Object).isRequired,
  user: propTypes.instanceOf(Object).isRequired,
  handleLogout: propTypes.func.isRequired,
};

export default ProfilePage;

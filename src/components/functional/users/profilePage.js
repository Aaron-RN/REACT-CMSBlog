import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { allUsersData } from '../../misc/presets/allUsersData';
import allForums from '../../misc/presets/allForumsData';

const ProfilePage = ({ match, user, handleLogout }) => {
  const [selectedUser, setSelectedUser] = useState({});
  const isMyProfile = user.id === selectedUser.id;

  const populateSubForums = forumArray => forumArray
    .map(subforum => <span key={subforum} className="subforum">{`${subforum}`}</span>);

  const populateForums = () => allForums.map(forum => (
    <div key={forum.id} className="forum">
      <h4 className="text-camel">{forum.forum}</h4>
      <div className="inline-block text-grey">Subforums:</div>
      {' [ '}
      {populateSubForums(forum.subforum)}
      {' ]'}
      <div className="forum-menu">
        <button type="button">Rename</button>
        <button type="button">+ Subforum</button>
      </div>
    </div>
  ));

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
        <div className="section">
          <h2>Admin Panel</h2>
          <div className="ml-1">
            <h3>Forum Handling</h3>
            <Link to="/forums/new" className="ml-1"><button type="button">Create a new Forum</button></Link>
            <h3 className="text-grey">All Forums &amp; Subforums</h3>
            <div className="all-forums">{populateForums()}</div>
          </div>
        </div>
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

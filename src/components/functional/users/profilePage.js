import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import populatePosts from '../../presentational/blogPage/populatePosts';
import { fetchUser } from '../../misc/apiRequests';
import AdminPanel from './admin/adminPanel';
import Paginate from '../blogPage/paginatePosts';

const ProfilePage = ({
  match, user, handleLogout, handlePostSelect, handleLoader, handleModal,
}) => {
  const [selectedUser, setSelectedUser] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [userComments, setUserComments] = useState([]);
  const isMyProfile = user.id === selectedUser.id;

  // Returns Whether a user is an administrator or not
  const profileStatus = () => {
    if (selectedUser.admin_level === 1) {
      return <div className="text-bold text-status">Forums Moderator</div>;
    }
    if (selectedUser.admin_level === 2) {
      return <div className="text-bold text-status">Moderator</div>;
    }
    if (selectedUser.admin_level === 3) {
      return <div className="text-bold text-status">Site Owner</div>;
    }
    return null;
  };

  const populateLast3Comments = () => userComments.map((comment, index) => {
    const post = comment.post_id;
    const postTitle = post.title;
    const postAuthor = selectedUser.username;
    if (index > 3) return null;
    return (
      <button type="button" key={comment.id} onClick={() => handlePostSelect(post)}>
        <h4>{`${postTitle} by ${postAuthor}`}</h4>
        <span className="size-16">{`"${comment.body}"`}</span>
      </button>
    );
  });

  // Fetch the user, his related posts, and comments based on the URL id parameter
  useEffect(() => {
    if (match.params.id) {
      const userID = parseInt(match.params.id, 10);
      handleLoader(true);
      fetchUser(userID)
        .then(response => {
          if (response.success) setSelectedUser(response.user);
          if (!response.success) handleModal(response.errors);
          handleLoader(false);
        });
    }
  }, [match.params.id, handleModal, handleLoader]);

  // Remove when adding Database
  useEffect(() => {
    // Check to make sure the selectedUser variable is an object with properties
    if (Object.keys(selectedUser).length > 0) {
      const allUserPosts = selectedUser.posts;
      const latestPosts = allUserPosts.length > 0 ? allUserPosts.sort((a, b) => b.id - a.id) : [];
      const allUserComments = selectedUser.comments;
      const latestComments = allUserComments.length > 0
        ? allUserComments.sort((a, b) => b.id - a.id) : [];
      setUserPosts(latestPosts);
      setUserComments(latestComments);
    }
  }, [selectedUser]);

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
          {profileStatus()}
          {!selectedUser.can_comment && (
            <div className="text-suspended">User&apos;s ability to comment on posts has been suspended</div>
          )}
          {!selectedUser.can_post && (
            <div className="text-suspended">User&apos;s ability to create new posts has been suspended</div>
          )}
        </div>
        <div className="section">
          <h2>Recent Activity</h2>
          <div className="ml-1">
            <h3>Latest Posts</h3>
            <div id="BlogPage" className="latest-posts mb-1">
              <Paginate
                posts={userPosts}
                handlePostSelect={handlePostSelect}
                populatePosts={populatePosts}
                postsPages={5}
              />
            </div>
          </div>
          <div className="ml-1">
            <h3>Latest Comments</h3>
            <div className="latest-comments">
              {populateLast3Comments()}
            </div>
          </div>
        </div>
        {isMyProfile && (
          <AdminPanel
            user={user}
            handleLoader={handleLoader}
            handleMainModal={handleModal}
          />
        )}
        {!isMyProfile && (
          <AdminPanel
            user={user}
            selectedUser={selectedUser}
            handleLoader={handleLoader}
            handleMainModal={handleModal}
          />
        )}
      </div>
    </div>
  );
};

ProfilePage.propTypes = {
  match: propTypes.instanceOf(Object).isRequired,
  user: propTypes.instanceOf(Object).isRequired,
  handleLogout: propTypes.func.isRequired,
  handlePostSelect: propTypes.func.isRequired,
  handleLoader: propTypes.func.isRequired,
  handleModal: propTypes.func.isRequired,
};

export default ProfilePage;

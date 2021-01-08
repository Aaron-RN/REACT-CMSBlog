import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import populatePosts from '../../presentational/blogPage/populatePosts';
import { fetchUser, userImageUpdate } from '../../misc/apiRequests';
import AdminPanel from './admin/adminPanel';
import Paginate from '../blogPage/paginatePosts';

const ProfilePage = ({
  match, user, handleLogout, handlePostSelect, handleLoader, handleModal,
}) => {
  const [selectedUser, setSelectedUser] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [userComments, setUserComments] = useState([]);
  const [renderUploader, setRenderUploader] = useState(false);
  const [profileImage, setProfileImage] = useState();
  const isMyProfile = user.id === selectedUser.id;

  const handleSelectedUser = user => {
    setSelectedUser(user);
  };

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
    const post = { id: comment.post_id, forum: comment.forum, subforum: comment.subforum };
    if (index > 3) return null;
    return (
      <button type="button" key={comment.id} onClick={() => handlePostSelect(post)}>
        <h4 className="text-camel">{`${comment.post_title} by ${comment.post_author}`}</h4>
        <span className="size-16">{`"${comment.body}"`}</span>
      </button>
    );
  });

  const handleCheckFileSize = e => {
    const elem = e.target;
    if (elem.files[0].size > 1048576) {
      elem.value = '';
    } else { setProfileImage(elem.files[0]); }
  };

  const handleProfileImageSubmit = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('user[profile_image]', profileImage);

    handleLoader(true);
    userImageUpdate(selectedUser.id, formData)
      .then(response => {
        if (response.success) setSelectedUser(response.user);
        if (!response.success) handleModal(response.errors);
        handleLoader(false);
        setRenderUploader(!renderUploader);
      });
  };

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
      const isAdmin = user.admin_level > 0;
      if (isAdmin) {
        setUserPosts(latestPosts);
        setUserComments(latestComments);
      }
      if (!isAdmin) {
        setUserPosts(latestPosts.filter(post => !post.admin_only_view));
        setUserComments(latestComments.filter(comment => !comment.admin_only_view));
      }
    }
  }, [user, selectedUser]);

  const renderUploaderForm = (
    <div className="modal">
      <button type="button" className="modal-bg" onClick={() => setRenderUploader(!renderUploader)}>x</button>
      <div className="modal-content">
        <div className="container-md">
          <form className="modal-form" onSubmit={handleProfileImageSubmit} encType="multipart/form-data">
            <h3 className="text-center">Upload Profile Image</h3>
            <input
              type="file"
              id="profileImage"
              name="profile_image"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleCheckFileSize}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <div id="UserProfile" className="bg-main">
      <div className="container-md">
        {(isMyProfile && renderUploader) && renderUploaderForm}
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
          {!isMyProfile && <h2 className="text-camel">{`${selectedUser.username}'s Profile Page`}</h2>}
          {!selectedUser.profile_image && (
            <i className="fas fa-user profile-pic" />
          )}
          {selectedUser.profile_image && (
            <img className="profile-pic" alt="user's profile" src={`${selectedUser.profile_image}`} />
          )}
          {isMyProfile && (
            <div>
              <button
                type="button"
                className="image-btn"
                onClick={() => setRenderUploader(!renderUploader)}
              >
                Change profile image
              </button>
            </div>
          )}
          {' '}
          {profileStatus()}
          {!selectedUser.is_activated && (
            <div className="text-suspended">Account not activated</div>
          )}
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
            handleSelectedUser={handleSelectedUser}
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

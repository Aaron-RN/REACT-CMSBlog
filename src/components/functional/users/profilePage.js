import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import populatePosts from '../../presentational/blogPage/populatePosts';
import { allUsersData, fetchAuthorName } from '../../misc/presets/allUsersData';
import allPostsData from '../../misc/presets/allPostsData';
import allCommentsData from '../../misc/presets/allCommentsData';
import AdminPanel from './admin/adminPanel';
import Paginate from '../blogPage/paginatePosts';

const ProfilePage = ({
  match, user, handleLogout, handlePostSelect,
}) => {
  const [selectedUser, setSelectedUser] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [userComments, setUserComments] = useState([]);
  const isMyProfile = user.id === selectedUser.id;

  const populateLast3Comments = () => userComments.map((comment, index) => {
    const post = allPostsData.find(post => post.id === comment.post_id);
    const postTitle = post.title;
    const postAuthor = fetchAuthorName(post.author_id);
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
      const userSelected = allUsersData.find(userData => userData.id === userID);
      setSelectedUser(userSelected);
    }
  }, [match]);

  // Remove when adding Database
  useEffect(() => {
    const allUserPosts = allPostsData.filter(post => post.author_id === selectedUser.id);
    const latestPosts = allUserPosts.sort((a, b) => b.id - a.id);
    const allUserComments = allCommentsData
      .filter(comment => comment.author_id === selectedUser.id);
    const latestComments = allUserComments.sort((a, b) => b.id - a.id);
    setUserPosts(latestPosts);
    setUserComments(latestComments);
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
        {isMyProfile && (<AdminPanel user={user} />)}
      </div>
    </div>
  );
};

ProfilePage.propTypes = {
  match: propTypes.instanceOf(Object).isRequired,
  user: propTypes.instanceOf(Object).isRequired,
  handleLogout: propTypes.func.isRequired,
  handlePostSelect: propTypes.func.isRequired,
};

export default ProfilePage;

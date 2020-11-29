import React, { useState, useEffect, useRef } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CommentSection from '../comments/commentSection';
import { fetchPost } from '../../misc/apiRequests';

const PostPage = ({
  match, user, handleLoader, handleModal,
}) => {
  const [selectedPost, setSelectedPost] = useState({
    id: 0, title: '', body: '', author: '', user_id: '', forum: '', is_pinned: false, is_locked: false,
  });
  const [postPinned, setPostPinned] = useState(selectedPost.is_pinned);
  const [postLocked, setPostLocked] = useState(selectedPost.is_locked);
  const {
    // eslint-disable-next-line camelcase
    id, forum, subforum, title, body, user_id, author,
  } = selectedPost;
  const bodyElem = useRef(null);

  // Handle pinning a post
  const handlePinPost = () => {
    setPostPinned(!postPinned);
    // Axios POST Request
    console.log(postPinned);
  };

  // Handle locking a post's comments
  const handleLockPost = () => {
    setPostLocked(!postLocked);
    // Axios POST Request
    console.log(postLocked);
  };

  // Fetch Post by ID
  useEffect(() => {
    if (match.params.id) {
      const postID = parseInt(match.params.id, 10);
      handleLoader(true);
      fetchPost(postID)
        .then(response => {
          if (response.success) {
            setSelectedPost(response.post);
            setPostPinned(response.post.is_pinned);
          }
          if (!response.success) handleModal(response.errors);
          handleLoader(false);
        });
    }
  }, [match.params.id, handleLoader, handleModal]);

  // Fill body element of post with html rich text
  useEffect(() => {
    const bodyDiv = bodyElem.current;
    if (bodyDiv) bodyDiv.innerHTML = body;
  });

  return (
    <div id="BlogPage" className="bg-main">
      <div className="container-md">
        <div className="section">
          <h4 className="text-grey">Forums</h4>
          <div>
            <Link to={`/${forum}`}><i className="fas fa-chevron-circle-left pr-1" /></Link>
            <Link to={`/${forum}`} className="header text-caps">{forum}</Link>
            {subforum && ' / '}
            {subforum && <Link to={`/${forum}/${subforum}`} className="header text-caps">{subforum}</Link>}
            {' / '}
            <Link to={match.url}>{title}</Link>
          </div>
          <div className="header-title">
            <h3>{title}</h3>
            <span className="pl-1 size-16">by</span>
            <h3 className="pl-01 size-18 user">
              <Link to={`/users/${user_id}`} className="text-author">{author}</Link>
            </h3>
            <div className="ml-auto">
              {user.admin_level > 1 && (
                <div className="inline-flex">
                  <button type="button" onClick={handlePinPost} className="bare-btn pin-btn" title="Pin/Unpin post">
                    {postPinned && <i className="fas fa-star text-red" />}
                    {!postPinned && <i className="far fa-star" />}
                  </button>
                  <button type="button" onClick={handleLockPost} className="bare-btn lock-btn" title="Lock/Unlock post's comments">
                    {postLocked && <i className="fas fa-lock" />}
                    {!postLocked && <i className="fas fa-unlock" />}
                  </button>
                </div>
              )}
              {/* eslint-disable-next-line camelcase */}
              {(user.id === user_id) && <Link to={`/${forum}${subforum ? `/${subforum}` : ''}/posts/${id}/edit`} className="edit-post-btn">Edit Topic</Link>}
            </div>
          </div>
          <div ref={bodyElem} />
        </div>
      </div>
      <CommentSection user={user} post={selectedPost} />
    </div>
  );
};

PostPage.propTypes = {
  match: propTypes.instanceOf(Object).isRequired,
  user: propTypes.instanceOf(Object).isRequired,
  handleLoader: propTypes.func.isRequired,
  handleModal: propTypes.func.isRequired,
};

export default PostPage;

import React, { useState, useEffect, useRef } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CommentSection from '../commentSection';
import { fetchAuthorName } from './presets/allUsersData';

const PostPage = ({ match, allPosts, user }) => {
  const [selectedPost, setSelectedPost] = useState({
    id: 0, title: '', body: '', author_id: '', forum: '',
  });
  const {
    // eslint-disable-next-line camelcase
    id, forum, subforum, title, body, author_id,
  } = selectedPost;
  const bodyElem = useRef(null);

  // Fetch Post by ID
  useEffect(() => {
    if (allPosts.length && match) {
      const post = allPosts.find(post => post.id === parseInt(match.params.id, 10));
      setSelectedPost(post);
    }
  }, [match, allPosts]);

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
            <h3 className="pl-01 size-18 text-author user">{fetchAuthorName(author_id)}</h3>
            {(user.id === author_id) && <Link to={`/misc/posts/${id}/edit`} className="edit-post-btn">Edit Topic</Link>}
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
  allPosts: propTypes.instanceOf(Array).isRequired,
  user: propTypes.instanceOf(Object).isRequired,
};

export default PostPage;

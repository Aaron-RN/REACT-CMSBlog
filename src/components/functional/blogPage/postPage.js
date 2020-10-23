import React, { useState, useEffect, useRef } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PostPage = ({ allPosts, match }) => {
  const [selectedPost, setSelectedPost] = useState({
    id: 0, title: '', body: '', author: '', forum: '',
  });
  const {
    id, forum, title, body, author,
  } = selectedPost;
  const bodyElem = useRef(null);

  useEffect(() => {
    if (allPosts.length && match) {
      const post = allPosts.find(post => post.id === parseInt(match.params.id, 10));
      setSelectedPost(post);
    }
  }, [match, allPosts]);

  useEffect(() => {
    const bodyDiv = bodyElem.current;
    if (bodyDiv) bodyDiv.innerHTML = body;
  });

  return (
    <div id="BlogPage" className="bg-main">
      <div className="container-md">
        <div>
          <Link to={`/${forum}`}><i className="fas fa-chevron-circle-left pr-1" /></Link>
          <Link to={`/${forum}`} className="header text-caps">{forum}</Link>
          {' / '}
          <Link to={match.url}>{title}</Link>
        </div>
        <div className="header-title">
          <h3>{title}</h3>
          <span className="pl-1 size-16">by</span>
          <h3 className="pl-01 size-18 text-author">{author}</h3>
          <Link to={`/misc/posts/${id}/edit`} className="edit-post-btn">Edit Topic</Link>
        </div>
        <div ref={bodyElem} />
      </div>

    </div>
  );
};

PostPage.propTypes = {
  allPosts: propTypes.instanceOf(Array).isRequired,
  match: propTypes.instanceOf(Object).isRequired,
};

export default PostPage;

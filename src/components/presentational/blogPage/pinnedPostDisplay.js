import React from 'react';
import propTypes from 'prop-types';

const pinnedPostDisplay = ({ post }) => (
  <div className="pinned-post">
    <h4 className="pinned-post-title">{post.title}</h4>
    <h5 className="pinned-post-author">{post.author}</h5>
    <div className="pinned-post-body">{`${post.body.substring(0, 70)}...`}</div>
    <div className="pinned-post-date">{post.date}</div>
  </div>
);

pinnedPostDisplay.propTypes = {
  post: propTypes.instanceOf(Object).isRequired,
};

export default pinnedPostDisplay;

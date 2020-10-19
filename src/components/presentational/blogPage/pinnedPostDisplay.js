import React from 'react';
import propTypes from 'prop-types';

const pinnedPostDisplay = ({ post }) => (
  <div>
    <h3>{post.title}</h3>
    <h5>{post.author}</h5>
    <div>{`${post.body.substring(0, 100)}...`}</div>
    <div>{post.date}</div>
  </div>
);

pinnedPostDisplay.propTypes = {
  post: propTypes.instanceOf(Object).isRequired,
};

export default pinnedPostDisplay;

import React from 'react';
import propTypes from 'prop-types';

const PostDisplay = ({ post }) => (
  <div>
    <h3>{post.title}</h3>
    <h5>{post.author}</h5>
    <div>{`${post.body.substring(0, 220)}...`}</div>
    <div>{post.date}</div>
  </div>
);

PostDisplay.propTypes = {
  post: propTypes.instanceOf(Object).isRequired,
};

export default PostDisplay;

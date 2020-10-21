import React from 'react';
import propTypes from 'prop-types';

const PostDisplay = ({ post }) => (
  <div className="post">
    <div className="post-title">{post.title}</div>
    <div className="post-author">{post.author}</div>
    <div className="post-body">{`${post.body.substring(0, 60)}...`}</div>
    <div className="post-date">{post.date}</div>
  </div>
);

PostDisplay.propTypes = {
  post: propTypes.instanceOf(Object).isRequired,
};

export default PostDisplay;

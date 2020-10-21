import React from 'react';
import propTypes from 'prop-types';

const PostDisplay = ({ post }) => {
  const { title } = post;
  const shortTitle = title.length > 30 ? `${title.substring(0, 30)}...` : title;

  return (
    <div className="post">
      <h4 className="post-title">{shortTitle}</h4>
      <div className="post-author">{post.author}</div>
      <div className="post-body">{`${post.body.substring(0, 20)}...`}</div>
      <div className="post-date">{post.date}</div>
    </div>
  );
};

PostDisplay.propTypes = {
  post: propTypes.instanceOf(Object).isRequired,
};

export default PostDisplay;

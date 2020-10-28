import React, { useEffect, useRef } from 'react';
import propTypes from 'prop-types';
import { fetchAuthorName } from '../../misc/presets/allUsersData';

const PostDisplay = ({ post }) => {
  const { title } = post;
  const shortTitle = title.length > 30 ? `${title.substring(0, 30)}...` : title;
  const bodyElem = useRef(null);

  useEffect(() => {
    const body = bodyElem.current;
    if (body) {
      // temporary div is created to remove html tag formatting
      const tempBody = document.createElement('DIV');
      tempBody.innerHTML = post.body.substring(0, 20);
      body.innerHTML = `${tempBody.textContent}...`;
    }
  });

  return (
    <div className="post">
      <h4 className="post-title">{shortTitle}</h4>
      <div className="post-author">
        {'by '}
        <span className="text-author">{fetchAuthorName(post.author_id)}</span>
      </div>
      <div ref={bodyElem} className="post-body" />
      <div className="post-date">{post.date}</div>
    </div>
  );
};

PostDisplay.propTypes = {
  post: propTypes.instanceOf(Object).isRequired,
};

export default PostDisplay;

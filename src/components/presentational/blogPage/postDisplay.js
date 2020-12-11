import React, { useEffect, useRef } from 'react';
import propTypes from 'prop-types';

const PostDisplay = ({ post, isPinned }) => {
  // eslint-disable-next-line camelcase
  const { title, created_at } = post;
  const shortTitle = title.length > 30 ? `${title.substring(0, 30)}...` : title;
  const dateEnd = created_at.indexOf('T');
  const shortDate = created_at.substring(0, dateEnd);
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
      <h4 className="post-title">
        {isPinned && <i className="fas fa-star text-red" />}
        {shortTitle}
      </h4>
      <div className="post-author">
        {'by '}
        <span className="text-author">{post.author}</span>
      </div>
      <div ref={bodyElem} className="post-body" />
      <div className="post-date">{shortDate}</div>
    </div>
  );
};

PostDisplay.propTypes = {
  post: propTypes.instanceOf(Object).isRequired,
  isPinned: propTypes.bool.isRequired,
};

export default PostDisplay;

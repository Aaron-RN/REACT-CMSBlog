import React, { useRef, useEffect } from 'react';
import propTypes from 'prop-types';

const PinnedPostDisplay = ({ post }) => {
  const { title } = post;
  const shortTitle = title.length > 30 ? `${title.substring(0, 30)}...` : title;
  const bodyElem = useRef(null);

  useEffect(() => {
    const body = bodyElem.current;
    if (body) {
      // temporary div is created to remove html tag formatting
      const tempBody = document.createElement('DIV');
      tempBody.innerHTML = post.body.substring(0, 70);
      body.innerHTML = `${tempBody.textContent}...`;
    }
  });

  return (
    <div className="pinned-post">
      <h4 className="pinned-post-title">{shortTitle}</h4>
      <h5 className="pinned-post-author">{post.author}</h5>
      <div ref={bodyElem} className="pinned-post-body" />
      <div className="pinned-post-date">{post.date}</div>
    </div>
  );
};

PinnedPostDisplay.propTypes = {
  post: propTypes.instanceOf(Object).isRequired,
};

export default PinnedPostDisplay;

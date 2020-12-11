import React, { useRef, useEffect } from 'react';
import propTypes from 'prop-types';

const PinnedPostDisplay = ({ post }) => {
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
      tempBody.innerHTML = post.body.substring(0, 32);
      body.innerHTML = `${tempBody.textContent}...`;
    }
  });

  return (
    <div className="pinned-post">
      <h5 className="pinned-post-title">{shortTitle}</h5>
      <div className="pinned-post-author">
        <span className="text-author">{post.author}</span>
      </div>
      <div ref={bodyElem} className="pinned-post-body" />
      <div className="pinned-post-date">{shortDate}</div>
    </div>
  );
};

PinnedPostDisplay.propTypes = {
  post: propTypes.instanceOf(Object).isRequired,
};

export default PinnedPostDisplay;

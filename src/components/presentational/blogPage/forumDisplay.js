import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Paginate from '../../functional/blogPage/paginate';
import populatePosts from './populatePosts';

const ForumDisplay = ({
  forum, subforum, posts, postsPages, handlePostSelect,
}) => (
  <div className="ml-1">
    <div className="header-title">
      <Link to={`/${forum}/${subforum}`} className="text-black">
        <h4 className="text-camel">{subforum}</h4>
      </Link>
    </div>
    <Link to={`/${forum}/${subforum}/posts/new`} className="new-post-btn">New Topic</Link>
    <div className="post-section">
      <Paginate
        posts={posts}
        handlePostSelect={handlePostSelect}
        populatePosts={populatePosts}
        postsPages={postsPages}
      />
    </div>
  </div>
);

ForumDisplay.defaultProps = {
  postsPages: 5,
};

ForumDisplay.propTypes = {
  forum: propTypes.string.isRequired,
  subforum: propTypes.string.isRequired,
  posts: propTypes.instanceOf(Array).isRequired,
  postsPages: propTypes.number,
  handlePostSelect: propTypes.func.isRequired,
};

export default ForumDisplay;

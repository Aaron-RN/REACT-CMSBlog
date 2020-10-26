import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Paginate from '../../functional/blogPage/paginate';
import populatePosts from './populatePosts';

const ForumDisplay = ({
  forum, subforum, posts, postsPages, handlePostSelect, showForumHeader,
}) => {
  const [showForum, setShowForum] = useState(true);

  const handleShowForum = () => {
    setShowForum(!showForum);
  };

  const handleIcon = state => {
    const plusIcon = (<i className="far fa-plus-square" />);
    const minusIcon = (<i className="far fa-minus-square" />);
    return (
      <div className="inline-block">
        {/* eslint-disable react/jsx-one-expression-per-line */}
        {!state && (<span>{plusIcon} show</span>)}
        {state && (<span>{minusIcon} hide</span>)}
        {/* eslint-enable-line react/jsx-one-expression-per-line */}
      </div>
    );
  };

  return (
    <div className="forum-section z-2">
      {showForumHeader && (
      <div className="header-title">
        <Link to={`/${forum}`} className="text-black"><h3 className="text-camel">{forum}</h3></Link>
        <button type="button" onClick={() => handleShowForum(showForum)}>
          {handleIcon(showForum)}
        </button>
      </div>
      )}
      {(subforum && showForum) && (
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
      )}
      {(!subforum && showForum) && (
      <div>
        <Link to={`/${forum}/posts/new`} className="new-post-btn">New Topic</Link>
        <div className="post-section">
          <Paginate
            posts={posts}
            handlePostSelect={handlePostSelect}
            populatePosts={populatePosts}
            postsPages={postsPages}
          />
        </div>
      </div>
      )}
    </div>
  );
};

ForumDisplay.defaultProps = {
  subforum: '',
  postsPages: 5,
  showForumHeader: true,
};

ForumDisplay.propTypes = {
  forum: propTypes.string.isRequired,
  subforum: propTypes.string,
  posts: propTypes.instanceOf(Array).isRequired,
  postsPages: propTypes.number,
  handlePostSelect: propTypes.func.isRequired,
  showForumHeader: propTypes.bool,
};

export default ForumDisplay;

import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Paginate from '../../functional/blogPage/paginate';
import populatePosts from './populatePosts';
import SubForumDisplay from './subForumDisplay';

const ForumDisplay = ({
  forum, postsPages, handlePostSelect,
}) => {
  const [showForum, setShowForum] = useState(true);
  const [forumTitle, setForumTitle] = useState('');
  const [subForums, setSubForums] = useState([]);

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

  const populateSubForums = () => subForums.map(subforumData => (
    <SubForumDisplay
      key={subforumData.subforum}
      forum={forum.forum}
      subforum={subforumData}
      handleIcon={handleIcon}
      handlePostSelect={handlePostSelect}
    />
  ));

  useEffect(() => {
    setForumTitle(forum.forum);
    setSubForums(forum.subforums);
  }, [forum]);

  return (
    <div className="forum-section z-2">
      <div className="header-title bg-announcement">
        <Link to={`/${forumTitle}`} className="text-black"><h3 className="text-camel">{forumTitle}</h3></Link>
        <button type="button" onClick={() => handleShowForum(showForum)}>
          {handleIcon(showForum)}
        </button>
      </div>
      {(subForums.length > 0 && showForum) && populateSubForums()}
      {(!subForums.length && showForum) && (
        <div>
          <Link to={`/${forumTitle}/posts/new`} className="new-post-btn">New Topic</Link>
          <div className="post-section">
            <Paginate
              posts={forum.posts}
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
  postsPages: 5,
};

ForumDisplay.propTypes = {
  forum: propTypes.instanceOf(Object).isRequired,
  postsPages: propTypes.number,
  handlePostSelect: propTypes.func.isRequired,
};

export default ForumDisplay;

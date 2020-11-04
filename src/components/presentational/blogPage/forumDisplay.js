import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { isPostSuspended } from '../../misc/presets/allUsersData';
import Paginate from '../../functional/blogPage/paginatePosts';
import populatePosts from './populatePosts';
import SubForumDisplay from './subForumDisplay';

const ForumDisplay = ({
  user, forum, postsPages, handlePostSelect,
}) => {
  const [showForum, setShowForum] = useState(false);
  const [forumTitle, setForumTitle] = useState('');
  const [subForums, setSubForums] = useState([]);

  const isAdmin = user.admin_level > 0;

  const canSeeForum = () => {
    if (!forum.admin_view_only) return true;
    if (forum.admin_view_only && isAdmin) return true;
    return false;
  };
  const checkForumContraints = () => {
    if (isPostSuspended(user.id)) return false; // Takes precedence over all conditions
    if (!forum.admin_only) return true;
    if (forum.admin_only && isAdmin) return true;
    return false;
  };

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
      forum={forum.name}
      subforum={subforumData}
      handleIcon={handleIcon}
      handlePostSelect={handlePostSelect}
      checkForumContraints={checkForumContraints}
    />
  ));

  useEffect(() => {
    setForumTitle(forum.name);
    setSubForums(forum.subforums);
  }, [forum]);

  // Expand all forums whose subforums have posts/topics
  useEffect(() => {
    if (subForums.some(subforumData => subforumData.posts.length > 0)) { setShowForum(true); }
    if (forum.posts.length > 0) { setShowForum(true); }
  }, [subForums, forum]);

  return canSeeForum()
    ? (
      <div className="forum-section z-2">
        <div className="header-title bg-announcement">
          <Link to={`/${forumTitle}`}><h3 className="text-camel">{forumTitle}</h3></Link>
          <button type="button" onClick={() => handleShowForum(showForum)}>
            {handleIcon(showForum)}
          </button>
        </div>
        {(subForums.length > 0 && showForum) && populateSubForums()}
        {(!subForums.length && showForum) && (
        <div>
          {checkForumContraints() && (<Link to={`/${forumTitle}/posts/new`} className="new-post-btn">New Topic</Link>)}
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
    )
    : null;
};

ForumDisplay.defaultProps = {
  postsPages: 5,
};

ForumDisplay.propTypes = {
  user: propTypes.instanceOf(Object).isRequired,
  forum: propTypes.instanceOf(Object).isRequired,
  postsPages: propTypes.number,
  handlePostSelect: propTypes.func.isRequired,
};

export default ForumDisplay;

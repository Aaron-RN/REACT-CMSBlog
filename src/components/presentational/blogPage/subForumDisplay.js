import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Paginate from '../../functional/blogPage/paginatePosts';
import populatePosts from './populatePosts';

const SubForumDisplay = ({
  forum, subforum, handleIcon, handlePostSelect, checkForumContraints, postsPerPage,
}) => {
  const [forumTitle, setForumTitle] = useState('');
  const [posts, setPosts] = useState([]);
  const [showForum, setShowForum] = useState(false);

  const handleShowForum = () => {
    setShowForum(!showForum);
  };

  useEffect(() => {
    setPosts(subforum.posts);
    setForumTitle(subforum.subforum);
  }, [subforum]);

  // Expand all subforums that have posts/topics
  useEffect(() => {
    if (posts.length > 0) { setShowForum(true); }
    if (forum.isSubforum) { setShowForum(true); }
  }, [posts, forum.isSubforum]);

  return (
    <div className="forum-section ml-1">
      <div className="header-title">
        <Link to={`/${forum.name}/${forumTitle}`}>
          <h4 className="text-camel">{forumTitle}</h4>
        </Link>
        <button type="button" onClick={() => handleShowForum(showForum)}>
          {handleIcon(showForum)}
        </button>
      </div>
      {showForum && (
        <div>
          {checkForumContraints() && (
            <Link
              to={`/${forum.name}/${forumTitle}/posts/new?forum_id=${forum.id}&&subforum_id=${subforum.id}`}
              className="new-post-btn"
            >
              New Topic
            </Link>
          )}
          <div className="post-section">
            <Paginate
              posts={posts}
              handlePostSelect={handlePostSelect}
              populatePosts={populatePosts}
              postsPages={postsPerPage}
            />
          </div>
        </div>
      )}
    </div>
  );
};

SubForumDisplay.defaultProps = {
  postsPerPage: 5,
};

SubForumDisplay.propTypes = {
  forum: propTypes.instanceOf(Object).isRequired,
  subforum: propTypes.instanceOf(Object).isRequired,
  handleIcon: propTypes.func.isRequired,
  handlePostSelect: propTypes.func.isRequired,
  checkForumContraints: propTypes.func.isRequired,
  postsPerPage: propTypes.number,
};

export default SubForumDisplay;

import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PostDisplay from '../../presentational/blogPage/postDisplay';
import '../../../assets/css/blogPage.css';
import Paginate from './paginate';

const TopicForum = ({ allPosts, forum }) => {
  const [forumTopics, setForumTopics] = useState([]);

  const populatePosts = postsArray => postsArray.map(post => (
    <Link to={`/${post.forum}/posts/${post.id}`} key={post.id} className="text-black">
      <PostDisplay post={post} />
    </Link>
  ));

  // Grab all topics by forum on Component Load
  useEffect(() => {
    const postTopics = allPosts.filter(post => post.forum === forum);
    setForumTopics(postTopics);
  }, [allPosts, forum]);

  return (
    <div id="BlogPage" className="bg-main pt-1">
      <div className="container-md">
        <div className="section">
          <h4 className="text-grey">Forum</h4>
          <div>
            <Link to="/"><i className="fas fa-chevron-circle-left pr-1" /></Link>
            <Link to={`/${forum}`} className="header text-caps">{forum}</Link>
            {' / '}
          </div>
          <div className="forum-section z-2">
            <div className="header-title">
              <h3 className="text-camel">{forum}</h3>
            </div>
            <Link to="/misc/posts/new" className="new-post-btn">New Topic</Link>
            <div className="post-section">
              <Paginate
                posts={forumTopics}
                populatePosts={populatePosts}
                postsPages={10}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

TopicForum.propTypes = {
  forum: propTypes.string.isRequired,
  allPosts: propTypes.instanceOf(Array).isRequired,
};

export default TopicForum;

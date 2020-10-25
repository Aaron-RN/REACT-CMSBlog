import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PostDisplay from '../../presentational/blogPage/postDisplay';
import Paginate from './paginate';
import allForumsData from './presets/allForumsData';
import '../../../assets/css/blogPage.css';

const TopicForum = ({ match, allPosts, handlePostSelect }) => {
  const [forumTopics, setForumTopics] = useState([]);
  const [subForums, setSubForums] = useState([]);
  const { forum, subforum } = match.params;

  const populatePosts = postsArray => postsArray.map(post => (
    <button type="button" key={post.id} className="bare-btn row" onClick={() => handlePostSelect(post)}>
      <PostDisplay post={post} />
    </button>
  ));

  // Populate all posts when forum has no subforums
  const populateAllPosts = () => {
    const postTopics = allPosts.filter(post => post.forum === forum);
    return (
      <div className="post-section">
        <Paginate
          posts={postTopics}
          populatePosts={populatePosts}
          postsPages={10}
        />
      </div>
    );
  };

  // Populate all forums related to subforum
  const populateSubPosts = () => {
    if (forumTopics.length) {
      const subPosts = forumTopics.filter(data => data.subforum === subforum)[0].posts;
      return (
        <div className="ml-1">
          <div className="header-title">
            <Link to={`/${forum}/${subforum}`} className="text-black">
              <h4 className="text-camel">{subforum}</h4>
            </Link>
          </div>
          <Link to={`/${forum}/${subforum}/posts/new`} className="new-post-btn">New Topic</Link>
          <div className="post-section">
            <Paginate
              posts={subPosts}
              populatePosts={populatePosts}
              postsPages={10}
            />
          </div>
        </div>
      );
    }
    return null;
  };

  // Populate all subforums and related posts paginated by 5 posts per page
  const populateSubForums = () => subForums.map(forumData => {
    const subPosts = forumTopics.filter(data => data.subforum === forumData)[0].posts;
    return (
      <div key={forumData} className="ml-1">
        <div className="header-title">
          <Link to={`/${forum}/${forumData}`} className="text-black">
            <h4 className="text-camel">{forumData}</h4>
          </Link>
        </div>
        <Link to={`/${forum}/${forumData}/posts/new`} className="new-post-btn">New Topic</Link>
        <div className="post-section">
          <Paginate
            posts={subPosts}
            populatePosts={populatePosts}
            postsPages={5}
          />
        </div>
      </div>
    );
  });

  // Grab all topics by forum on Component Load
  useEffect(() => {
    const forumObj = allForumsData.filter(forumData => forumData.forum === forum)[0];
    const allSubforums = forumObj.subforum;
    const categorizedPosts = allSubforums.map(formData => ({
      subforum: formData,
      posts: allPosts.filter(post => post.forum === forum && post.subforum === formData),
    }));
    setForumTopics(categorizedPosts);
    setSubForums(allSubforums);
  }, [allPosts, forum]);

  return (
    <div id="BlogPage" className="bg-main pt-1">
      <div className="container-md">
        <div className="section">
          <h4 className="text-grey">Forum</h4>
          <div>
            <Link to="/"><i className="fas fa-chevron-circle-left pr-1" /></Link>
            <Link to={`/${forum}`} className="header text-caps">{forum}</Link>
            {subforum && ' / '}
            {subforum && <Link to={`/${forum}/${subforum}`} className="header text-caps">{subforum}</Link>}
            {' / '}
          </div>
          <div className="forum-section z-2">
            <div className="header-title">
              <h3 className="text-camel">{forum}</h3>
            </div>
            {(!subforum && !subForums.length) && populateAllPosts()}
            {(!subforum && subForums) && populateSubForums()}
            {subforum && populateSubPosts()}
          </div>
        </div>
      </div>
    </div>
  );
};

TopicForum.propTypes = {
  match: propTypes.instanceOf(Object).isRequired,
  allPosts: propTypes.instanceOf(Array).isRequired,
  handlePostSelect: propTypes.func.isRequired,
};

export default TopicForum;

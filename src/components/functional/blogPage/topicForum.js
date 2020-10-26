import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Paginate from './paginate';
import ForumDisplay from '../../presentational/blogPage/forumDisplay';
import PopulatePosts from '../../presentational/blogPage/populatePosts';
import '../../../assets/css/blogPage.css';

const TopicForum = ({
  match, allPosts, allForums, handlePostSelect,
}) => {
  const [forumTopics, setForumTopics] = useState([]);
  const [subForums, setSubForums] = useState([]);
  const { forum, subforum } = match.params;

  // Populate all posts when forum has no subforums
  const populateAllPosts = () => {
    const postTopics = allPosts.filter(post => post.forum === forum);
    return (
      <div className="post-section">
        <Paginate
          posts={postTopics}
          handlePostSelect={handlePostSelect}
          populatePosts={PopulatePosts}
          postsPages={10}
          showForumHeader={false}
        />
      </div>
    );
  };

  // Populate all topics related to subforum
  const populateSubPosts = () => {
    if (forumTopics.length) {
      const subPosts = forumTopics.filter(data => data.subforum === subforum)[0].posts;
      return (
        <ForumDisplay
          forum={forum}
          subforum={subforum}
          posts={subPosts}
          handlePostSelect={handlePostSelect}
          populatePosts={PopulatePosts}
          postsPages={10}
          showForumHeader={false}
        />
      );
    }
    return null;
  };

  // Populate all subforums and related posts paginated by 5 posts per page
  const populateSubForums = () => subForums.map(forumData => {
    const subPosts = forumTopics.filter(data => data.subforum === forumData)[0].posts;
    return (
      <ForumDisplay
        key={forumData}
        forum={forum}
        subforum={forumData}
        posts={subPosts}
        handlePostSelect={handlePostSelect}
        populatePosts={PopulatePosts}
        postsPages={5}
        showForumHeader={false}
      />
    );
  });

  // Grab all topics by forum on Component Load
  useEffect(() => {
    const forumObj = allForums.filter(forumData => forumData.forum === forum)[0];
    const allSubforums = forumObj.subforum;
    const categorizedPosts = allSubforums.map(formData => ({
      subforum: formData,
      posts: allPosts.filter(post => post.forum === forum && post.subforum === formData),
    }));
    setForumTopics(categorizedPosts);
    setSubForums(allSubforums);
  }, [allForums, allPosts, forum]);

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
              <Link to={`/${forum}`} className="text-black"><h3 className="text-camel">{forum}</h3></Link>
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
  allForums: propTypes.instanceOf(Array).isRequired,
  allPosts: propTypes.instanceOf(Array).isRequired,
  handlePostSelect: propTypes.func.isRequired,
};

export default TopicForum;

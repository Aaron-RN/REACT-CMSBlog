import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import PinnedPostDisplay from '../presentational/blogPage/pinnedPostDisplay';
import ForumDisplay from '../presentational/blogPage/forumDisplay';
import '../../assets/css/blogPage.css';

const BlogPage = ({
  user, allPosts, allForums, handlePostSelect,
}) => {
  const [pinnedPosts, setPinnedPosts] = useState([]);
  const [forumTopics, setForumTopics] = useState([]);

  const populatePins = () => pinnedPosts.map(post => (
    <button type="button" key={post.id} className="bare-btn" onClick={() => handlePostSelect(post)}>
      <PinnedPostDisplay post={post} />
    </button>
  ));

  // Populate all subforums and related posts paginated by 5 posts per page
  const populateAllForums = () => forumTopics.map(forumData => (
    <ForumDisplay
      key={forumData.name}
      user={user}
      forum={forumData}
      handlePostSelect={handlePostSelect}
      postsPages={5}
    />
  ));

  // Grab all pinned Posts, and sort all other posts by forum on Component Load
  useEffect(() => {
    const postPins = allPosts.filter(post => post.is_pinned);
    const categorizedPosts = allForums.map(forumData => ({
      name: forumData.name,
      posts: allPosts.filter(post => post.forum === forumData.name && !post.subforum),
      subforums: forumData.subforum.map(subforum => (
        {
          subforum,
          posts: allPosts
            .filter(post => post.forum === forumData.name && post.subforum === subforum),
        }
      )),
      admin_only: forumData.admin_only,
      admin_view_only: forumData.admin_view_only,
    }));
    setPinnedPosts(postPins);
    setForumTopics(categorizedPosts);
  }, [allForums, allPosts]);

  return (
    <div id="BlogPage" className="bg-main pt-1">
      <div className="container-md">
        <div className="section">
          <div className="forum-section z-2">
            <div className="header-title bg-announcement align-items-base">
              <i className="fas fa-star text-red" />
              <h3>{' Pinned Posts'}</h3>
            </div>
            <div className="pinned-section">{populatePins()}</div>
          </div>
        </div>
        <div className="section">
          <h4 className="text-grey">Forums</h4>
          {populateAllForums()}
        </div>
      </div>
    </div>
  );
};

BlogPage.propTypes = {
  user: propTypes.instanceOf(Object).isRequired,
  allPosts: propTypes.instanceOf(Array).isRequired,
  allForums: propTypes.instanceOf(Array).isRequired,
  handlePostSelect: propTypes.func.isRequired,
};

export default BlogPage;

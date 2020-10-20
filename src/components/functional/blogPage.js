import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import PinnedPostDisplay from '../presentational/blogPage/pinnedPostDisplay';
import PostDisplay from '../presentational/blogPage/postDisplay';

const BlogPage = ({ allPosts }) => {
  const [pinnedPosts, setPinnedPosts] = useState([]);

  const populatePins = () => pinnedPosts.map(post => (
    <PinnedPostDisplay key={post.id} post={post} />
  ));

  const populatePosts = () => allPosts.map(post => (
    <PostDisplay key={post.id} post={post} />
  ));

  // Grab all pinned Post on Component Load
  useEffect(() => {
    const postPins = allPosts.filter(post => post.is_pinned);
    setPinnedPosts(postPins);
  }, [allPosts, setPinnedPosts]);

  return (
    <div className="bg-main pt-1">
      <div className="container">
        <div>
          <h2>Pinned Posts</h2>
          <div>{populatePins()}</div>
        </div>
        <div>
          <h2>All Posts</h2>
          <div>{populatePosts()}</div>
        </div>
      </div>
    </div>
  );
};

BlogPage.propTypes = {
  allPosts: propTypes.instanceOf(Array).isRequired,
};

export default BlogPage;

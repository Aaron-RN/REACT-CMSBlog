import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import PinnedPostDisplay from '../presentational/blogPage/pinnedPostDisplay';
import PostDisplay from '../presentational/blogPage/postDisplay';
import '../../assets/css/blogPage.css';
import Paginate from './paginate';

const BlogPage = ({ allPosts }) => {
  const [pinnedPosts, setPinnedPosts] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [miscPosts, setMiscPosts] = useState([]);

  const populatePins = () => pinnedPosts.map(post => (
    <PinnedPostDisplay key={post.id} post={post} />
  ));

  const populatePosts = postsArray => postsArray.map(post => (
    <PostDisplay key={post.id} post={post} />
  ));

  // Grab all pinned Post on Component Load
  useEffect(() => {
    const postPins = allPosts.filter(post => post.is_pinned);
    const postAnnouncements = allPosts.filter(post => post.forum === 'announcements');
    const postMiscs = allPosts.filter(post => post.forum === 'misc');
    setPinnedPosts(postPins);
    setAnnouncements(postAnnouncements);
    setMiscPosts(postMiscs);
  }, [allPosts]);

  return (
    <div id="BlogPage" className="bg-main pt-1">
      <div className="container">
        <div className="forum-section z-2">
          <h4 className="header-title">
            <i className="fas fa-star text-blue" />
            Pinned Posts
          </h4>
          <div className="pinned-section">{populatePins()}</div>
        </div>
        <div>
          <h4 className="text-grey">Forums</h4>
        </div>
        <div className="forum-section z-2">
          <h4 className="header-title">Announcements</h4>
          <div className="post-section">
            <Paginate posts={announcements} populatePosts={populatePosts} />
          </div>
        </div>
        <div className="forum-section z-2">
          <h4 className="header-title">Misc</h4>
          <div className="post-section">
            <Paginate posts={miscPosts} populatePosts={populatePosts} postsPages={3} />
          </div>
        </div>
      </div>
    </div>
  );
};

BlogPage.propTypes = {
  allPosts: propTypes.instanceOf(Array).isRequired,
};

export default BlogPage;

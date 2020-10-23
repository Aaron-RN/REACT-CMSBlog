import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PinnedPostDisplay from '../presentational/blogPage/pinnedPostDisplay';
import PostDisplay from '../presentational/blogPage/postDisplay';
import '../../assets/css/blogPage.css';
import Paginate from './blogPage/paginate';

const BlogPage = ({ allPosts }) => {
  const [pinnedPosts, setPinnedPosts] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [miscPosts, setMiscPosts] = useState([]);
  const [showAnnouncements, setShowAnnouncements] = useState(true);
  const [showMisc, setShowMisc] = useState(true);

  const handleShowForum = (state, func) => {
    func(!state);
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

  const populatePins = () => pinnedPosts.map(post => (
    <Link to={`/${post.forum}/posts/${post.id}`} key={post.id} className="text-black">
      <PinnedPostDisplay key={post.id} post={post} />
    </Link>
  ));

  const populatePosts = postsArray => postsArray.map(post => (
    <Link to={`/${post.forum}/posts/${post.id}`} key={post.id} className="text-black">
      <PostDisplay post={post} />
    </Link>
  ));

  // Grab all pinned Posts, and sort all other posts by forum on Component Load
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
      <div className="container-md">
        <div className="section">
          <div className="forum-section z-2">
            <div className="header-title bg-announcement align-items-base">
              <i className="fas fa-star text-blue" />
              <h3>{' Pinned Posts'}</h3>
            </div>
            <div className="pinned-section">{populatePins()}</div>
          </div>
        </div>
        <div className="section">
          <h4 className="text-grey">Forums</h4>
          <div className="forum-section z-2">
            <div className="header-title bg-announcement">
              <Link to="/announcements" className="text-black"><h3>Announcements</h3></Link>
              <button type="button" onClick={() => handleShowForum(showAnnouncements, setShowAnnouncements)}>
                {handleIcon(showAnnouncements)}
              </button>
            </div>
            <Link to="/announcements/posts/new" className="new-post-btn announcement-btn">New Topic</Link>
            {showAnnouncements && (
            <div className="post-section">
              <Paginate
                posts={announcements}
                populatePosts={populatePosts}
              />
            </div>
            )}
          </div>
          <div className="forum-section z-2">
            <div className="header-title">
              <Link to="/misc" className="text-black"><h3>Misc</h3></Link>
              <button type="button" onClick={() => handleShowForum(showMisc, setShowMisc)}>
                {handleIcon(showMisc)}
              </button>
            </div>
            <Link to="/misc/posts/new" className="new-post-btn">New Topic</Link>
            {showMisc && (
            <div className="post-section">
              <Paginate
                posts={miscPosts}
                populatePosts={populatePosts}
              />
            </div>
            )}
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

import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import {
  Link,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import logo from './assets/images/logo.svg';
import './assets/css/App.css';
import BlogPage from './components/functional/blogPage';
import PostPage from './components/functional/blogPage/postPage';
import TopicForum from './components/functional/blogPage/topicForum';
import NewPost from './components/functional/blogPage/newPost';
import EditPost from './components/functional/blogPage/editPost';
import NewUsers from './components/functional/users/newUsers';
import { allUsersData } from './components/misc/presets/allUsersData';
import allPostsData from './components/misc/presets/allPostsData';
import allForumsData from './components/misc/presets/allForumsData';

import Login from './components/functional/users/login';
import Modal from './components/functional/modal';

const App = () => {
  const [allUsers] = useState(allUsersData);
  const [user, setUser] = useState({ id: 1, username: 'John Doe', admin_level: 1 });
  const [selectedPost, setSelectedPost] = useState(null);
  const [allForums, setAllForums] = useState(allForumsData);
  const [allPosts, setAllPosts] = useState(allPostsData);
  const [status, setStatus] = useState({ errors: [] });
  const [showModal, setShowModal] = useState(false);
  const [redirect, setRedirect] = useState(null);

  // Handles selection of post when post is clicked
  const handlePostSelect = post => {
    setSelectedPost(post);
  };

  // Toggle modal and clear status
  const handleModal = () => {
    setShowModal(!showModal);
    setStatus({ errors: [] });
  };

  // Check if user is logged in
  useEffect(() => setUser({ logged_in: false }), []);

  useEffect(() => setAllForums(allForumsData), []);
  useEffect(() => {
    const allPostsSorted = allPosts.sort((a, b) => b.id - a.id);
    setAllPosts(allPostsSorted);
  }, [allPosts]);

  // Follow up redirect after a post is selected
  useEffect(() => {
    if (selectedPost) {
      const { forum, subforum, id } = selectedPost;
      setRedirect(<Redirect to={`/${forum}${subforum ? `/${subforum}` : ''}/posts/${id}`} />);
    }
  }, [selectedPost]);

  useEffect(() => { setRedirect(null); setSelectedPost(null); }, [redirect]);

  const { errors } = status;

  // open Modal to show errors
  useEffect(() => {
    if (errors.length > 0) setShowModal(true);
  }, [status]);

  return redirect || (
    <div className="App">
      <header className="bg-navbar">
        <nav className="container">
          <Link to="/" className="inline-flex text-home">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>React.js CMS-Forum</h2>
          </Link>
        </nav>
      </header>
      <main className="bg-navbar pt-1">
        <p className="container mt-0">
          Welcome to the
          {' '}
          <a className="header" href="https://hackernoon.com/" target="_blank" rel="noopener noreferrer">React.js CMS-Forum Demo</a>
          {' '}
          {/* eslint-disable react/jsx-one-expression-per-line */}
          which uses <span className="header">React-Quill</span> as the rich-text editor
          and <span className="header">Cloudinary</span> for
          image management, glued together by <span className="header">React</span> and
          powered by <span className="header">Rails</span>.
          {/* eslint-enable react/jsx-one-expression-per-line */}
        </p>
        <div className="blend-nav-main" />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <BlogPage
                allForums={allForums}
                allPosts={allPosts}
                handlePostSelect={handlePostSelect}
              />
            )}
          />
          <Route
            exact
            path="/login"
            render={() => <Login />}
          />
          <Route
            exact
            path="/:forum"
            render={props => (
              <TopicForum
                match={props.match}
                allForums={allForums}
                allPosts={allPosts}
                handlePostSelect={handlePostSelect}
              />
            )}
          />
          <Route
            exact
            path="/:forum/:subforum"
            render={props => (
              <TopicForum
                match={props.match}
                allForums={allForums}
                allPosts={allPosts}
                handlePostSelect={handlePostSelect}
              />
            )}
          />
          <Route
            exact
            path="/:forum/posts/new"
            render={props => <NewPost match={props.match} user={user} />}
          />
          <Route
            exact
            path="/:forum/:subforum/posts/new"
            render={props => <NewPost match={props.match} user={user} />}
          />
          <Route
            exact
            path="/:forum/posts/:id"
            render={props => (
              <PostPage
                match={props.match}
                user={user}
                allPosts={allPosts}
                handlePostSelect={handlePostSelect}
              />
            )}
          />
          <Route
            exact
            path="/:forum/:subforum/posts/:id"
            render={props => (
              <PostPage
                match={props.match}
                user={user}
                allPosts={allPosts}
                handlePostSelect={handlePostSelect}
              />
            )}
          />
          <Route
            exact
            path="/:forum/posts/:id/edit"
            render={props => (
              <EditPost
                match={props.match}
                user={user}
                allPosts={allPosts}
              />
            )}
          />
          <Route
            exact
            path="/:forum/:subforum/posts/:id/edit"
            render={props => (
              <EditPost
                match={props.match}
                user={user}
                allPosts={allPosts}
              />
            )}
          />
        </Switch>
      </main>
      <div className="blend-main-footer" />
      <footer className="footer">
        <NewUsers allUsers={allUsers} />
        <div className="container text-right">
          © Aaron Rory Newbold 2020
        </div>
      </footer>
      {showModal && <Modal status={status} handleModal={handleModal} />}
    </div>
  );
};

App.defaultProps = {
  match: {},
};

App.propTypes = {
  match: propTypes.instanceOf(Object),
};

export default App;

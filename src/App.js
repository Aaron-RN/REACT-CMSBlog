import React, { useState, useEffect, useCallback } from 'react';
import propTypes from 'prop-types';
import {
  Link,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import logo from './assets/images/logo.svg';
import './assets/css/App.css';
import { userLoggedIn } from './components/misc/apiRequests';
import BlogPage from './components/functional/blogPage';
import PostPage from './components/functional/blogPage/postPage';
import TopicForum from './components/functional/blogPage/topicForum';
import NewPost from './components/functional/blogPage/newPost';
import EditPost from './components/functional/blogPage/editPost';
import NewUsers from './components/functional/users/newUsers';
import { allUsersData } from './components/misc/presets/allUsersData';

import Register from './components/functional/users/register';
import Login from './components/functional/users/login';
import Modal from './components/functional/modal';
import Loader from './components/presentational/loader';
import LoginBtn from './components/functional/users/loginBtn';
import ProfilePage from './components/functional/users/profilePage';

const App = () => {
  const [allUsers] = useState(allUsersData);
  const [user, setUser] = useState({ logged_in: false });
  const [selectedPost, setSelectedPost] = useState(null);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [redirect, setRedirect] = useState(null);

  // Toggle modal and clear status
  const handleModal = useCallback((errors = []) => {
    setShowModal(!showModal);
    setErrors(errors);
  }, [showModal, setShowModal, setErrors]);

  const handleLoader = useCallback((loading = true) => {
    setIsLoading(loading);
  }, [setIsLoading]);

  // Handles selection of post when post is clicked
  const handlePostSelect = post => {
    setSelectedPost(post);
  };

  const handleLogin = user => {
    setUser(user);
    setRedirect(<Redirect to="/" />);
  };

  const handleLogout = () => {
    setUser({ logged_in: false });
  };

  // Check if user is logged in
  useEffect(() => {
    handleLoader(true);
    userLoggedIn()
      .then(response => {
        if (response.success) setUser(response.user);
        if (!response.success) handleModal(response.errors);
        handleLoader(false);
      });
  }, [handleLoader, handleModal]);

  // Follow up redirect after a post is selected
  useEffect(() => {
    if (selectedPost) {
      const { forum, subforum, id } = selectedPost;
      console.log(selectedPost);
      setRedirect(<Redirect to={`/${forum}${subforum ? `/${subforum}` : ''}/posts/${id}/show`} />);
    }
  }, [selectedPost]);

  useEffect(() => { setRedirect(null); setSelectedPost(null); }, [redirect]);

  // open Modal to show errors
  useEffect(() => {
    if (errors.length > 0) setShowModal(true);
  }, [errors]);

  return redirect || (
    <div className="App">
      <header className="bg-navbar">
        <nav className="container">
          <div className="flex-row">
            <Link to="/" className="inline-flex text-home">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>React.js CMS-Forum</h2>
            </Link>
            <LoginBtn user={user} />
          </div>
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
                user={user}
                handlePostSelect={handlePostSelect}
                handleLoader={handleLoader}
                handleModal={handleModal}
              />
            )}
          />
          <Route
            exact
            path="/sign_up"
            render={() => <Register handleModal={handleModal} handleLoader={handleLoader} />}
          />
          <Route
            exact
            path="/login"
            render={() => (
              <Login
                handleModal={handleModal}
                handleLoader={handleLoader}
                handleLogin={handleLogin}
              />
            )}
          />
          <Route
            exact
            path="/users/:id"
            render={props => (
              <ProfilePage
                match={props.match}
                user={user}
                handleLogout={handleLogout}
                handlePostSelect={handlePostSelect}
                handleLoader={handleLoader}
                handleModal={handleModal}
              />
            )}
          />
          <Route
            exact
            path="/:forum"
            render={props => (
              <TopicForum
                match={props.match}
                user={user}
                handleLoader={handleLoader}
                handleModal={handleModal}
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
                user={user}
                handleLoader={handleLoader}
                handleModal={handleModal}
                handlePostSelect={handlePostSelect}
              />
            )}
          />
          <Route
            exact
            path="/:forum/posts/new"
            render={props => (
              <NewPost
                match={props.match}
                user={user}
                handlePostSelect={handlePostSelect}
                handleLoader={handleLoader}
                handleModal={handleModal}
              />
            )}
          />
          <Route
            exact
            path="/:forum/:subforum/posts/new"
            render={props => (
              <NewPost
                match={props.match}
                user={user}
                handlePostSelect={handlePostSelect}
                handleLoader={handleLoader}
                handleModal={handleModal}
              />
            )}
          />
          <Route
            exact
            path="/:forum/posts/:id/show"
            render={props => (
              <PostPage
                match={props.match}
                user={user}
                handleLoader={handleLoader}
                handleModal={handleModal}
                handlePostSelect={handlePostSelect}
              />
            )}
          />
          <Route
            exact
            path="/:forum/:subforum/posts/:id/show"
            render={props => (
              <PostPage
                match={props.match}
                user={user}
                handleLoader={handleLoader}
                handleModal={handleModal}
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
                handleLoader={handleLoader}
                handleModal={handleModal}
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
                handleLoader={handleLoader}
                handleModal={handleModal}
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
      {showModal && <Modal errors={errors} handleModal={handleModal} />}
      {isLoading && <Loader />}
    </div>
  );
};

App.defaultProps = {
  match: {},
  location: {},
};

App.propTypes = {
  match: propTypes.instanceOf(Object),
  location: propTypes.instanceOf(Object),
};

export default App;

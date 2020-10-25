import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import {
  Link,
  Switch,
  Route,
} from 'react-router-dom';
import BlogPage from './components/functional/blogPage';
import PostPage from './components/functional/blogPage/postPage';
import TopicForum from './components/functional/blogPage/topicForum';
import NewPost from './components/functional/blogPage/newPost';
import EditPost from './components/functional/blogPage/editPost';
import NewUsers from './components/functional/users/newUsers';
import allUsersData from './components/functional/users/presets/allUsersData';
import allPostsData from './components/functional/blogPage/presets/allPostsData';
import logo from './assets/images/logo.svg';
import './assets/css/App.css';

const App = () => {
  const [allUsers] = useState(allUsersData);
  const [user] = useState({ id: 1, username: 'John Doe', admin_level: 1 });
  // const [loggedIn, setLoggedIn] = useState(false);
  const [allPosts, setAllPosts] = useState(allPostsData);

  useEffect(() => {
    const allPostsSorted = allPosts.sort((a, b) => b.id - a.id);
    setAllPosts(allPostsSorted);
  }, [allPosts]);

  return (
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
          <a className="header" href="https://hackernoon.com/">React.js CMS-Forum Demo</a>
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
            render={() => <BlogPage allPosts={allPosts} />}
          />
          <Route
            exact
            path="/announcements"
            render={() => <TopicForum allPosts={allPosts} forum="announcements" />}
          />
          <Route
            exact
            path="/misc"
            render={() => <TopicForum allPosts={allPosts} forum="misc" />}
          />
          <Route
            exact
            path="/announcements/posts/new"
            render={() => <NewPost user={user} forum="announcements" />}
          />
          <Route
            exact
            path="/misc/posts/new"
            render={() => <NewPost user={user} forum="misc" />}
          />
          <Route
            exact
            path="/:forum/posts/:id"
            render={props => (
              <PostPage
                match={props.match}
                user={user}
                allPosts={allPosts}
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
        </Switch>
      </main>
      <div className="blend-main-footer" />
      <footer className="footer">
        <NewUsers allUsers={allUsers} />
        <div className="container text-right">
          © Aaron Rory Newbold 2020
        </div>
      </footer>
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

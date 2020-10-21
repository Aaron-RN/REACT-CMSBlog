import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import BlogPage from './components/functional/blogPage';
import allPostsData from './components/functional/blogPage/presets/allPostsData';
import logo from './assets/images/logo.svg';
import './assets/css/App.css';

const App = () => {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [allPosts, setAllPosts] = useState(allPostsData);

  useEffect(() => {
    const allPostsSorted = allPosts.sort((a, b) => b.id - a.id);
    setAllPosts(allPostsSorted);
  }, [allPosts]);

  return (
    <div className="App">
      <header className="bg-navbar">
        <nav className="container flex-row text-center-sm">
          <img src={logo} className="App-logo" alt="logo" />
          <h3 className="inline-block">React.js CMS-Blog</h3>
        </nav>
      </header>
      <main className="bg-navbar pt-1">
        <p className="container mt-0">
          Welcome to the
          {' '}
          <a href="https://hackernoon.com/">React.js CMS-Blog Demo</a>
          {' '}
          {`which uses React-Quill as the rich-text editor and Cloudinary
          for image management, glued together by react and powered by Rails.`}
        </p>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <BlogPage allPosts={allPosts} />}
          />
        </Switch>
      </main>
    </div>
  );
};

export default App;

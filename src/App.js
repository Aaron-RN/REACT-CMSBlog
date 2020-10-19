import React, { useState } from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import BlogPage from './components/functional/blogPage';
import logo from './assets/images/logo.svg';
import './assets/css/App.css';

const App = () => {
  const [allPosts, setAllPosts] = useState([{}]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit
          <code> src/App.js </code>
          and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Switch>
        <Route
          exact
          path="/"
          render={() => <BlogPage allPosts={} />}
        />
      </Switch>
    </div>
);
};

export default App;
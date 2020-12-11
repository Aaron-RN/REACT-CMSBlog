import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './assets/css/index.css';
import App from './App';
import ScrollToTop from './components/misc/pageScrollReset'; // Scrolls page to top on route switch

ReactDOM.render(
  <Router>
    <ScrollToTop />
    <StrictMode>
      <App />
    </StrictMode>
  </Router>,
  document.getElementById('root'),
);

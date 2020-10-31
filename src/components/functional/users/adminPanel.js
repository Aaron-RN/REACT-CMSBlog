import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import allForumsData from '../../misc/presets/allForumsData';

const AdminPanel = ({ user }) => {
  const [allForums, setForums] = useState([]);

  const populateSubForums = forumArray => forumArray
    .map(subforum => <span key={subforum} className="subforum">{`${subforum}`}</span>);

  const populateForums = () => allForums.map(forum => (
    <div key={forum.id} className="forum">
      <h4 className="text-camel">{forum.forum}</h4>
      <div className="inline-block text-grey">Subforums:</div>
      {' [ '}
      {populateSubForums(forum.subforum)}
      {' ]'}
      <div className="forum-menu">
        <button type="button">Rename</button>
        <button type="button">+ Subforum</button>
      </div>
    </div>
  ));

  // Fetch all the forum data
  useEffect(() => {
    setForums(allForumsData);
  }, []);

  return user.admin_level > 0
    ? (
      <div id="Adminpanel">
        <div className="section">
          <h2>Admin Panel</h2>
          <div className="ml-1">
            <h3>Forum Handling</h3>
            <Link to="/forums/new" className="ml-1"><button type="button">Create a new Forum</button></Link>
            <h3 className="text-grey">All Forums &amp; Subforums</h3>
            <div className="all-forums">{populateForums()}</div>
          </div>
        </div>
      </div>
    )
    : null;
};

AdminPanel.propTypes = {
  user: propTypes.instanceOf(Object).isRequired,
};

export default AdminPanel;

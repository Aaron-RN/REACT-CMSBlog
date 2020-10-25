import React from 'react';
import propTypes from 'prop-types';

const ForumDisplay = ({ forum }) => (
  <h4 className="forum">{forum}</h4>
);

ForumDisplay.propTypes = {
  forum: propTypes.instanceOf(Object).isRequired,
};

export default ForumDisplay;

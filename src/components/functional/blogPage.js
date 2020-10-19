import React, { useState } from 'react';
import propTypes, { array } from 'prop-types';

const BlogPage = ({ allPosts }) => {
  const [pinnedPosts, setPinnedPosts] = useState([{}]);

  return (
    <div className="bg-main pt-1">
      <div className="container">
        <h2>Pinned Posts</h2>
        <div>Posts Data</div>
      </div>
    </div>
  );
};

BlogPage.propTypes = {
  allPosts: propTypes.instanceOf(Array).isRequired,
};

export default BlogPage;

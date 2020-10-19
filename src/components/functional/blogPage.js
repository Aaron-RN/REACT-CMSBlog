import React, { useState } from 'react';
import propTypes, { array } from 'prop-types';

const BlogPage = ({ allPosts }) => {
  const [pinnedPosts, setPinnedPosts] = useState([{}]);

  return (
    <main>
      <div>
        <h1>Welcome to React-CMSBlog</h1>
      </div>
    </main>
  );
};

BlogPage.propTypes = {
  allPosts: propTypes.instanceOf(array).isRequired,
};

export default BlogPage;

import React from 'react';
import PostDisplay from './postDisplay';

const PopulatePosts = (postsArray, handlePostSelect) => postsArray.map(post => (
  <button type="button" key={post.id} className="bare-btn row" onClick={() => handlePostSelect(post)}>
    <PostDisplay post={post} />
  </button>
));

export default PopulatePosts;

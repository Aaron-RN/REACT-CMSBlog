import React from 'react';
import PostDisplay from './postDisplay';

const PopulatePosts = (postsArray, handlePostSelect, isPinned = false) => postsArray.map(post => (
  <button type="button" key={post.id} className="bare-btn row" onClick={() => handlePostSelect(post)}>
    <PostDisplay post={post} isPinned={isPinned} />
  </button>
));

export default PopulatePosts;

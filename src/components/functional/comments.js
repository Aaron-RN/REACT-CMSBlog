import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { fetchAuthorName } from './blogPage/presets/allUsersData';
import allCommentsData from './blogPage/presets/allCommentsData';

const Comments = ({ user, post }) => {
  const [relatedComments, setComments] = useState([]);
  const [body, setBody] = useState('');

  const populateComments = () => relatedComments.map(comment => (
    <div key={comment.id} className="comment">
      <i className="fas fa-user comment-user-pic" />
      <div>
        <span className="comment-author">{fetchAuthorName(comment.author_id)}</span>
        <span className="comment-date">{comment.date}</span>
        <div className="comment-body">{comment.body}</div>
      </div>
    </div>
  ));

  // Fetch all comments related to selected post
  useEffect(() => {
    const postComments = allCommentsData.filter(comment => comment.post_id === post.id && !comment.comment_id);
    setComments(postComments);
  }, [post]);

  return (
    <div id="CommentsSection">
      <div className="container-md">
        <h4>Comments</h4>
        {populateComments()}
      </div>
    </div>
  );
};

Comments.propTypes = {
  user: propTypes.instanceOf(Object).isRequired,
  post: propTypes.instanceOf(Object).isRequired,
};

export default Comments;

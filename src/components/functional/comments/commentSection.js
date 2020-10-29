import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import allCommentsData from '../../misc/presets/allCommentsData';
import CommentDisplay from './commentDisplay';
import PaginateComments from './paginateComments';

const CommentSection = ({ user, post }) => {
  const [relatedComments, setComments] = useState([]);
  const [body, setBody] = useState('');

  const populateComments = commentsArray => commentsArray.map(comment => (
    <CommentDisplay key={comment.id} comment={comment} />
  ));

  const handleReset = () => {
    setBody('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    const comment = { body, author: user.id };
    console.log(comment);
  };

  // Fetch all comments related to selected post
  useEffect(() => {
    const postComments = allCommentsData
      .filter(comment => comment.post_id === post.id && !comment.comment_id);
    setComments(postComments);
  }, [post]);

  return (
    <div id="CommentsSection">
      <div className="container-md">
        <h4>Comments</h4>
        <form className="comment-form" onSubmit={handleSubmit}>
          <textarea
            value={body}
            onChange={e => setBody(e.target.value)}
            placeholder="Add a comment here..."
            wrap="hard"
            maxLength="420"
            required
          />
          <div className="btn-container">
            <button type="button" onClick={handleReset}>Cancel</button>
            <button type="submit">Comment</button>
          </div>
        </form>
        <PaginateComments
          comments={relatedComments}
          populateComments={populateComments}
        />
      </div>
    </div>
  );
};

CommentSection.propTypes = {
  user: propTypes.instanceOf(Object).isRequired,
  post: propTypes.instanceOf(Object).isRequired,
};

export default CommentSection;

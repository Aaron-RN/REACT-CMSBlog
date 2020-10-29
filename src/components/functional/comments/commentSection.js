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

  const handleSubmit = e => {
    e.preventDefault();
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
        <form className="flex-col" onSubmit={handleSubmit}>
          <textarea value={body} onChange={e => setBody(e.target.value)} placeholder="Write message here..." />
          <button type="submit">Comment</button>
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

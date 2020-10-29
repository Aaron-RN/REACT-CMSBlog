import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import Comment from '../../presentational/comments/comment';
import PaginateComments from './paginateComments';
import allCommentsData from '../../misc/presets/allCommentsData';

const CommentDisplay = ({ comment, handleSelectComment }) => {
  const [subComments, setSubComments] = useState([]);
  const [showReplies, setShowReply] = useState(true);

  const populateSubComments = commentsArray => commentsArray.map(comment => (
    <Comment key={comment.id} comment={comment} subcomment="sub-comment" handleSelectComment={handleSelectComment} />
  ));

  // Fetch all comments stemming from this comment
  useEffect(() => {
    const directComments = allCommentsData
      .filter(commentData => commentData.comment_id === comment.id);
    setSubComments(directComments);
  }, [comment]);
  return (
    <div>
      <Comment comment={comment} handleSelectComment={handleSelectComment} />
      { subComments.length > 0 && (
        <button type="button" className="comment-reply" onClick={() => setShowReply(!showReplies)}>
          {showReplies ? 'hide replies' : 'show replies'}
        </button>
      )}
      {showReplies && (
        <PaginateComments
          comments={subComments}
          populateComments={populateSubComments}
        />
      )}
    </div>
  );
};

CommentDisplay.propTypes = {
  comment: propTypes.instanceOf(Object).isRequired,
  handleSelectComment: propTypes.func.isRequired,
};

export default CommentDisplay;

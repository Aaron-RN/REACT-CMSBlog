import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import Comment from '../../presentational/comments/comment';
import PaginateComments from './paginateComments';

const CommentDisplay = ({
  user, allComments, comment, handleSelectComment, handleEditComment, handleRemoveComment,
}) => {
  const [subComments, setSubComments] = useState([]);
  const [showReplies, setShowReply] = useState(false);

  const populateSubComments = commentsArray => commentsArray.map(comment => (
    <Comment
      key={comment.id}
      user={user}
      comment={comment}
      subcomment="sub-comment"
      handleSelectComment={handleSelectComment}
      handleEditComment={handleEditComment}
      handleRemoveComment={handleRemoveComment}
    />
  ));

  // Fetch all comments stemming from this comment
  useEffect(() => {
    const directComments = allComments
      .filter(commentData => commentData.comment_id === comment.id);
    setSubComments(directComments);
  }, [allComments, comment]);

  return (
    <div>
      <Comment
        user={user}
        comment={comment}
        handleSelectComment={handleSelectComment}
        handleEditComment={handleEditComment}
        handleRemoveComment={handleRemoveComment}
      />
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
  user: propTypes.instanceOf(Object).isRequired,
  allComments: propTypes.instanceOf(Array).isRequired,
  comment: propTypes.instanceOf(Object).isRequired,
  handleSelectComment: propTypes.func.isRequired,
  handleEditComment: propTypes.func.isRequired,
  handleRemoveComment: propTypes.func.isRequired,
};

export default CommentDisplay;

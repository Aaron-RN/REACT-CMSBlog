import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import allCommentsData from '../../functional/blogPage/presets/allCommentsData';
import { fetchAuthorName } from '../../functional/blogPage/presets/allUsersData';
import compareDate from '../../misc/compareDate';

const CommentDisplay = ({ comment }) => {
  const [subComments, setSubComments] = useState([]);
  const [showReplies, setShowReply] = useState(false);

  const populateSubComments = () => subComments.map(comment => (
    <div key={comment.id} className="comment sub-comment">
      <i className="fas fa-user comment-user-pic" />
      <div>
        <span className="comment-author">{fetchAuthorName(comment.author_id)}</span>
        <span className="comment-date">{compareDate(comment.date)}</span>
        <div className="comment-body">{comment.body}</div>
      </div>
    </div>
  ));

  // Fetch all comments stemming from this comment
  useEffect(() => {
    const directComments = allCommentsData
      .filter(commentData => commentData.comment_id === comment.id);
    setSubComments(directComments);
  }, [comment]);
  return (
    <div>
      <div key={comment.id} className="comment">
        <i className="fas fa-user comment-user-pic" />
        <div>
          <span className="comment-author">{fetchAuthorName(comment.author_id)}</span>
          <span className="comment-date">{compareDate(comment.date)}</span>
          <div className="comment-body">{comment.body}</div>
        </div>
      </div>

      { subComments.length > 0 && (
        <button type="button" className="comment-reply" onClick={() => setShowReply(!showReplies)}>
          {showReplies ? 'hide replies' : 'show replies'}
        </button>
      )}
      {showReplies && populateSubComments()}
    </div>
  );
};

CommentDisplay.propTypes = {
  comment: propTypes.instanceOf(Object).isRequired,
};

export default CommentDisplay;

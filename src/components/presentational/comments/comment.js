import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import compareDate from '../../misc/compareDate';

const Comment = ({
  user, comment, subcomment, handleSelectComment, handleRemoveComment,
}) => (
  <div key={comment.id} className={`comment ${subcomment}`}>
    <i className="fas fa-user comment-user-pic" />
    <div>
      <Link to={`/users/${comment.user_id}`} className="comment-author">{comment.author}</Link>
      <span className="comment-date">{compareDate(comment.created_at)}</span>
      <div className="comment-body">{comment.body}</div>
    </div>
    {comment.user_id === user.id && (
      <button type="button" onClick={() => handleRemoveComment(comment)} className="comment-remove-btn">
        <i className="fas fa-trash" />
      </button>
    )}
    <button type="button" onClick={() => handleSelectComment(comment)} className="comment-reply-btn">
      Reply
    </button>
  </div>
);

Comment.defaultProps = {
  subcomment: '',
};

Comment.propTypes = {
  user: propTypes.instanceOf(Object).isRequired,
  comment: propTypes.instanceOf(Object).isRequired,
  subcomment: propTypes.string,
  handleSelectComment: propTypes.func.isRequired,
  handleRemoveComment: propTypes.func.isRequired,
};

export default Comment;

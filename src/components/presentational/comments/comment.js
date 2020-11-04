import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchAuthorName } from '../../misc/presets/allUsersData';
import compareDate from '../../misc/compareDate';

const Comment = ({ comment, subcomment, handleSelectComment }) => (
  <div key={comment.id} className={`comment ${subcomment}`}>
    <i className="fas fa-user comment-user-pic" />
    <div>
      <Link to={`/users/${comment.author_id}`} className="comment-author">{fetchAuthorName(comment.author_id)}</Link>
      <span className="comment-date">{compareDate(comment.created_at)}</span>
      <div className="comment-body">{comment.body}</div>
    </div>
    <button type="button" onClick={() => handleSelectComment(comment)} className="comment-reply-btn">
      Reply
    </button>
  </div>
);

Comment.defaultProps = {
  subcomment: '',
};

Comment.propTypes = {
  comment: propTypes.instanceOf(Object).isRequired,
  subcomment: propTypes.string,
  handleSelectComment: propTypes.func.isRequired,
};

export default Comment;

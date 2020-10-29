import React from 'react';
import propTypes from 'prop-types';
import { fetchAuthorName } from '../../misc/presets/allUsersData';
import compareDate from '../../misc/compareDate';

const Comment = ({ comment, subcomment }) => (
  <div key={comment.id} className={`comment ${subcomment}`}>
    <i className="fas fa-user comment-user-pic" />
    <div>
      <span className="comment-author">{fetchAuthorName(comment.author_id)}</span>
      <span className="comment-date">{compareDate(comment.date)}</span>
      <div className="comment-body">{comment.body}</div>
    </div>
  </div>
);

Comment.defaultProps = {
  subcomment: '',
};

Comment.propTypes = {
  comment: propTypes.instanceOf(Object).isRequired,
  subcomment: propTypes.string,
};

export default Comment;

import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import allCommentsData from '../../misc/presets/allCommentsData';
import CommentDisplay from './commentDisplay';

const CommentSection = ({ user, post }) => {
  const [relatedComments, setComments] = useState([]);
  const [body, setBody] = useState('');

  const populateComments = () => relatedComments.map(comment => (
    <CommentDisplay key={comment.id} comment={comment} />
  ));

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
        {populateComments()}
      </div>
    </div>
  );
};

CommentSection.propTypes = {
  user: propTypes.instanceOf(Object).isRequired,
  post: propTypes.instanceOf(Object).isRequired,
};

export default CommentSection;

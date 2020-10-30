import React, { useEffect, useRef, useState } from 'react';
import propTypes from 'prop-types';
import allCommentsData from '../../misc/presets/allCommentsData';
import CommentDisplay from './commentDisplay';
import PaginateComments from './paginateComments';
import { fetchAuthorName } from '../../misc/presets/allUsersData';
import { Link } from 'react-router-dom';

const CommentSection = ({ user, post }) => {
  const [relatedComments, setComments] = useState([]);
  const [body, setBody] = useState('');
  const [selectedComment, setSelectedComment] = useState(null);
  const textElem = useRef(null);

  const handleSelectComment = comment => setSelectedComment(comment);

  const handleReset = () => {
    setBody('');
    setSelectedComment(null);
  };

  const handleSubmit = e => {
    e.preventDefault();
    // When replying to a comment you can only reply to the main comment not individual sub-comments
    const mainCommentID = selectedComment.comment_id || selectedComment.id;

    const comment = { body, author_id: user.id, comment_id: mainCommentID };
    // Axios POST Request
    console.log(comment);
  };

  const populateComments = commentsArray => commentsArray.map(comment => (
    <CommentDisplay key={comment.id} comment={comment} handleSelectComment={handleSelectComment} />
  ));

  // Fetch all comments related to selected post
  useEffect(() => {
    const postComments = allCommentsData
      .filter(comment => comment.post_id === post.id && !comment.comment_id);
    setComments(postComments);
  }, [post]);

  useEffect(() => {
    if (selectedComment) {
      const commentAuthor = fetchAuthorName(selectedComment.author_id);
      setBody(`@${commentAuthor} `);
      if (textElem.current) textElem.current.focus();
    }
  }, [selectedComment]);

  return (
    <div id="CommentsSection">
      <div className="container-md">
        <h4 className={`post-locked-${post.is_locked}`}>
          {'Comments '}
          {post.is_locked && <i className="fas fa-lock" />}
        </h4>
        {(!post.is_locked && user.logged_in) && (
          <form className="comment-form" onSubmit={handleSubmit}>
            <textarea
              ref={textElem}
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
        )}
        {(!post.is_locked && !user.logged_in) && (
          <div>
            <Link to="/login">You must Login to comment...</Link>
          </div>
        )}
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

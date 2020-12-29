import React, { useEffect, useRef, useState } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CommentDisplay from './commentDisplay';
import PaginateComments from './paginateComments';
import { commentNew } from '../../misc/apiRequests';

const CommentSection = ({
  user, post, comments, handleLoader, handleModal,
}) => {
  const [postComments, setPostComments] = useState([]);
  const [noReplyComments, setNoReplyComments] = useState([]);
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
    const mainCommentID = selectedComment
      ? selectedComment.comment_id || selectedComment.id
      : null;

    const comment = {
      body: body.trim(), user_id: user.id, comment_id: mainCommentID, post_id: post.id,
    };
    // Axios POST Request
    handleLoader(true);
    commentNew(comment)
      .then(response => {
        if (response.success) {
          setPostComments(response.comments);
          setNoReplyComments(response.comments.filter(
            commentData => commentData.comment_id == null,
          ));
          handleReset();
        }
        if (!response.success) handleModal(response.errors);
        handleLoader(false);
      });
  };

  const populateComments = commentsArray => commentsArray.map(comment => (
    <CommentDisplay
      key={comment.id}
      allComments={postComments}
      comment={comment}
      handleSelectComment={handleSelectComment}
    />
  ));

  // Grab comments from prop and place into state
  useEffect(() => {
    if (comments.length > 0) {
      setPostComments(comments);
      setNoReplyComments(comments.filter(commentData => commentData.comment_id == null));
    }
  }, [comments]);

  useEffect(() => {
    if (selectedComment) {
      const commentAuthor = selectedComment.author;
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
        {(!post.is_locked && user.can_comment && user.logged_in) && (
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
        {(user.logged_in && !user.can_comment) && (
          <div className="text-suspended">Your commenting capabilities has been suspended by a forum moderator!</div>
        )}
        <PaginateComments
          comments={noReplyComments}
          populateComments={populateComments}
        />
      </div>
    </div>
  );
};

CommentSection.propTypes = {
  user: propTypes.instanceOf(Object).isRequired,
  post: propTypes.instanceOf(Object).isRequired,
  comments: propTypes.instanceOf(Array).isRequired,
  handleLoader: propTypes.func.isRequired,
  handleModal: propTypes.func.isRequired,
};

export default CommentSection;

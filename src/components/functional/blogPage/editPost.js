import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { modules, formats } from '../../misc/presets/quillModules';
import 'react-quill/dist/quill.snow.css';
import { fetchPost, postEdit } from '../../misc/apiRequests';

const EditPost = ({
  user, match, handlePostSelect, handleLoader, handleModal,
}) => {
  const [selectedPost, setSelectedPost] = useState({
    id: 0, title: '', body: '', author: '', forum: '', subforum: '',
  });
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');

  const {
    id, title, body, forum, subforum,
  } = selectedPost;

  const handleChangeTitle = e => {
    const elem = e.target;
    setPostTitle(elem.value);
  };

  const handleSubmitPost = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('post[title]', postTitle.trim());
    formData.append('post[body]', postBody);

    handleLoader(true);
    postEdit(id, formData)
      .then(response => {
        if (response.success) handlePostSelect(response.post);
        if (!response.success) handleModal(response.errors);
        handleLoader(false);
      });
  };

  useEffect(() => {
    let isMounted = true;

    if (match.params.id) {
      const postID = parseInt(match.params.id, 10);
      handleLoader(true);
      fetchPost(postID)
        .then(response => {
          if (response.success) {
            if (isMounted) setSelectedPost(response.post);
          }
          if (!response.success) handleModal(response.errors);
          handleLoader(false);
        });
    }
    return () => { isMounted = false; };
  }, [match.params.id, handleLoader, handleModal]);

  useEffect(() => { setPostTitle(title); setPostBody(body); }, [selectedPost, body, title]);

  const renderMain = (
    <div id="BlogPage" className="bg-main">
      <div className="container-md">
        <form className="newPost" onSubmit={handleSubmitPost} encType="multipart/form-data">
          <Link to={`/${forum}${subforum ? `/${subforum}` : ''}/posts/${id}`}>
            <i className="fas fa-chevron-circle-left pr-01" />
            Back
          </Link>
          <h4 className="text-grey">Forum</h4>
          <h3 className="text-camel">Edit Topic</h3>
          <input
            name="postTitle"
            type="text"
            value={postTitle}
            onChange={handleChangeTitle}
            placeholder="Post Title"
            minLength="6"
            maxLength="32"
            required
          />
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={postBody}
            onChange={setPostBody}
          />
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );

  return user.logged_in ? renderMain : <Redirect to="/login" />;
};

EditPost.propTypes = {
  user: propTypes.instanceOf(Object).isRequired,
  match: propTypes.instanceOf(Object).isRequired,
  handlePostSelect: propTypes.func.isRequired,
  handleLoader: propTypes.func.isRequired,
  handleModal: propTypes.func.isRequired,
};

export default EditPost;

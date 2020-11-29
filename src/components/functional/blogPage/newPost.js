import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Link, Redirect, useLocation } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { postNew } from '../../misc/apiRequests';
import { modules, formats } from '../../misc/presets/quillModules';
import 'react-quill/dist/quill.snow.css';

const NewBlogPost = ({
  match, location, user, handlePostSelect, handleLoader, handleModal,
}) => {
  const [newPostTitle, setPostTitle] = useState('');
  const [newPostBody, setPostBody] = useState('');
  const { forum, subforum } = match.params;
  // const [newPostImage, setPostImage] = useState('');

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();

  const handleChangeTitle = e => {
    const elem = e.target;
    setPostTitle(elem.value);
  };

  // const handleCheckFileSize = e => {
  //   const elem = e.target;
  //   if (elem.files[0].size > 1048576) {
  //     updateErrors('File is too big!', 'blogForm');
  //     setRequest('waiting');
  //     elem.value = '';
  //   } else { setPostImage(elem.files[0]); }
  // };

  const handleSubmitPost = e => {
    e.preventDefault();
    if (!user.can_post) return;

    const formData = new FormData();
    formData.append('post[title]', newPostTitle.trim());
    formData.append('post[body]', newPostBody);
    // formData.append('post[bg_image]', newPostImage);
    formData.append('post[forum]', query.get('forum_id'));
    formData.append('post[subforum]', subforum);
    formData.append('post[user_id]', user.id);

    handleLoader(true);
    postNew(formData)
      .then(response => {
        if (response.success) handlePostSelect(response.post);
        if (!response.success) handleModal(response.errors);
        handleLoader(false);
      });
  };

  const renderMain = (
    <div id="BlogPage" className="bg-main">
      <div className="container-md">
        <form className="newPost" onSubmit={handleSubmitPost} encType="multipart/form-data">
          <Link to={`/${forum}${subforum ? `/${subforum}` : ''}`}>
            <i className="fas fa-chevron-circle-left pr-01" />
            Back
          </Link>
          <h4 className="text-grey">Forum</h4>
          <h3 className="text-camel">{`New ${forum}/${subforum} Topic`}</h3>
          <input
            name="postTitle"
            type="text"
            value={newPostTitle}
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
            value={newPostBody}
            onChange={setPostBody}
          />
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );

  return user.logged_in ? renderMain : <Redirect to="/login" />;
};

NewBlogPost.propTypes = {
  match: propTypes.instanceOf(Object).isRequired,
  location: propTypes.instanceOf(Object).isRequired,
  user: propTypes.instanceOf(Object).isRequired,
  handlePostSelect: propTypes.func.isRequired,
  handleLoader: propTypes.func.isRequired,
  handleModal: propTypes.func.isRequired,
};

export default NewBlogPost;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { modules, formats } from '../../misc/presets/quillModules';
import 'react-quill/dist/quill.snow.css';

const NewBlogPost = ({
  match, user,
}) => {
  const [newPostTitle, setPostTitle] = useState('');
  const [newPostBody, setPostBody] = useState('');
  const { forum, subforum } = match.params;
  // const [newPostImage, setPostImage] = useState('');

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
    const formData = new FormData();
    formData.append('post[title]', newPostTitle.trim());
    formData.append('post[body]', newPostBody);
    // formData.append('post[bg_image]', newPostImage);
    formData.append('post[forum]', forum);
    formData.append('post[subforum]', subforum);
    formData.append('post[user_id]', user.id);
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
  match: PropTypes.instanceOf(Object).isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
};

export default NewBlogPost;

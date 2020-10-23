import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { modules, formats } from './presets/quillModules';
import 'react-quill/dist/quill.snow.css';

const EditPost = ({ user, allPosts, match }) => {
  const [selectedPost, setSelectedPost] = useState({
    id: 0, title: '', body: '', author: '', forum: '',
  });
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');

  const {
    id, title, body, forum,
  } = selectedPost;

  const handleChangeTitle = e => {
    const elem = e.target;
    setPostTitle(elem.value);
  };

  const handleSubmitPost = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('post[title]', postTitle);
    formData.append('post[body]', postBody);
    formData.append('post[user_id]', user.id);
  };

  useEffect(() => {
    if (allPosts.length && match) {
      const post = allPosts.find(post => post.id === parseInt(match.params.id, 10));
      setSelectedPost(post);
    }
  }, [allPosts, match]);

  useEffect(() => { setPostTitle(title); setPostBody(body); }, [selectedPost, body, title]);

  // Grab Post and populate Component State on Mount
  // useEffect(() => {
  //   if (match) {
  //     fetchPost(parseInt(match.params.id, 10))
  //       .then(result => {
  //         setSelectedPost(result.post);
  //         setPostTitle(result.post.title);
  //         setPostBody(result.post.body);
  //       });
  //   }
  // }, []);

  const renderMain = (
    <div id="BlogPage" className="bg-main">
      <div className="container-md">
        <form className="newPost" onSubmit={handleSubmitPost} encType="multipart/form-data">
          <Link to={`/${forum}/posts/${id}`}>
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

  return renderMain;
};

EditPost.propTypes = {
  user: propTypes.instanceOf(Object).isRequired,
  allPosts: propTypes.instanceOf(Object).isRequired,
  match: propTypes.instanceOf(Object).isRequired,
};

export default EditPost;

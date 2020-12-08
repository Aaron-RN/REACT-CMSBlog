import axios from 'axios';

const URL = 'https://arn-forum-api.herokuapp.com/';

// Since all errors are returned from the backend in a string we split the string
// into an array to break them down into individual errors
const organizeErrors = errors => {
  const errorMsg = !Array.isArray(errors) ? errors.split(':') : errors[0];
  let errorList = errors;
  if (Array.isArray(errorMsg)) {
    if (errorMsg.length > 1) errorMsg.shift();
    errorList = errorMsg.join().trim().split(',');
  }

  return errorList;
};

// Handles the error catching of an API request
const errorCatch = error => {
  if (!error.response) { return { errors: `${error}`, success: false }; }
  const errorMsg = error.response.data.errors || [`${error.response.statusText}`];

  return { errors: organizeErrors(errorMsg), success: false };
};

// User Login
const userLogin = async user => {
  sessionStorage.clear();
  return axios.post(`${URL}log_in`, { user })
    .then(response => {
      const retrievedUser = response.data.user;
      sessionStorage.setItem('user', JSON.stringify({ ...retrievedUser }));

      return { user: retrievedUser, success: true };
    })
    .catch(error => errorCatch(error));
};

// Is User Still Logged In?
const userLoggedIn = async () => {
  if (sessionStorage.getItem('user')) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    return axios.get(`${URL}logged_in`, { params: { token: user.token } })
      .then(response => {
        const retrievedUser = response.data.user;

        return { user: retrievedUser, success: true };
      })
      .catch(error => errorCatch(error));
  }
  return { user: { logged_in: false }, success: true };
};

// User Register
const userRegister = async user => {
  sessionStorage.clear();
  return axios.post(`${URL}sign_up`, { user })
    .then(response => {
      const { message } = response.data;

      return { message, success: true };
    })
    .catch(error => errorCatch(error));
};

// Fetch user by ID
const fetchUser = async id => axios.get(`${URL}users/${id}`)
  .then(response => {
    const retrievedUser = response.data.user;

    return { user: retrievedUser, success: true };
  })
  .catch(error => errorCatch(error));

// Create New Forum
const forumNew = async forum => axios.post(`${URL}forums`, { forum })
  .then(response => {
    const { forums } = response.data;
    // forums = Array.isArray(forums) ? forums : [];

    return { forums, success: true };
  })
  .catch(error => errorCatch(error));

// Create New Forum
const forumRemove = async forumID => axios.delete(`${URL}forums/${forumID}`)
  .then(response => {
    const { forums } = response.data;
    // forums = Array.isArray(forums) ? forums : [];

    return { forums, success: true };
  })
  .catch(error => errorCatch(error));

// Fetch All Forums
const fetchAllForums = async () => axios.get(`${URL}forums/all`)
  .then(response => {
    const { forums } = response.data;
    // forums = Array.isArray(forums) ? forums : [];

    return { forums, success: true };
  })
  .catch(error => errorCatch(error));

// Fetch All Forums and Posts
// eslint-disable-next-line camelcase
const fetchAllForumPosts = async (per_page = 5, page = 1) => axios.get(`${URL}forums`, { params: { per_page, page } })
  .then(response => {
    const {
      // eslint-disable-next-line camelcase
      forums, pinned_posts, per_page, page,
    } = response.data.results;

    return {
      forums, pinned_posts, per_page, page, success: true,
    };
  })
  .catch(error => errorCatch(error));

// Fetch Specific Forum and Posts
// eslint-disable-next-line camelcase
const fetchForumPosts = async (forum, subforum, per_page = 5, page = 1) => axios.get(`${URL}forums/${forum}/${subforum}`, { params: { per_page, page } })
  .then(response => {
    const {
      // eslint-disable-next-line camelcase
      forum, per_page, page,
    } = response.data.results;

    return {
      forum, per_page, page, success: true,
    };
  })
  .catch(error => errorCatch(error));

// Create New Post
const postNew = async post => axios(
  { method: 'post', url: `${URL}posts`, data: post },
  { headers: { 'Content-Type': 'multipart/form-data' } },
)
  .then(response => {
    const { post } = response.data;

    return { post, success: true };
  })
  .catch(error => errorCatch(error));

// Create New Post
const postUpdate = async (postID, post) => axios(
  { method: 'patch', url: `${URL}posts/${postID}`, data: post },
  { headers: { 'Content-Type': 'multipart/form-data' } },
)
  .then(response => {
    const { post } = response.data;

    return { post, success: true };
  })
  .catch(error => errorCatch(error));

// Lock/Unlock a Post
const postHandleLock = async postID => axios.patch(`${URL}posts/${postID}/lock_post`)
  .then(response => {
    const { post } = response.data;

    return { post, success: true };
  })
  .catch(error => errorCatch(error));

// Lock/Unlock a Post
const postHandlePin = async postID => axios.patch(`${URL}posts/${postID}/pin_post`)
  .then(response => {
    const { post } = response.data;

    return { post, success: true };
  })
  .catch(error => errorCatch(error));

// Fetch post by ID
const fetchPost = async id => axios.get(`${URL}posts/${id}`)
  .then(response => {
    const { post, comments } = response.data;

    return { post, comments, success: true };
  })
  .catch(error => errorCatch(error));

export {
  userLogin, userLoggedIn, userRegister, fetchUser,
  forumRemove, forumNew, fetchAllForums, fetchAllForumPosts, fetchForumPosts,
  postNew, postUpdate, postHandleLock, postHandlePin, fetchPost,
};

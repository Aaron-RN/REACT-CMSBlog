import axios from 'axios';

const URL = 'https://arn-forum-api.herokuapp.com/';

// Since all errors are returned from the backend in a string we split the string
// into an array to break them down into individual errors
const organizeErrors = errors => {
  const errorMsg = !Array.isArray(errors) ? errors.split(':') : errors[0];
  let errorList = errors;
  if (Array.isArray(errorMsg)) {
    errorMsg.shift();
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

// Fetch Forum Posts
// eslint-disable-next-line camelcase
const fetchForumPosts = async (per_page = 5, page = 1) => axios.get(`${URL}forums`, { params: { per_page, page } })
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

export {
  userLogin, userLoggedIn, userRegister, fetchUser,
  postNew, fetchForumPosts,
};

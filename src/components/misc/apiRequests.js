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

// User Login
const userLogin = async user => {
  sessionStorage.clear();
  return axios.post(`${URL}log_in`, { user })
    .then(response => {
      const retrievedUser = response.data.user;
      sessionStorage.setItem('user', JSON.stringify({ ...retrievedUser }));

      return { user: retrievedUser, success: true };
    })
    .catch(error => {
      if (!error.response) { return { errors: `${error}`, success: false }; }
      const errorMsg = error.response.data.errors || [`${error.response.statusText}`];

      return { errors: organizeErrors(errorMsg), success: false };
    });
};

// Is User Still Logged In?
const userLoggedIn = async () => {
  if (sessionStorage.getItem('user')) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    return axios.get(`${URL}logged_in`, { params: { token: user.token } })
      .then(response => {
        const retrievedUser = response.data.user;
        const userLoggedIn = response.data.user.logged_in;

        return { loggedIn: userLoggedIn, user: retrievedUser, success: true };
      })
      .catch(error => {
        sessionStorage.clear();
        if (!error.response) { return { errors: `${error}`, success: false }; }
        const errorMsg = error.response.data.errors || [`${error.response.statusText}`];

        return { errors: organizeErrors(errorMsg), success: false };
      });
  }
  return { loggedIn: false, success: true };
};

// User Register
const userRegister = async user => {
  sessionStorage.clear();
  return axios.post(`${URL}sign_up`, { user })
    .then(response => {
      const { message } = response.data;

      return { message, success: true };
    })
    .catch(error => {
      if (!error.response) { return { errors: `${error}`, success: false }; }
      const errorMsg = error.response.data.errors || [`${error.response.statusText}`];

      return { errors: organizeErrors(errorMsg), success: false };
    });
};

// Fetch user by ID
const fetchUser = async id => axios.get(`${URL}users/${id}`)
  .then(response => {
    const retrievedUser = response.data.user;

    return { user: retrievedUser, success: true };
  })
  .catch(error => {
    sessionStorage.clear();
    if (!error.response) { return { errors: `${error}`, success: false }; }
    const errorMsg = error.response.data.errors || [`${error.response.statusText}`];

    return { errors: organizeErrors(errorMsg), success: false };
  });

export {
  userLogin, userLoggedIn, userRegister, fetchUser,
};

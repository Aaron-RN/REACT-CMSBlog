import axios from 'axios';

const URL = 'https://arn-forum-api.herokuapp.com/';

// User Login
const userLogin = user => {
  sessionStorage.clear();
  return axios.post(`${URL}sessions`, { user }, { withCredentials: true })
    .then(response => {
      const retrievedUser = response.data.user;

      sessionStorage.setItem('user', JSON.stringify({ ...retrievedUser }));

      console.log(retrievedUser);
      return { retrievedUser, success: true };
    })
    .catch(error => {
      if (!error.response) { return { errors: `${error}`, success: false }; }
      const errorMsg = error.response.data.errors || [`${error.response.statusText}`];

      return { errorMsg, success: false };
    });
};

// Is User Still Logged In?
const userLoggedIn = () => {
  if (sessionStorage.getItem('user')) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    return axios.get(`${URL}logged_in`, { params: { token: user.token } })
      .then(response => {
        const retrievedUser = response.data.user;
        const userLoggedIn = response.data.user.logged_in;
        if (retrievedUser && userLoggedIn) {
          return true;
        }

        return false;
      })
      .catch(() => {
        sessionStorage.clear();
        return false;
      });
  }
  return false;
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

      return { errors: errorMsg.split(','), success: false };
    });
};

export { userLogin, userLoggedIn, userRegister };

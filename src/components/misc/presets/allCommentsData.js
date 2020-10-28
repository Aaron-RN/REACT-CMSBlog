const aDay = 24 * 60 * 60 * 1000;
const yesterday = new Date() - aDay;
const secondsago30 = new Date() - 60 * 7 * 1000;
const daysbefore29 = new Date() - aDay * 29;

const allComments = [
  {
    id: 1,
    body: 'Nice forum setup bro',
    author_id: 2,
    comment_id: null,
    post_id: 1,
    date: daysbefore29,
  },
  {
    id: 2,
    body: 'Thanks sis',
    author_id: 1,
    comment_id: 1,
    post_id: 1,
    date: secondsago30,
  },
  {
    id: 3,
    body: 'Will try my best to adhere bro!',
    author_id: 3,
    comment_id: null,
    post_id: 1,
    date: yesterday,
  },
];

export default allComments;

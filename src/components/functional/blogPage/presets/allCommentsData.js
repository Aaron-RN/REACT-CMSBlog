const newDate = new Date().toLocaleDateString();

const allComments = [
  {
    id: 1,
    body: 'Nice forum setup bro',
    author_id: 2,
    comment_id: null,
    post_id: 1,
    date: newDate,
  },
  {
    id: 2,
    body: 'Thanks sis',
    author_id: 1,
    comment_id: 1,
    post_id: 1,
    date: newDate,
  },
];

export default allComments;

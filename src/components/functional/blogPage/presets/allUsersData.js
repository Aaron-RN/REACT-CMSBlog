const allUsers = [
  {
    id: 1,
    username: 'John Doe',
  },
  {
    id: 2,
    username: 'Jane Doe',
  },
  {
    id: 3,
    username: 'Ron Doe',
  },
  {
    id: 4,
    username: 'Yawn Doe',
  },
  {
    id: 5,
    username: 'On Doe',
  },
  {
    id: 6,
    username: 'Anonymous Doe',
  },
];

const fetchAuthorName = authorID => {
  if (authorID) return allUsers.filter(user => user.id === authorID)[0].username;
  return null;
};

export { allUsers, fetchAuthorName };

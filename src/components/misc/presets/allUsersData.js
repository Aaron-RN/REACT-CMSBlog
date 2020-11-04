/** * Admin Levels: ** *
 3 - Site Owner
    - (Can not be modified by any other moderator)
    - (Can remove or add Moderators)
    - (Can disable a user's ability to comment and create topics)
    - (Can create and edit Forums and subForums)
 2 - Moderator
    - (Can remove or add Moderators)
    - (Can create and edit Forums and subForums)
    - (Can disable a user's ability to comment and create topics)
 1 - Forums Moderator
    - (Can create and edit Forums and subForums)
    - (Can disable a user's ability to comment and create topics)
** */

const allUsersData = [
  {
    id: 1,
    username: 'John Doe',
    can_post: true,
    can_comment: true,
    admin_level: 3,
  },
  {
    id: 2,
    username: 'Jane Doe',
    can_post: true,
    can_comment: true,
    admin_level: 2,
  },
  {
    id: 3,
    username: 'Ron Doe',
    can_post: true,
    can_comment: true,
    admin_level: 0,
  },
  {
    id: 4,
    username: 'Yawn Doe',
    can_post: true,
    can_comment: true,
    admin_level: 0,
  },
  {
    id: 5,
    username: 'On Doe',
    can_post: true,
    can_comment: true,
    admin_level: 0,
  },
  {
    id: 6,
    username: 'Anonymous Doe',
    can_post: true,
    can_comment: true,
    admin_level: 0,
  },
];

const fetchAuthorName = authorID => {
  if (authorID) return allUsersData.filter(user => user.id === authorID)[0].username;
  return null;
};

export { allUsersData, fetchAuthorName };

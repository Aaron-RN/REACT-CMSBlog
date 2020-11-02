const allForms = [
  {
    id: 1,
    name: 'announcements',
    subforum: [
      'rules', 'updates',
    ],
    admin_only: true,
    admin_view_only: false,
  },
  {
    id: 2,
    name: 'forum quality of life',
    subforum: [
      'bugs', 'feature requests',
    ],
    admin_only: false,
    admin_view_only: false,
  },
  {
    id: 3, name: 'misc', subforum: [], admin_only: false, admin_view_only: false,
  },
];

export default allForms;

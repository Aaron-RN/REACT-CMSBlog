import React, { useState } from 'react';
import propTypes from 'prop-types';

const NewforumModal = ({ handleFormReset }) => {
  const [forumName, setforumName] = useState('');
  const [subforumName, setSubforumName] = useState('');
  const [subforums, setSubforums] = useState([]);
  const [adminForum, setAdminForum] = useState(false);
  const [adminView, setAdminView] = useState(false);

  // Reset Forum Variables
  const handleReset = () => {
    setforumName('');
    setSubforumName('');
    setSubforums([]);
  };

  const handleAdminForum = () => {
    setAdminForum(!adminForum);
    setAdminView(false);
  };

  const handleAdminView = () => {
    setAdminView(!adminView);
    setAdminForum(!adminView);
  };

  // Handle adding a new forum creation
  const handleSubmit = e => {
    e.preventDefault();
    const forumNameTrimmed = forumName.trim();
    setforumName(forumNameTrimmed);
    if (!forumNameTrimmed) return;
    const forum = {
      name: forumName.trim(),
      subforums,
      admin_only: adminForum,
      admin_view_only: adminView,
    };
    console.log(forum);
    handleReset();
    handleFormReset();
  };

  // Add new subforum
  const handleNewSubforum = subforum => {
    if (!subforum.trim()) return;
    setSubforums([...subforums, subforum.trim()]);
    setSubforumName('');
  };

  const handleRemoveSubforum = subforum => {
    const filteredSubforum = subforums.filter(subforumData => subforumData !== subforum);
    setSubforums(filteredSubforum);
  };

  const populateSubforums = () => subforums
    .map(subforumData => (
      <button
        type="button"
        key={subforumData}
        className="subforum btn-bare"
        onClick={() => handleRemoveSubforum(subforumData)}
      >
        {`${subforumData}`}
      </button>
    ));

  return (
    <form className="modal-form" onSubmit={handleSubmit}>
      <h3 className="text-center">New Forum</h3>
      <h4>Forum Name</h4>
      <input
        type="text"
        value={forumName}
        onChange={e => setforumName(e.target.value)}
        minLength="3"
        required
      />
      <div>
        <div>
          <span className="size-14">Admin Only</span>
          <input
            type="checkbox"
            title="Only administrators can post in this forum"
            checked={adminForum}
            onChange={handleAdminForum}
          />
        </div>
        <div>
          <span className="size-14">Admin View only</span>
          <input
            type="checkbox"
            title="Only administrators can view this forum"
            checked={adminView}
            onChange={handleAdminView}
          />
        </div>
      </div>
      <h4>Subforum Name</h4>
      <input
        type="text"
        value={subforumName}
        onChange={e => setSubforumName(e.target.value)}
        minLength="3"
      />
      <h4>All Subforums</h4>
      <div className="mb-1">{populateSubforums()}</div>
      <div className="ml-auto">
        <button type="button" onClick={() => handleNewSubforum(subforumName)}>+ Subforum</button>
        <button type="submit">Add new forum</button>
      </div>
    </form>
  );
};

NewforumModal.propTypes = {
  handleFormReset: propTypes.func.isRequired,
};

export default NewforumModal;

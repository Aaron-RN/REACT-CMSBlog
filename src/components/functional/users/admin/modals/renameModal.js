import React, { useState } from 'react';
import propTypes from 'prop-types';

const RenameModal = ({ forum, handleFormReset }) => {
  const [forumName, setForumName] = useState(forum.name);

  // Handle renaming of a forum
  const handleSubmit = e => {
    e.preventDefault();
    const newForum = { name: forumName.trim() };
    console.log(newForum);
    handleFormReset();
  };

  return (
    <form className="modal-form" onSubmit={handleSubmit}>
      <h3 className="text-center">Rename Forum</h3>
      <h3>Forum Name</h3>
      <input
        type="text"
        value={forumName}
        onChange={e => setForumName(e.target.value)}
        minLength="3"
        required
      />
      <button type="submit">Rename Forum</button>
    </form>
  );
};

RenameModal.propTypes = {
  forum: propTypes.instanceOf(Object).isRequired,
  handleFormReset: propTypes.func.isRequired,
};

export default RenameModal;

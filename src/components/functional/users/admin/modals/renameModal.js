import React, { useState } from 'react';
import propTypes from 'prop-types';

const RenameModal = ({ forum, handleFormReset }) => {
  const [forumName, setForumName] = useState(forum.forum);

  // Handle renaming of a forum
  const handleRename = e => {
    e.preventDefault();
    console.log(forum, forumName);
    handleFormReset();
  };

  return (
    <form className="modal-form" onSubmit={handleRename}>
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

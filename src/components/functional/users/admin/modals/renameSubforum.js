import React, { useState } from 'react';
import propTypes from 'prop-types';

const RenameSubforumModal = ({ forum, subforum, handleFormReset }) => {
  const [subforumName, setSubforumName] = useState('');

  // Handle renaming of selected Subforum
  const handleSubmit = e => {
    e.preventDefault();
    const subforumNameTrimmed = subforumName.trim();
    setSubforumName(subforumNameTrimmed);
    if (!subforumName) return;
    const excludedSubforum = forum.subforums.filter(subforumData => subforumData !== subforum);
    const editedForum = { name: forum.name, subforums: [...excludedSubforum, subforumNameTrimmed] };
    console.log(editedForum);
    handleFormReset();
  };

  return (
    <form className="modal-form" onSubmit={handleSubmit}>
      <h3 className="text-center">Rename Subforum</h3>
      <h3 className="text-camel text-grey">{`Forum - ${forum.name}`}</h3>
      <h4>Subforum Name</h4>
      <input
        type="text"
        value={subforumName}
        onChange={e => setSubforumName(e.target.value)}
        minLength="3"
        required
      />
      <button type="submit">Rename</button>
    </form>
  );
};

RenameSubforumModal.propTypes = {
  forum: propTypes.instanceOf(Object).isRequired,
  subforum: propTypes.string.isRequired,
  handleFormReset: propTypes.func.isRequired,
};

export default RenameSubforumModal;

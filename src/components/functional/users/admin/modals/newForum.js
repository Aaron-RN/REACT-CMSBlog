import React, { useState } from 'react';
import propTypes from 'prop-types';

const NewforumModal = ({ handleFormReset }) => {
  const [forumName, setforumName] = useState('');
  const [subforumName, setSubforumName] = useState('');
  const [subforums, setSubforums] = useState([]);

  // Reset Forum Variables
  const handleReset = () => {
    setforumName('');
    setSubforumName('');
    setSubforums([]);
  };

  // Handle adding a new forum creation
  const handleSubmit = e => {
    e.preventDefault();
    const forum = { name: forumName.trim(), subforums };
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
      <h4>Subforum Name</h4>
      <input
        type="text"
        value={subforumName}
        onChange={e => setSubforumName(e.target.value)}
        minLength="3"
      />
      <h4>All Subforums</h4>
      <div className="mb-1">{populateSubforums()}</div>
      <div>
        <button type="button" onClick={() => handleNewSubforum(subforumName)}>+ Add new Subforum</button>
        <button type="submit">Add new forum</button>
      </div>
    </form>
  );
};

NewforumModal.propTypes = {
  handleFormReset: propTypes.func.isRequired,
};

export default NewforumModal;

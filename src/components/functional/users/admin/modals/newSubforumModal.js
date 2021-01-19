import React, { useState } from 'react';
import propTypes from 'prop-types';
import { subforumNew } from '../../../../misc/apiRequests';

const NewSubforumModal = ({
  forum, handleForums, handleFormReset, handleModal, handleLoader,
}) => {
  const [subforumName, setSubforumName] = useState('');

  // Handle adding a new Subforum
  const handleSubmit = e => {
    e.preventDefault();
    const subforumNameTrimmed = subforumName.trim();
    setSubforumName(subforumNameTrimmed);
    if (!subforumName) return;
    const newSubforum = { forum_id: forum.id, name: subforumNameTrimmed };

    handleLoader(true);
    subforumNew(newSubforum)
      .then(response => {
        if (response.success) {
          handleForums(response.forums);
          handleFormReset();
        }
        if (!response.success) handleModal(response.errors);
        handleLoader(false);
      });
  };

  return (
    <form className="modal-form" onSubmit={handleSubmit}>
      <h3 className="text-center">New Subforum</h3>
      <h3 className="text-camel text-grey">{`Forum - ${forum.name}`}</h3>
      <h4>Subforum Name</h4>
      <input
        type="text"
        value={subforumName}
        onChange={e => setSubforumName(e.target.value)}
        minLength="3"
        required
      />
      <button type="submit">Add new Subforum</button>
    </form>
  );
};

NewSubforumModal.propTypes = {
  forum: propTypes.instanceOf(Object).isRequired,
  handleForums: propTypes.func.isRequired,
  handleFormReset: propTypes.func.isRequired,
  handleModal: propTypes.func.isRequired,
  handleLoader: propTypes.func.isRequired,
};

export default NewSubforumModal;

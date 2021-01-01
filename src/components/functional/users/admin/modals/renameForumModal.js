import React, { useState } from 'react';
import propTypes from 'prop-types';
import { forumEdit } from '../../../../misc/apiRequests';

const RenameForumModal = ({
  forum, handleForums, handleFormReset, handleModal, handleLoader,
}) => {
  const [forumName, setForumName] = useState(forum.name);

  // Handle renaming of a forum
  const handleSubmit = e => {
    e.preventDefault();
    const renamedforum = { id: forum.id, name: forumName.trim() };

    handleLoader(true);
    forumEdit(renamedforum)
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

RenameForumModal.propTypes = {
  forum: propTypes.instanceOf(Object).isRequired,
  handleFormReset: propTypes.func.isRequired,
  handleForums: propTypes.func.isRequired,
  handleModal: propTypes.func.isRequired,
  handleLoader: propTypes.func.isRequired,
};

export default RenameForumModal;

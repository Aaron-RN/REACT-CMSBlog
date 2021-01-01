import React, { useState } from 'react';
import propTypes from 'prop-types';
import { subforumEdit } from '../../../../misc/apiRequests';

const RenameSubforumModal = ({
  forum, subforum, handleForums, handleFormReset, handleLoader, handleModal,
}) => {
  const [subforumName, setSubforumName] = useState(subforum.name);

  // Handle renaming of selected Subforum
  const handleSubmit = e => {
    e.preventDefault();
    const subforumNameTrimmed = subforumName.trim();
    setSubforumName(subforumNameTrimmed);
    if (!subforumName) return;
    const newSubforum = { id: subforum.id, name: subforumNameTrimmed };

    handleLoader(true);
    subforumEdit(newSubforum)
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
  subforum: propTypes.instanceOf(Object).isRequired,
  handleForums: propTypes.func.isRequired,
  handleFormReset: propTypes.func.isRequired,
  handleModal: propTypes.func.isRequired,
  handleLoader: propTypes.func.isRequired,
};

export default RenameSubforumModal;

import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import allForumsData from '../../../misc/presets/allForumsData';
import RenameModal from './modals/renameModal';
import NewSubforumModal from './modals/newSubforumModal';
import NewforumModal from './modals/newForum';

const AdminPanel = ({ user }) => {
  const [allForums, setForums] = useState([]);
  const [selectedForum, setSelectedForum] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('renameForum');

  const handleFormReset = () => {
    setSelectedForum({});
    setShowModal(false);
  };

  const handleModal = (forum, formType = 'renameForum') => {
    setSelectedForum(forum);
    setModalType(formType);
    setShowModal(true);
  };

  const populateSubForums = forumArray => forumArray
    .map(subforum => <span key={subforum} className="subforum">{`${subforum}`}</span>);

  const populateForums = () => allForums.map(forum => (
    <div key={forum.id} className="forum">
      <h4 className="text-camel">{forum.name}</h4>
      <div className="inline-block text-grey">Subforums:</div>
      {' [ '}
      {populateSubForums(forum.subforum)}
      {' ]'}
      <div className="forum-menu">
        <button type="button" onClick={() => handleModal(forum)}>Rename</button>
        <button type="button" onClick={() => handleModal(forum, 'newSubforum')}>+ Subforum</button>
      </div>
    </div>
  ));

  // Fetch all the forum data
  useEffect(() => {
    setForums(allForumsData);
  }, []);

  return user.admin_level > 0
    ? (
      <div id="Adminpanel">
        <div className="section">
          <h2>Admin Panel</h2>
          <div className="ml-1">
            <h3>Forum Handling</h3>
            <button type="button" className="ml-1 mb-1" onClick={() => handleModal({}, 'newForum')}>Create a new Forum</button>
            <h3 className="text-grey">All Forums &amp; Subforums</h3>
            <div className="all-forums">{populateForums()}</div>
          </div>
        </div>
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <div className="container-md">
                {modalType === 'renameForum' && (
                  <RenameModal forum={selectedForum} handleFormReset={handleFormReset} />
                )}
                {modalType === 'newSubforum' && (
                  <NewSubforumModal forum={selectedForum} handleFormReset={handleFormReset} />
                )}
                {modalType === 'newForum' && (
                  <NewforumModal handleFormReset={handleFormReset} />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    )
    : null;
};

AdminPanel.propTypes = {
  user: propTypes.instanceOf(Object).isRequired,
};

export default AdminPanel;

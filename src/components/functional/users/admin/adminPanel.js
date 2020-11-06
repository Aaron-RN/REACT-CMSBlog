import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import allForumsData from '../../../misc/presets/allForumsData';
import RenameModal from './modals/renameModal';
import NewSubforumModal from './modals/newSubforumModal';
import NewforumModal from './modals/newForum';
import RenameSubforumModal from './modals/renameSubforum';
import SuspendUser from './modals/suspendUser';
import PromoteUser from './modals/promoteUser';

const AdminPanel = ({ user, selectedUser }) => {
  const [allForums, setForums] = useState([]);
  const [selectedForum, setSelectedForum] = useState({});
  const [selectedSubforum, setSelectedSubforum] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('renameForum');

  const handleFormReset = () => {
    setSelectedForum({});
    setSelectedSubforum('');
    setShowModal(false);
  };

  const handleModal = (forum, formType = 'renameForum', subforum = '') => {
    setSelectedSubforum(subforum);
    setSelectedForum(forum);
    setModalType(formType);
    setShowModal(true);
  };

  const populateSubForums = (forum, subforumArray) => subforumArray
    .map(subforum => (
      <button
        type="button"
        title="Rename subforum"
        key={subforum}
        className="subforum"
        onClick={() => handleModal(forum, 'renameSubforum', subforum)}
      >
        {`${subforum}`}
      </button>
    ));

  const populateForums = () => allForums.map(forum => (
    <div key={forum.id} className="forum">
      <h4 className="text-camel">{forum.name}</h4>
      <div className="inline-block text-grey">Subforums:</div>
      {' [ '}
      {populateSubForums(forum, forum.subforum)}
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

  const renderMain = selectedUser
    ? (
      <div id="AdminPanel">
        <div className="section">
          <h2>Admin Panel</h2>
          <div className="ml-1">
            <h3>User Handling</h3>
            <button type="button" className="ml-1 mb-1" onClick={() => handleModal({}, 'suspendUser')}>Suspend User Capabilities</button>
            <button type="button" className="ml-1 mb-1" onClick={() => handleModal({}, 'promoteUser')}>Promote Admin</button>
          </div>
        </div>
        {showModal && (
          <div className="modal">
            <button type="button" className="modal-bg" onClick={handleFormReset}>x</button>
            <div className="modal-content">
              <div className="container-md">
                {modalType === 'suspendUser' && (
                  <SuspendUser
                    user={user}
                    selectedUser={selectedUser}
                    handleFormReset={handleFormReset}
                  />
                )}
                {modalType === 'promoteUser' && (
                  <PromoteUser
                    user={user}
                    selectedUser={selectedUser}
                    handleFormReset={handleFormReset}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    )
    : (
      <div id="AdminPanel">
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
          <button type="button" className="modal-bg" onClick={handleFormReset}>x</button>
          <div className="modal-content">
            <div className="container-md">
              {modalType === 'renameForum' && (
              <RenameModal forum={selectedForum} handleFormReset={handleFormReset} />
              )}
              {modalType === 'renameSubforum' && (
              <RenameSubforumModal
                forum={selectedForum}
                subforum={selectedSubforum}
                handleFormReset={handleFormReset}
              />
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
    );

  return user.admin_level > 0
    ? renderMain
    : null;
};

AdminPanel.defaultProps = {
  selectedUser: null,
};

AdminPanel.propTypes = {
  selectedUser: propTypes.instanceOf(Object),
  user: propTypes.instanceOf(Object).isRequired,
};

export default AdminPanel;

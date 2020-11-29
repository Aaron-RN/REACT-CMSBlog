import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ForumDisplay from '../../presentational/blogPage/forumDisplay';
import '../../../assets/css/blogPage.css';
import { fetchForumPosts } from '../../misc/apiRequests';

const TopicForum = ({
  match, user, handlePostSelect, handleModal, handleLoader,
}) => {
  const [forumTopics, setForumTopics] = useState();
  const { forum, subforum } = match.params;

  // Grab all topics by forum on Component Load
  useEffect(() => {
    handleLoader(true);
    const subforumCheck = subforum === undefined ? '' : subforum;
    fetchForumPosts(forum, subforumCheck, 5, 1)
      .then(response => {
        if (response.success) {
          setForumTopics(response.forum);
        }
        if (!response.success) handleModal(response.errors);
        handleLoader(false);
      });
  }, [forum, subforum, handleModal, handleLoader]);

  return (
    <div id="BlogPage" className="bg-main pt-1">
      <div className="container-md">
        <div className="section">
          <h4 className="text-grey">Forum</h4>
          <div>
            <Link to="/"><i className="fas fa-chevron-circle-left pr-1" /></Link>
            <Link to={`/${forum}`} className="header text-caps">{forum}</Link>
            {subforum && ' / '}
            {subforum && <Link to={`/${forum}/${subforum}`} className="header text-caps">{subforum}</Link>}
            {' / '}
          </div>
          {forumTopics && (
            <ForumDisplay
              key={forumTopics.name}
              user={user}
              forum={forumTopics}
              handlePostSelect={handlePostSelect}
              postsPages={5}
              isSubforum={!!subforum}
            />
          )}
        </div>
      </div>
    </div>
  );
};

TopicForum.propTypes = {
  match: propTypes.instanceOf(Object).isRequired,
  user: propTypes.instanceOf(Object).isRequired,
  handlePostSelect: propTypes.func.isRequired,
  handleLoader: propTypes.func.isRequired,
  handleModal: propTypes.func.isRequired,
};

export default TopicForum;

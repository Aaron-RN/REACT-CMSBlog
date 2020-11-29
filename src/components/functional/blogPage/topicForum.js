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

  // Populate all subforums and related posts paginated by 5 posts per page
  // const populateForums = () => forumTopics.map(forumData => (
  //   <ForumDisplay
  //     key={forumData.name}
  //     user={user}
  //     forum={forumData}
  //     handlePostSelect={handlePostSelect}
  //     postsPages={5}
  //   />
  // ));

  // Grab all topics by forum on Component Load
  useEffect(() => {
    // const selectedForum = allForums.filter(forumData => forumData.name === forum);
    // const categorizedPosts = selectedForum.map(forumData => {
    //   // checks if there is a subforum provided by match prop in address URL
    //   const selectedSubForum = subforum
    //     ? forumData.subforum.filter(subforumData => subforumData === subforum)
    //     : forumData.subforum;
    //   return ({
    //     name: forumData.name,
    //     posts: allPosts.filter(post => post.forum === forumData.name && !post.subforum),
    //     subforums: selectedSubForum.map(subforum => (
    //       {
    //         subforum,
    //         posts: allPosts
    //           .filter(post => post.forum === forumData.name && post.subforum === subforum),
    //       }
    //     )),
    //     admin_only: forumData.admin_only,
    //     admin_view_only: forumData.admin_view_only,
    //   });
    // });
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

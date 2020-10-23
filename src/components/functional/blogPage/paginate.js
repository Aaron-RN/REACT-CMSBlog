import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

const Paginate = ({ posts, populatePosts, postsPages }) => {
  const [selectedPosts, setPosts] = useState([]);
  const [postsPerPage] = useState(postsPages);
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < maxPages) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    const pageMax = Math.ceil(posts.length / postsPerPage);
    setMaxPages(pageMax);
  }, [posts, postsPerPage]);

  useEffect(() => {
    const startingIndex = (page * postsPerPage) - postsPerPage;
    const endingIndex = (page * postsPerPage) - 1;
    const paginatedPosts = posts.filter((post, index) => {
      if (index >= startingIndex && index <= endingIndex) {
        return post;
      }
      return null;
    });
    setPosts(paginatedPosts);
  }, [page, posts, postsPerPage]);

  return (
    <div>
      {populatePosts(selectedPosts)}
      <div className="paginate">
        <button type="button" onClick={handlePrev}>Prev</button>
        <span>
          {page}
          /
          {maxPages}
        </span>
        <button type="button" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

Paginate.defaultProps = {
  postsPages: 5,
};

Paginate.propTypes = {
  posts: propTypes.instanceOf(Array).isRequired,
  populatePosts: propTypes.func.isRequired,
  postsPages: propTypes.number,
};

export default Paginate;

import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

const PaginateComments = ({
  comments, populateComments, itemsPerPage,
}) => {
  const [selectedComments, setSelectedComments] = useState([]);
  const [commentsPerPage] = useState(itemsPerPage);
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
    const pageMax = Math.ceil(comments.length / commentsPerPage);
    setMaxPages(pageMax || 1);
  }, [comments, commentsPerPage]);

  useEffect(() => {
    const startingIndex = (page * commentsPerPage) - commentsPerPage;
    const endingIndex = (page * commentsPerPage) - 1;
    const paginatedComments = comments.filter((comment, index) => {
      if (index >= startingIndex && index <= endingIndex) {
        return comment;
      }
      return null;
    });
    setSelectedComments(paginatedComments);
  }, [page, comments, commentsPerPage]);

  return (
    <div>
      {populateComments(selectedComments)}
      {maxPages > 1 && (
        <div className="paginate-comment">
          <button type="button" onClick={handlePrev}>Prev</button>
          <span>
            {page}
            /
            {maxPages}
          </span>
          <button type="button" onClick={handleNext}>Next</button>
        </div>
      )}
    </div>
  );
};

PaginateComments.defaultProps = {
  itemsPerPage: 6,
};

PaginateComments.propTypes = {
  comments: propTypes.instanceOf(Array).isRequired,
  populateComments: propTypes.func.isRequired,
  itemsPerPage: propTypes.number,
};

export default PaginateComments;

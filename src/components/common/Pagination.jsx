import React, { Component } from 'react';
import _ from 'lodash';

class Pagination extends React.Component {
  render() {
    const { pageSize, itemsCount, currentPage, onPageChange } = this.props;

    const pagesCount = Math.ceil(itemsCount / pageSize);
    const paginationItems = _.range(1, pagesCount + 1);

    if (pagesCount === 1) return null;

    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {paginationItems.map((item) => (
            <li key={item} className={`page-item ${item === currentPage && 'active'}`}>
              <a onClick={() => onPageChange(item)} className="page-link inline">
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

export default Pagination;

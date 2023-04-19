import React from "react";
import { Link } from "react-router-dom";

const Pagination = (props) => {
  const { currentPage, pageTotal, keyword = "" } = props;
  return (
    pageTotal > 1 && (
      <nav>
        <ul className="pagination justify-content-center">
          {[...Array(pageTotal).keys()].map((x) => (
            <li
              className={`page-item ${x + 1 === currentPage ? "active" : ""}`}
              key={x + 1}
            >
              <Link
                className="page-link"
                to={
                  keyword
                    ? `/search/${keyword}/page/${x + 1}`
                    : `/page/${x + 1}`
                }
              >
                {x + 1}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    )
  );
};

export default Pagination;

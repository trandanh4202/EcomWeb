import React from "react";
import { Link } from "react-router-dom";

const Pagination = (props) => {
  const { currentPage, pageTotal, productId, search = "", queryParams } = props;

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
                to={{
                  pathname: queryParams ? "/" : `/products/${productId}`,
                  search: queryParams
                    ? `?${queryParams.toString()}&currentPage=${x + 1}`
                    : `?currentPage=${x + 1}`,
                }}
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

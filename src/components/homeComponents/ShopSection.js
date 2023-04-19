import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Rating from "./Rating";
import Pagination from "./pagination";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../../Redux/Action/ProductAction";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import { getUserDetails } from "../../Redux/Action/UserAction";
import { listCart } from "../../Redux/Action/CartAction";
import { listBrands, listCategories } from "../../Redux/Action/FilterAction";

const ShopSection = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { search, currentPage, categoryId, brandId } = props;
  const productList = useSelector((state) => state.productList);
  const { loading, products, error, page, pageTotal } = productList;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const brandList = useSelector((state) => state.brandList);
  const { brands } = brandList;
  console.log(props);
  useEffect(() => {
    dispatch(listProduct(search, currentPage, categoryId, brandId));
    dispatch(getUserDetails());
    dispatch(listCart());
  }, [dispatch, search, currentPage, categoryId, brandId]);
  useEffect(() => {
    dispatch(listCategories());
    dispatch(listBrands());
  }, []);
  return (
    <>
      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col-lg-3 col-md-3">
              <div className="category-box">
                <h3>Category</h3>
                <ul>
                  {categories &&
                    categories.map((category) => (
                      <li key={category.id}>
                        <Link
                          to={{
                            pathname: `/search`,
                            search: `search=${search}&page=${page}&categoryId=${category.id}&brandId=${brandId}`,
                          }}
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
              <div className="brand-box">
                <h3>Brand</h3>
                <ul>
                  {brands &&
                    brands.map((brand) => (
                      <li key={brand.id}>
                        <Link
                          to={
                            search
                              ? categoryId
                                ? `/search/${search}/page/${currentPage}/categories/${categoryId}/brands/${brand.id}`
                                : `/search/${search}/page/${currentPage}/brands/${brand.id}`
                              : categoryId
                              ? `/page/${currentPage}/categories/${categoryId}/brands/${brand.id}`
                              : `/brands/${brand.id}`
                          }
                          className={brand.id === props.brandId ? "active" : ""}
                        >
                          {brand.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-9 col-md-9 article">
              <div className="shopcontainer row">
                {loading ? (
                  <Loading />
                ) : error ? (
                  <Message variant="alert-danger">{error}</Message>
                ) : (
                  <>
                    {products.map((product) => (
                      <div
                        className="shop col-lg-4 col-md-6 col-sm-6"
                        key={product.id}
                      >
                        <div className="border-product">
                          <Link to={`/products/${product.id}`}>
                            <div className="shopBack">
                              <img src={product.imageUrl} alt={product.name} />
                            </div>
                          </Link>

                          <div className="shoptext">
                            <p>
                              <Link to={`/products/${product.id}`}>
                                {product.name}
                              </Link>
                            </p>

                            <Rating
                              value={product.averageRating}
                              text={`${product.reviewQuantity} reviews`}
                            />
                            <h3>${product.price}</h3>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}

                {/* Pagination */}
                <Pagination
                  currentPage={page}
                  pageTotal={pageTotal}
                  search={search ? search : ""}
                  // categoryId={categoryId}
                  brandId={brandId}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopSection;

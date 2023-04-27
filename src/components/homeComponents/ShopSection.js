import React, { useEffect, useState } from "react";
import Rating from "./Rating";
import Pagination from "./pagination";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../../Redux/Action/ProductAction";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import { getUserDetails } from "../../Redux/Action/UserAction";
import { listCart } from "../../Redux/Action/CartAction";
import { listBrands, listCategories } from "../../Redux/Action/FilterAction";
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";

const ShopSection = (props) => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, products, error, pageTotal } = productList;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const brandList = useSelector((state) => state.brandList);
  const { brands } = brandList;
  const search = "";
  const { pageId } = props;
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  useEffect(() => {
    dispatch(listProduct(search, pageId, selectedCategories, selectedBrands));
    dispatch(getUserDetails());
    dispatch(listCart());
  }, [dispatch, search, pageId, selectedCategories, selectedBrands]);

  useEffect(() => {
    dispatch(listCategories());
    dispatch(listBrands());
  }, []);

  const handleToggleCategory = (categoryId) => {
    const index = selectedCategories.indexOf(categoryId);
    if (index >= 0) {
      // remove category from selectedCategories
      const updatedCategories = [...selectedCategories];
      updatedCategories.splice(index, 1);
      setSelectedCategories(updatedCategories);
    } else {
      // add category to selectedCategories
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const handleToggleBrand = (brandId) => {
    const index = selectedBrands.indexOf(brandId);
    if (index >= 0) {
      // remove category from selectedBrands
      const updateBrands = [...selectedBrands];
      updateBrands.splice(index, 1);
      setSelectedBrands(updateBrands);
    } else {
      // add category to selectedBrands
      setSelectedBrands([...selectedBrands, brandId]);
    }
  };
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
                      <li
                        key={category.id}
                        onClick={() => handleToggleCategory(category.id)}
                        className={
                          selectedCategories.includes(category.id)
                            ? "active"
                            : ""
                        }
                      >
                        {category.name}
                      </li>
                    ))}
                </ul>
              </div>
              <div className="brand-box">
                <h3>Brand</h3>
                <ul>
                  {brands &&
                    brands.map((brand) => (
                      <li
                        key={brand.id}
                        onClick={() => handleToggleBrand(brand.id)}
                        className={
                          selectedBrands.includes(brand.id) ? "active" : ""
                        }
                      >
                        {brand.name}
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
                  currentPage={pageId}
                  pageTotal={pageTotal}
                  // search={search ? search : ""}
                  // categoryId={categoryId}
                  // brandId={brandId}
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

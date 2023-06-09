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
import { Link, useLocation } from "react-router-dom";

const ShopSection = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search") || "";
  const currentPageQuery = searchParams.get("currentPage");

  const queryParams = new URLSearchParams();
  if (searchQuery) {
    queryParams.append("search", searchQuery);
  }

  const productList = useSelector((state) => state.productList);
  const { loading, products, error, pageTotal } = productList;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const brandList = useSelector((state) => state.brandList);
  const { brands } = brandList;
  const { pageId } = props;
  const [selectedCategories, setSelectedCategories] = useState(null);
  const [selectedBrands, setSelectedBrands] = useState(null);
  const [selectedSorts, setsSlectedSorts] = useState(null);
  const [priceFrom, setPriceFrom] = useState(null);
  const [priceTo, setPriceTo] = useState(null);

  const [hasPrice, setHasPrice] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (priceFrom !== null && priceTo !== null) {
      setHasPrice(true);
      dispatch(
        listProduct(
          searchQuery,
          selectedSorts,
          currentPageQuery,
          priceFrom,
          priceTo,
          selectedCategories,
          selectedBrands
        )
      );
    }
  };
  useEffect(() => {
    dispatch(
      listProduct(
        searchQuery,
        selectedSorts,
        currentPageQuery,
        priceFrom,
        priceTo,
        selectedCategories,
        selectedBrands
      )
    );
    dispatch(getUserDetails());
    dispatch(listCart());
  }, [
    dispatch,
    searchQuery,
    selectedSorts,
    currentPageQuery,
    // priceFrom,
    // priceTo,
    selectedCategories,
    selectedBrands,
  ]);

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
              <div className=" category-box">
                <h3>Category</h3>
                <select
                  value={selectedCategories}
                  onChange={(event) =>
                    setSelectedCategories(event.target.value)
                  }
                >
                  <option value="">-- Choose a category --</option>
                  {categories &&
                    categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className=" brand-box">
                <h3>Brand</h3>
                <select
                  value={selectedBrands}
                  onChange={(event) => setSelectedBrands(event.target.value)}
                >
                  <option value="">-- Choose a brand --</option>
                  {brands &&
                    brands.map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="sort-box">
                <h3>Sort</h3>
                <select
                  value={selectedSorts}
                  onChange={(event) => setsSlectedSorts(event.target.value)}
                >
                  <option value>-- Choose a brand --</option>
                  <option value={""}>Sort name A-Z</option>
                  <option value={"Name-"}>Sort name Z - A</option>
                  <option value={"Price"}>Sort Price Low To High</option>
                  <option value={"Price-"}>Sort Price High To Low</option>
                  <option value={"View"}>Sort View</option>
                  <option value={"BestSale"}>Sort Sale</option>
                </select>
              </div>
              <div className="price-box">
                <h3>Price</h3>
                <form
                  className="d-flex w-100 flex-column from-price "
                  onSubmit={handleSubmit} // sử dụng hàm handleSubmit để xử lý sự kiện submit
                >
                  <div className="d-flex w-100 justify-content-between from-price ">
                    <input
                      type="input"
                      name="from"
                      placeholder="Price from"
                      value={priceFrom}
                      onChange={(e) => setPriceFrom(e.target.value)}
                      className="input-price"
                    />
                    <input
                      type="input"
                      name="to"
                      placeholder="Price to"
                      value={priceTo}
                      onChange={(e) => setPriceTo(e.target.value)}
                      className="input-price"
                    />
                  </div>
                  <button type="submit" className="w-100">
                    Check
                  </button>
                </form>
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
                            {product.percentSale > 0 && (
                              <span className="percent-sale">
                                {product.percentSale}% OFF
                              </span>
                            )}
                            <div className="product-favourite">Yêu Thích</div>
                            {product.percentSale === 0 ? (
                              <h3>
                                {product.price} {""}
                                VNĐ
                              </h3>
                            ) : (
                              <>
                                <h3 className="old-price">
                                  {product.price} {""}
                                  VNĐ
                                </h3>
                                <h3>
                                  {product.price -
                                    (product.price * product.percentSale) /
                                      100}{" "}
                                  VNĐ
                                </h3>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}

                {/* Pagination */}
                <Pagination
                  currentPage={currentPageQuery}
                  pageTotal={pageTotal}
                  search={searchQuery}
                  queryParams={queryParams}
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

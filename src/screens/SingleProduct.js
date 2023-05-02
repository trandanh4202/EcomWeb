import React, { useEffect, useState } from "react";
import Header from "./../components/Header";
import Rating from "../components/homeComponents/Rating";
import { Link } from "react-router-dom";
import Message from "./../components/LoadingError/Error";
import { useDispatch, useSelector } from "react-redux";
import {
  listProductDeTails,
  listReviewProduct,
  views,
} from "../Redux/Action/ProductAction";
import Loading from "../components/LoadingError/Loading";
import { addToCart2, listCart } from "../Redux/Action/CartAction";
import { toast } from "react-toastify";
import Toast from "../components/LoadingError/Toast";
import { CART_ADD_ITEM_SUCCESS } from "../Redux/Constants/CartConstants";
import moment from "moment";
import axios from "axios";

const SingleProduct = ({ history, match }) => {
  const [quantity, setQuantity] = useState(1);
  const productId = match.params.id;
  const dispatch = useDispatch();
  const toastId = React.useRef(null);
  const toastObject = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const cartList = useSelector((state) => state.cartList);
  const { cartLists } = cartList;

  const userDetails = useSelector((state) => state.userDetails);
  const { userInfo } = userDetails;

  const reviewList = useSelector((state) => state.reviewList);
  const { loading1, reviews, error1, pageTotal } = reviewList;

  const AddToCartHanddle = (e) => {
    e.preventDefault();
    if (!userInfo) {
      // Kiểm tra trạng thái đăng nhập
      alert("Bạn cần đăng nhập để thực hiện chức năng này!");
      return;
    }
    dispatch(addToCart2(productId, quantity));
    if (dispatch({ type: CART_ADD_ITEM_SUCCESS })) {
      if (cartLists.some((item) => item.productId === productId)) {
        toastId.current = toast.success(
          // `${cartLists.map((item) => item.message)}`,
          "Sản phẩm đã có, số lượng được cập nhật",
          toastObject
        );
      } else {
        toastId.current = toast.success(
          // `${cartLists.map((item) => item.message)}`,
          "Đã thêm sản phẩm vào giỏ hàng",
          toastObject
        );
      }
    }
  };

  useEffect(() => {
    dispatch(listReviewProduct(productId));
    dispatch(listProductDeTails(productId));
    dispatch(listCart());
    dispatch(views(productId));
  }, [dispatch, productId]);

  return (
    <>
      <Header />
      <div className="container single-product">
        <Toast />
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            <div className="row">
              <div className="col-md-6">
                <div className="single-image">
                  <img src={product.imageUrl} alt={product.name} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="product-dtl">
                  <div className="product-info">
                    <div className="product-name">{product.name}</div>
                  </div>
                  <p>{product.description}</p>

                  <div className="product-count col-lg-7 ">
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Price</h6>
                      <span>${product.price}</span>
                    </div>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Status</h6>
                      {product.quantity}
                    </div>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Reviews</h6>
                      <Rating
                        value={product.averageRating}
                        text={`${product.reviewQuantity} reviews`}
                      />
                    </div>
                    {product.quantity > 0 ? (
                      <>
                        <div className="flex-box d-flex justify-content-between align-items-center">
                          <h6>Quantity</h6>
                          <select
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                          >
                            {[...Array(product.quantity).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </select>
                        </div>
                        <button
                          className="round-black-btn"
                          onClick={AddToCartHanddle}
                        >
                          Add To Cart
                        </button>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            {/* RATING */}
            <div className="row my-5">
              <div className="col-md-6">
                <h6 className="mb-3">REVIEWS</h6>
                {product &&
                  product.reviewQuantity &&
                  product.reviewQuantity === 0 && (
                    <Message variant={"alert-info mt-3"}>No Reviews</Message>
                  )}
                {reviews?.map((review) => (
                  <div className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded">
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <span>{moment(review.date).calendar()}</span>
                    <div className="alert alert-info mt-3">
                      {review.comment}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SingleProduct;

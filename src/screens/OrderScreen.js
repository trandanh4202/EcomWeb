import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./../components/Header";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../Redux/Action/OrderAction";
import Loading from "../components/LoadingError/Loading";
import Message from "../components/LoadingError/Error";
import { listCart } from "../Redux/Action/CartAction";

const OrderScreen = ({ match }) => {
  window.scrollTo(0, 0);
  const orderId = match.params.id;
  const dispatch = useDispatch();

  // const orderCreate = useSelector((state) => state.orderCreate);
  // const { order, success, error } = orderCreate;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { orderDetail, loading, error } = orderDetails;

  const userDetails = useSelector((state) => state.userDetails);
  const { userInfo } = userDetails;

  const addressDetail = useSelector((state) => state.addressDetail);
  const { addressDetails } = addressDetail;

  const cartList = useSelector((state) => state.cartList);
  const { cartLists, paymentMethod } = cartList;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order } = orderCreate;

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
    dispatch(listCart());
  }, [dispatch, orderId]);

  return (
    <>
      <Header />
      <div className="container">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant={"alert-danger"}>{error}</Message>
        ) : (
          <>
            <div className="row  order-detail">
              <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                <div className="row">
                  <div className="col-md-4 center">
                    <div className="alert-success order-box">
                      <i className="fas fa-user"></i>
                    </div>
                  </div>
                  <div className="col-md-8 center">
                    <h5>
                      <strong>Customer</strong>
                    </h5>
                    <p>{userInfo.name}</p>
                    <p>
                      <a href={`mailto:admin@example.com`}>{userInfo.email}</a>
                    </p>
                  </div>
                </div>
              </div>
              {/* 2 */}
              <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                <div className="row">
                  <div className="col-md-4 center">
                    <div className="alert-success order-box">
                      <i className="fas fa-truck-moving"></i>
                    </div>
                  </div>
                  <div className="col-md-8 center">
                    <h5>
                      <strong>Order info</strong>
                    </h5>
                    <p>Shipping: {addressDetails.province}</p>
                    <p>Pay method: {paymentMethod}</p>

                    <div className="bg-danger p-2 col-12">
                      <p className="text-white text-center text-sm-start">
                        {!order.isPaid ? " Not Paid " : " Paid "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* 3 */}
              <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                <div className="row">
                  <div className="col-md-4 center">
                    <div className="alert-success order-box">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                  </div>
                  <div className="col-md-8 center">
                    <h5>
                      <strong>Deliver to</strong>
                    </h5>
                    <p>
                      Address: {addressDetails.district}, {""}{" "}
                      {addressDetails.ward}, {""} {addressDetails.detail}
                    </p>
                    <div className="bg-danger p-1 col-12">
                      <p className="text-white text-center text-sm-start">
                        Not Delivered
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row order-products justify-content-between">
              <div className="col-lg-8">
                {cartLists.length === 0 ? (
                  <Message variant="alert-info mt-5">
                    Your order is empty
                  </Message>
                ) : (
                  <>
                    {cartLists.map((item) => (
                      <div className="order-product row">
                        <div className="col-md-3 col-6">
                          <img src={item.product.imageUrl} alt="product" />
                        </div>
                        <div className="col-md-5 col-6 d-flex align-items-center">
                          <Link to={`/`}>
                            <h6>{item.product.name}</h6>
                          </Link>
                        </div>
                        <div className="mt-3 mt-md-0 col-6 col-md-2  d-flex align-items-center flex-column justify-content-center ">
                          <h4>QUANTITY</h4>
                          <h6>{item.quantity}</h6>
                        </div>
                        <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center">
                          <h4>SUBTOTAL</h4>
                          <h6>{order.total}</h6>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
              {/* total */}
              <div className="col-lg-3 d-flex align-items-end flex-column mt-5 subtotal-order">
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <td>
                        <strong>Products</strong>
                      </td>
                      <td>$234</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Shipping</strong>
                      </td>
                      <td>$566</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Tax</strong>
                      </td>
                      <td>$3</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Total</strong>
                      </td>
                      <td>$567</td>
                    </tr>
                  </tbody>
                </table>
                <div className="col-12">
                  <PayPalButton amount={345} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default OrderScreen;

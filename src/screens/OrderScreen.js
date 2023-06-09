import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./../components/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderDetails,
  getOrders,
  payOrder,
} from "../Redux/Action/OrderAction";
import Loading from "../components/LoadingError/Loading";
import Message from "../components/LoadingError/Error";
import moment from "moment/moment";

const OrderScreen = ({ match }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { orderDetail, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { data } = orderPay;

  if (!loading) {
    const addDecimals = (num) => {
      return Math.round(num).toFixed(0);
    };

    orderDetail.cartItems.itemsPrice = addDecimals(
      orderDetail.cartItems.reduce((total, cartItem) => {
        return total + cartItem.price * cartItem.quantity;
      }, 0)
    );
    //shipping
    orderDetail.cartItems.shippingPrice = addDecimals(
      orderDetail.cartItems.itemsPrice > 0 ? 0 : 500000
    );
    //total price sale

    orderDetail.cartItems.salePrice = addDecimals(
      orderDetail.cartItems.reduce((total, item) => {
        const itemPrice = item.product.price * item.quantity;
        const itemDiscount = (itemPrice * item.product.percentSale) / 100;
        return total + itemDiscount;
      }, 0)
    );

    orderDetail.cartItems.totalPrice = addDecimals(
      orderDetail.cartItems.itemsPrice - orderDetail.cartItems.salePrice
    );
  }

  const userDetails = useSelector((state) => state.userDetails);
  const { userInfo } = userDetails;

  const addressDetail = useSelector((state) => state.addressDetail);
  const { addressDetails } = addressDetail;

  const cartList = useSelector((state) => state.cartList);
  const { paypalMethod } = cartList;

  const orderData = useSelector((state) => state.orderData);
  const { order } = orderData;

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
    dispatch(getOrders(orderId));
    dispatch(payOrder(orderId));
    // dispatch(getAddress());
    console.log(orderId);
  }, [dispatch, orderId]);

  const successPaymentHandler = () => {
    const width = 500;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    const paypalWindow = window.open(
      data,
      "PayPal",
      `width=${width},height=${height},left=${left},top=${top}`
    );
    const intervalId = setInterval(() => {
      if (paypalWindow.closed) {
        clearInterval(intervalId);
        window.location.reload();
      }
    }, 2000);
  };

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
                    <p>Shipping: {order?.address?.province ?? ""}</p>
                    <p>Pay method: {paypalMethod}</p>
                    {!order?.paidAt ? (
                      <div className="bg-danger p-2 col-12">
                        <p className="text-white text-center text-sm-start">
                          Not Paid
                        </p>
                      </div>
                    ) : (
                      <div className="bg-info p-2 col-12">
                        <p className="text-white text-center text-sm-start">
                          Paid on {moment(order.paidAt).calendar()}
                        </p>
                      </div>
                    )}
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
                      Address: {order?.address?.district}, {""}{" "}
                      {order?.address?.ward}, {""} {order?.address?.detail}
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
                {orderDetail.length === 0 ? (
                  <Message variant="alert-info mt-5">
                    Your order is empty
                  </Message>
                ) : (
                  <>
                    {orderDetail.cartItems.map((item) => (
                      <div className="order-product row">
                        <div className="col-md-3 col-6">
                          <img src={item.product.imageUrl} alt="product" />
                        </div>
                        <div className="col-md-5 col-6 d-flex align-items-center">
                          <Link to={`/products/${item.product.id}`}>
                            <h6>{item.product.name}</h6>
                          </Link>
                        </div>
                        <div className="mt-3 mt-md-0 col-6 col-md-2 d-flex align-items-center flex-column justify-content-center ">
                          <h4>QUANTITY</h4>
                          <h6>{item.quantity}</h6>
                        </div>
                        <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center">
                          <h4>SUBTOTAL</h4>
                          <h6>{item.price}</h6>
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
                      <td>${orderDetail.cartItems.itemsPrice}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Shipping</strong>
                      </td>
                      <td>${orderDetail.cartItems.shippingPrice}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Sale</strong>
                      </td>
                      <td>${orderDetail.cartItems.salePrice}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Total</strong>
                      </td>
                      <td>${orderDetail.cartItems.totalPrice}</td>
                    </tr>
                  </tbody>
                </table>

                {order && order.paidAt === null && (
                  <button onClick={successPaymentHandler}>paypal</button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default OrderScreen;

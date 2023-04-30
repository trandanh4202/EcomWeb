import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/LoadingError/Error";
import { listCart } from "../Redux/Action/CartAction";
import { createOrder } from "../Redux/Action/OrderAction";
import { getAddress, listAddress } from "../Redux/Action/ShippingAction";
import Header from "./../components/Header";

const PlaceOrderScreen = ({ history }) => {
  window.scrollTo(0, 0);

  const dispatch = useDispatch();
  const cartList = useSelector((state) => state.cartList);
  const { cartLists, paymentMethod } = cartList;

  const address = useSelector((state) => state.address);
  const { shippingAddress } = address;

  const addressDetail = useSelector((state) => state.addressDetail);
  const { addressDetails } = addressDetail;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  // calculate price
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cartLists.itemsPrice = addDecimals(
    cartLists.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  );

  cartLists.shippingPrice = addDecimals(
    cartLists.itemsPrice > 1000000 ? 0 : 500000
  );

  cartLists.taxPrice = addDecimals(
    Number((0.15 * cartLists.itemsPrice).toFixed(2))
  );

  cartLists.totalPrice = (
    Number(cartLists.itemsPrice) +
    Number(cartLists.shippingPrice) +
    Number(cartLists.taxPrice)
  ).toFixed(2);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        addressId: addressDetails.id,
        productIds: cartLists.map((item) => item.productId),
      })
    );
  };
  const [addressList, setAddressList] = useState([]);

  const getAddressList = async () => {
    try {
      const { data } = await dispatch(listAddress());
      setAddressList(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    dispatch(listCart());
    dispatch(listAddress());
    dispatch(getAddress(shippingAddress[0].id));
    if (success) {
      history.push(`/order/${order.id}`);
    }
  }, [dispatch, success, history, order]);

  return (
    <>
      <Header />
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Choose your shipping address
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {shippingAddress.length === 0 ? (
                <p>You have not added any shipping address yet.</p>
              ) : (
                <ul className="list-group">
                  {shippingAddress.map((address) => (
                    <li
                      key={address.id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div>
                        {address.detail}, {address.ward}, {address.district},{" "}
                        {address.province}
                      </div>
                      <Link
                        to="#"
                        className="btn btn-primary"
                        onClick={() => dispatch(getAddress(address.id))}
                      >
                        Select
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row  order-detail">
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row ">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i class="fas fa-user"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Customer</strong>
                </h5>
                <p>{userInfo.user.name}</p>
                <p>{userInfo.user.email}</p>
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
                <h5 className="d-flex align-items-center ">
                  <strong>Order info</strong>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm ms-2"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={getAddressList}
                  >
                    Thay đổi
                  </button>
                </h5>
                <p>
                  Shipping:{" "}
                  {addressDetails.province
                    ? addressDetails.province
                    : shippingAddress.length > 0
                    ? shippingAddress[0].province
                    : ""}
                </p>
                <p>Pay method: {paymentMethod}</p>
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
                  Address:{" "}
                  {addressDetails.district
                    ? addressDetails.district
                    : shippingAddress.length > 0
                    ? shippingAddress[0].district
                    : ""}{" "}
                  , {""}{" "}
                  {addressDetails.ward
                    ? addressDetails.ward
                    : shippingAddress.length > 0
                    ? shippingAddress[0].ward
                    : ""}
                  , {""}{" "}
                  {addressDetails.detail
                    ? addressDetails.detail
                    : shippingAddress.length > 0
                    ? shippingAddress[0].detail
                    : ""}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row order-products justify-content-between">
          <div className="col-lg-8">
            {cartLists.length === 0 ? (
              <Message variant="alert-info mt-5">Your cart is empty</Message>
            ) : (
              <>
                {cartLists.map((item, index) => (
                  <div className="order-product row" key={index}>
                    <div className="col-md-3 col-6">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                      />
                    </div>
                    <div className="col-md-5 col-6 d-flex align-items-center">
                      <Link to={`/products/${item.product.product}`}>
                        <h6>{item.product.name}</h6>
                      </Link>
                    </div>
                    <div className="mt-3 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center ">
                      <h4>QUANTITY</h4>
                      <h6>{item.quantity}</h6>
                    </div>
                    <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center ">
                      <h4>SUBTOTAL</h4>
                      <h6>${item.product.price * item.quantity}</h6>
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
                  <td>${cartLists.itemsPrice}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Shipping</strong>
                  </td>
                  <td>${cartLists.shippingPrice}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Tax</strong>
                  </td>
                  <td>${cartLists.taxPrice}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Total</strong>
                  </td>
                  <td>${cartLists.totalPrice}</td>
                </tr>
              </tbody>
            </table>
            {cartLists.length === 0 ? null : (
              <button type="submit" onClick={placeOrderHandler}>
                PLACE ORDER
              </button>
            )}
            {error && (
              <div className="my-3 col-12">
                <Message variant="alert-danger">{error}</Message>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderScreen;

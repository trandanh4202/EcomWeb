import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import { savePaymentMethod } from "../Redux/Action/CartAction";
import store from "../Redux/store";
import Header from "./../components/Header";

const PaymentScreen = ({ history }) => {
  window.scrollTo(0, 0);
  const address = useSelector((state) => state.address);
  const { shippingAddress } = address;
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();
  // if (!shippingAddress) {
  //   history.push("/shipping");
  // }
  console.log(store.getState().shippingAddress);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login2 col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <h6>SELECT PAYMENT METHOD</h6>
          <div className="payment-container">
            <div className="radio-container">
              <input
                className="form-check-input"
                type="radio"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="form-check-label">PayPal or Credit Card</label>
            </div>
          </div>

          <button type="submit">Continue</button>
        </form>
      </div>
    </>
  );
};

export default PaymentScreen;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { listCart } from "../Redux/Action/CartAction";
import {
  getAddress,
  listAddress,
  removeAddress,
  saveShippingAddress,
} from "../Redux/Action/ShippingAction";
import store from "../Redux/store";

const ShippingScreen = ({ history }) => {
  // window.scrollTo(0, 0);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [detail, setDetail] = useState("");

  const dispatch = useDispatch();
  const address = useSelector((state) => state.address);
  const { loading, error, shippingAddress } = address;

  const submitHandler = (e) => {
    e.preventDefault();

    // if (!province || !district || !ward || !detail) {
    //   alert("Vui lòng nhập đủ thông tin.");
    // } else {
    dispatch(saveShippingAddress({ province, district, ward, detail }));
    history.push("/payment");
    // }
  };

  const removeAddressHandle = (id) => {
    dispatch(removeAddress(id));
  };

  useEffect(() => {
    if (shippingAddress) {
      setProvince("");
      setDistrict("");
      setWard("");
      setDetail("");
    }
  }, [shippingAddress]);

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
    dispatch(listAddress());
  }, [dispatch]);
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
                      <div
                        onClick={() => removeAddressHandle(address.id)}
                        className="remove-button d-flex justify-content-center align-items-center"
                      >
                        <i className="fas fa-times"></i>
                      </div>
                      <div>
                        {address.detail}, {address.ward}, {address.district},{" "}
                        {address.province}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        <button
          type="button"
          className="btn btn-primary btn-sm mb-5"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={getAddressList}
        >
          {" "}
          xem tất cả địa chỉ
        </button>
        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <h6>DELIVERY ADDRESS</h6>
          <input
            type="text"
            placeholder="Enter Province"
            value={province}
            // required
            onChange={(e) => setProvince(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter district"
            value={district}
            // required
            onChange={(e) => setDistrict(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter ward"
            value={ward}
            // required
            onChange={(e) => setWard(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter detail"
            value={detail}
            // required
            onChange={(e) => setDetail(e.target.value)}
          />
          <button type="submit">Continue</button>
        </form>
      </div>
    </>
  );
};

export default ShippingScreen;

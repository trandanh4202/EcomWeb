import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, logout } from "../Redux/Action/UserAction";
import { Link, useHistory, useLocation } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userDetails = useSelector((state) => state.userDetails);
  const { userInfo } = userDetails;

  const cartList = useSelector((state) => state.cartList);
  const { cartLists } = cartList;

  const logoutHandler = () => {
    dispatch(logout());
  };
  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  const location = useLocation();
  const [search, setSearch] = useState();
  React.useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setSearch(searchParams.get("search") || "");
  }, [location]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (search.trim()) {
      history.push(`?search=${search}`);
    } else {
      history.push(`/`);
    }
  };
  return (
    <div>
      {/* Top Header */}
      <div className="Announcement ">
        <div className="container">
          <div className="row">
            <div className="col-md-6 d-flex align-items-center display-none">
              <p>09134234**</p>
              <p>trantrongdanh15@gmail.com</p>
            </div>
            <div className=" col-12 col-lg-6 justify-content-center justify-content-lg-end d-flex align-items-center">
              <a href="https://www.facebook.com/trandanh42/">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://www.facebook.com/trandanh42/">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.facebook.com/trandanh42/">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://www.facebook.com/trandanh42/">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="https://www.facebook.com/trandanh42/">
                <i className="fab fa-pinterest-p"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Header */}
      <div className="header">
        <div className="container">
          {/* MOBILE HEADER */}
          <div className="mobile-header">
            <div className="container ">
              <div className="row ">
                <div className="col-6 d-flex align-items-center">
                  <Link className="navbar-brand" to="/">
                    <img alt="logo" src="/images/logo.png" />
                  </Link>
                </div>
                <div className="col-6 d-flex align-items-center justify-content-end Login-Register">
                  {userInfo ? (
                    <div className="btn-group">
                      <button
                        type="button"
                        className="name-button dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i class="fas fa-user"></i>
                      </button>
                      <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/profile">
                          Profile
                        </Link>

                        <Link
                          className="dropdown-item"
                          to="#"
                          onClick={logoutHandler}
                        >
                          Logout
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="btn-group">
                      <button
                        type="button"
                        className="name-button dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i class="fas fa-user"></i>
                      </button>
                      <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/login">
                          Login
                        </Link>

                        <Link className="dropdown-item" to="/Register">
                          Register
                        </Link>
                      </div>
                    </div>
                  )}

                  <Link to="/cart" className="cart-mobile-icon">
                    <i className="fas fa-shopping-bag"></i>
                    <span className="badge">
                      {cartLists ? cartLists.length : " "}
                    </span>
                  </Link>
                </div>
                <div className="col-12 d-flex align-items-center">
                  <form className="input-group" onSubmit={submitHandler}>
                    <input
                      type="search"
                      className="form-control rounded search"
                      placeholder="Search"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <button type="submit" className="search-button">
                      search
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* PC HEADER */}
          <div className="pc-header">
            <div className="row">
              <div className="col-md-3 col-4 d-flex align-items-center">
                <Link className="navbar-brand" to="/">
                  <img alt="logo" src="/images/logo.png" />
                </Link>
              </div>
              <div className="col-md-6 col-8 d-flex align-items-center">
                <form className="input-group" onSubmit={submitHandler}>
                  <input
                    type="search"
                    className="form-control rounded search"
                    placeholder="Search"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button type="submit" className="search-button">
                    search
                  </button>
                </form>
              </div>
              <div className="col-md-3 d-flex align-items-center justify-content-end Login-Register">
                {userInfo ? (
                  <div className="btn-group">
                    <button
                      type="button"
                      className="name-button dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Hi, {userInfo.name}
                    </button>
                    <div className="dropdown-menu">
                      <Link className="dropdown-item" to="/profile">
                        Profile
                      </Link>

                      <Link
                        className="dropdown-item"
                        to="#"
                        onClick={logoutHandler}
                      >
                        Logout
                      </Link>
                    </div>
                  </div>
                ) : (
                  <>
                    <Link to="/Register">Register</Link>
                    <Link to="/login">Login</Link>
                  </>
                )}

                {userInfo ? (
                  <Link to="/cart">
                    <i className="fas fa-shopping-bag"></i>
                    <span className="badge">
                      {cartLists ? cartLists.length : " "}
                    </span>
                  </Link>
                ) : (
                  <Link to="/login">
                    <i className="fas fa-shopping-bag"></i>
                    <span className="badge">
                      {cartLists ? cartLists.length : " "}
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

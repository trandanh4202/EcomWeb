import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import { register } from "../Redux/Action/UserAction";
import Header from "./../components/Header";

const Register = ({ location, history }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;
  useEffect(() => {
    if (userInfo) {
      setName("");
      setPhone("");
      setEmail("");
      setPassword("");
      setconfirmPassword("");
      setSuccessMessage(userInfo.message);
    }
  }, [history, redirect, userInfo]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, phone, email, password, confirmPassword));
  };
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {error && <Message variant="alert-danger"> {error} </Message>}
        {userInfo && (
          <Message variant="alert-danger"> {userInfo.message} </Message>
        )}

        {loading && <Loading />}

        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <input
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div class="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="password-input"
            />
            <span
              className="password-toggle-icon"
              onClick={handleTogglePassword}
            >
              <i
                className={showPassword ? "fas fa-eye" : "fas fa-eye-slash"}
              ></i>
            </span>
          </div>
          <div class="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
            />
            <span
              className="password-toggle-icon"
              onClick={handleTogglePassword}
            >
              <i
                className={showPassword ? "fas fa-eye" : "fas fa-eye-slash"}
              ></i>
            </span>
          </div>

          <button type="submit">Register</button>
          <p>
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              I Have Account <strong>Login</strong>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;

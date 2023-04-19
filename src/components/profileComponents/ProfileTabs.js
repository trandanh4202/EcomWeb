import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast";
import { toast } from "react-toastify";
import { updateUserProfile } from "../../Redux/Action/UserAction";

const ProfileTabs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const toastId = React.useRef(null);
  const toastObject = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, userInfo } = userDetails;

  // const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  // const { loading: updateLoading } = userUpdateProfile;

  const dispatch = useDispatch();
  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [dispatch, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error("Password do not match", toastObject);
      }
    } else {
      dispatch(updateUserProfile({ name }));
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.success("profile updated  ", toastObject);
      }
    }
  };
  return (
    <>
      <Toast />
      {error && <Message variant="alert-danger">{error}</Message>}
      {loading && <Loading />}
      {/* {updateLoading && <Loading />} */}

      <form className="row  form-container" onSubmit={submitHandler}>
        <div className="col-md-6">
          <div className="form">
            <label for="account-fn">UserName</label>
            <input
              className="form-control"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label for="account-email">E-mail Address</label>
            <input
              className="form-control"
              type="email"
              value={email}
              disabled
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label for="account-pass">New Password</label>
            <input
              className="form-control"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label for="account-confirm-pass">Confirm Password</label>
            <input
              className="form-control"
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </div>
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </>
  );
};

export default ProfileTabs;

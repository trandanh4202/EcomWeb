import axios from "axios";
import { CART_CLEAR_ITEMS } from "../Constants/CartConstants";
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
} from "../Constants/OrderConstants";
import { logout } from "./UserAction";

//ORDER CREATE
export const createOrder =
  ({ addressId, productIds }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_CREATE_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        "/api/orders",
        { addressId, productIds },
        config
      );
      dispatch({
        type: ORDER_CREATE_SUCCESS,
        payload: data.data,
      });
      // dispatch({
      //   type: CART_CLEAR_ITEMS,
      //   payload: data,
      // });

      // localStorage.removeItem("cartItems");
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload: message,
      });
    }
  };

//ORDER DETAILS
export const getOrderDetails = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(
      `/api/orderDetails?orderId=${orderId}`,
      config
    );
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: message,
    });
  }
};

import axios from "axios";
import {
  CART_REMOVE_ITEM_FAIL,
  CART_REMOVE_ITEM_REQUEST,
  CART_REMOVE_ITEM_SUCCESS,
} from "../Constants/CartConstants";
import {
  ADD_ADDRESS_REQUEST,
  ADD_ADDRESS_SUCCESS,
  ADD_ADDRESS_FAIL,
  LIST_ADDRESS_REQUEST,
  LIST_ADDRESS_SUCCESS,
  LIST_ADDRESS_FAIL,
  GET_ADDRESS_REQUEST,
  GET_ADDRESS_SUCCESS,
  GET_ADDRESS_FAIL,
  DELETE_ADDRESS_REQUEST,
  DELETE_ADDRESS_SUCCESS,
  DELETE_ADDRESS_FAIL,
} from "../Constants/ShippingConstants";

export const saveShippingAddress =
  (province, district, ward, detail) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADD_ADDRESS_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { message } = await axios.post(
        "/api/Addresses",
        { province, district, ward, detail },
        config
      );

      const { data } = await axios.get("/api/Addresses", config);

      dispatch({
        type: ADD_ADDRESS_SUCCESS,
        payload: data.data,
      });
      // localStorage.setItem("shippingAddress", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: ADD_ADDRESS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listAddress = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: LIST_ADDRESS_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get("/api/Addresses", config);
    dispatch({
      type: LIST_ADDRESS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: LIST_ADDRESS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAddress = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_ADDRESS_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/Addresses/${id}`, config);
    dispatch({
      type: GET_ADDRESS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ADDRESS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeAddress = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_ADDRESS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { success } = await axios.delete(`/api/Addresses/${id}`, config);
    const { data } = await axios.get("/api/Addresses", config);

    dispatch({
      type: DELETE_ADDRESS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ADDRESS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

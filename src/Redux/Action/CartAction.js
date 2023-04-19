import axios from "axios";
import {
  CART_ADD_ITEM_FAIL,
  CART_ADD_ITEM_REQUEST,
  CART_ADD_ITEM_SUCCESS,
  CART_LIST_FAIL,
  CART_LIST_REQUEST,
  CART_LIST_SUCCESS,
  CART_REMOVE_ITEM,
  CART_REMOVE_ITEM_FAIL,
  CART_REMOVE_ITEM_REQUEST,
  CART_REMOVE_ITEM_SUCCESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_UPDATE_FAIL,
  CART_UPDATE_REQUEST,
  CART_UPDATE_SUCCESS,
} from "../Constants/CartConstants";

export const addToCart2 =
  (productId, quantity) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CART_ADD_ITEM_REQUEST,
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

      const { success } = await axios.post(
        `/api/CartItems`,
        { productId, quantity },
        config
      );

      const { data } = await axios.get("/api/CartItems", config);

      dispatch({
        type: CART_ADD_ITEM_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: CART_ADD_ITEM_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const removeFromCart2 = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CART_REMOVE_ITEM_REQUEST,
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

    const { data } = await axios.delete(`/api/cartItems/${id}`, config);

    dispatch({
      type: CART_REMOVE_ITEM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CART_REMOVE_ITEM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listCart = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CART_LIST_REQUEST,
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
    const { data } = await axios.get("/api/CartItems", config);
    dispatch({
      type: CART_LIST_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: CART_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//Update qty
export const updateQty =
  (productId, quantity) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CART_UPDATE_REQUEST,
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

      const { data } = await axios.put(
        `/api/CartItems/${productId}`,
        { productId, quantity },
        config
      );

      dispatch({
        type: CART_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CART_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

//SAVE PAYMENT METHOD
export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem("paymentMethod", JSON.stringify(data));
};

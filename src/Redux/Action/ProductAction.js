import axios from "axios";
import {
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_FORYOU_FAIL,
  PRODUCT_LIST_FORYOU_REQUEST,
  PRODUCT_LIST_FORYOU_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  REVIEW_LIST_FAIL,
  REVIEW_LIST_REQUEST,
  REVIEW_LIST_SUCCESS,
  VIEWS_DETAILS_FAIL,
  VIEWS_DETAILS_REQUEST,
  VIEWS_DETAILS_SUCCESS,
} from "../Constants/ProductConstants";
import { logout } from "./UserAction";

// PRODUCT LIST
export const listProduct =
  (search = "", pageId = "", categoryId, brandId) =>
  async (dispatch) => {
    try {
      dispatch({
        type: PRODUCT_LIST_REQUEST,
      });

      const { data } = await axios.get(
        `/api/Products?search=${search}&page=${pageId}&categoryId=${categoryId}&brandId=${brandId}`
      );
      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data.data.data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// SINGLE PRODUCT
export const listProductDeTails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`/api/Products/${id}`);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//product review create
export const createProductReview =
  (rating, comment, productId, orderId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${userInfo.token}`,
        },
      };

      await axios.post(
        `/api/reviews`,
        { rating, comment, productId, orderId },
        config
      );
      dispatch({ type: PRODUCT_DETAILS_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        payload: message,
      });
    }
  };

export const listReviewProduct = (productId, page) => async (dispatch) => {
  try {
    dispatch({
      type: REVIEW_LIST_REQUEST,
    });

    const { data } = await axios.get(
      `/api/Reviews?productId=${productId}&page=${page}`
    );
    dispatch({
      type: REVIEW_LIST_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: REVIEW_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listProductForYou = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_LIST_FORYOU_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/Products/Foryou`, config);
    dispatch({
      type: PRODUCT_LIST_FORYOU_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FORYOU_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const views = (productId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: VIEWS_DETAILS_REQUEST,
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
    const { message } = await axios.post(
      `/api/Views?productId=${productId}`,
      { productId },
      config
    );
    dispatch({
      type: VIEWS_DETAILS_SUCCESS,
      payload: message,
    });
  } catch (error) {
    dispatch({
      type: VIEWS_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

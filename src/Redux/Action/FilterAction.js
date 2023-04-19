import axios from "axios";
import {
  BRAND_LIST_FAIL,
  BRAND_LIST_REQUEST,
  BRAND_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
} from "../Constants/FilterConstants";

export const listCategories = () => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_LIST_REQUEST });

    const { data } = await axios.get("/api/Categories");

    dispatch({
      type: CATEGORY_LIST_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listBrands = () => async (dispatch) => {
  try {
    dispatch({ type: BRAND_LIST_REQUEST });

    const { data } = await axios.get("/api/brands");

    dispatch({
      type: BRAND_LIST_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: BRAND_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

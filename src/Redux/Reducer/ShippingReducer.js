import axios from "axios";
import { CART_REMOVE_ITEM_REQUEST } from "../Constants/CartConstants";
import {
  ADD_ADDRESS_FAIL,
  ADD_ADDRESS_REQUEST,
  ADD_ADDRESS_SUCCESS,
  DELETE_ADDRESS_FAIL,
  DELETE_ADDRESS_REQUEST,
  DELETE_ADDRESS_SUCCESS,
  GET_ADDRESS_FAIL,
  GET_ADDRESS_REQUEST,
  GET_ADDRESS_SUCCESS,
  LIST_ADDRESS_FAIL,
  LIST_ADDRESS_REQUEST,
  LIST_ADDRESS_SUCCESS,
} from "../Constants/ShippingConstants";

export const addressReducer = (state = { shippingAddress: [] }, action) => {
  switch (action.type) {
    case LIST_ADDRESS_REQUEST:
      return { ...state, loading: true };
    case LIST_ADDRESS_SUCCESS:
      return { loading: false, shippingAddress: action.payload };
    case LIST_ADDRESS_FAIL:
      return { loading: false, error: action.payload };

    case ADD_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_ADDRESS_SUCCESS:
      return {
        loading: false,
        shippingAddress: action.payload,
      };
    case ADD_ADDRESS_FAIL:
      return {
        loading: false,
        shippingAddress: [],
        ...state,
      };
    case DELETE_ADDRESS_REQUEST:
      return { ...state, loading: true };
    case DELETE_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        shippingAddress: state.shippingAddress.filter(
          (x) => x.id !== action.payload.data
        ),
      };
    case DELETE_ADDRESS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const addressDetailReducer = (
  state = { addressDetails: {} },
  action
) => {
  switch (action.type) {
    case GET_ADDRESS_REQUEST:
      return { ...state, loading: true };
    case GET_ADDRESS_SUCCESS:
      return { loading: false, addressDetails: action.payload };
    case GET_ADDRESS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

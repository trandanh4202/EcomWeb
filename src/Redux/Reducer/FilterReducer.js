import {
  BRAND_LIST_FAIL,
  BRAND_LIST_REQUEST,
  BRAND_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
} from "../Constants/FilterConstants";

//create order
export const categoryListReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { loading: true, categories: [] };
    case CATEGORY_LIST_SUCCESS:
      return { loading: false, categories: action.payload };
    case CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const brandListReducer = (state = { brands: [] }, action) => {
  switch (action.type) {
    case BRAND_LIST_REQUEST:
      return { loading: true, brands: [] };
    case BRAND_LIST_SUCCESS:
      return { loading: false, brands: action.payload };
    case BRAND_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

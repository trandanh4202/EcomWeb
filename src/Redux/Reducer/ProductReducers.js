import {
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_FORYOU_FAIL,
  PRODUCT_LIST_FORYOU_REQUEST,
  PRODUCT_LIST_FORYOU_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  REVIEW_CHECKED_FAIL,
  REVIEW_CHECKED_REQUEST,
  REVIEW_CHECKED_SUCCESS,
  REVIEW_LIST_FAIL,
  REVIEW_LIST_REQUEST,
  REVIEW_LIST_SUCCESS,
  VIEWS_DETAILS_FAIL,
  VIEWS_DETAILS_REQUEST,
  VIEWS_DETAILS_SUCCESS,
} from "../Constants/ProductConstants";

//PRODUCT LIST
export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        page: action.payload.pagination.currentPage,
        pageTotal: action.payload.pagination.totalPage,
        products: action.payload.products,
      };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//SINGLE PRODUCT
export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//product create review
export const productCreateReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

export const reviewCheckedReducer = (state = { review: [] }, action) => {
  switch (action.type) {
    case REVIEW_CHECKED_REQUEST:
      return { loading: true };
    case REVIEW_CHECKED_SUCCESS:
      return {
        loading: false,
        reviews: action.payload,
      };
    case REVIEW_CHECKED_FAIL:
      return { loading: false, error1: action.payload };
    default:
      return state;
  }
};

export const reviewListReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case REVIEW_LIST_REQUEST:
      return { loading: true };
    case REVIEW_LIST_SUCCESS:
      return {
        loading: false,
        page: action.payload.pagination.currentPage,
        pageTotal: action.payload.pagination.totalPage,
        reviews: action.payload.reviews,
      };
    case REVIEW_LIST_FAIL:
      return { loading: false, error1: action.payload };
    default:
      return state;
  }
};

export const productListForYouReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_FORYOU_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_FORYOU_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case PRODUCT_LIST_FORYOU_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const viewsReducer = (state = {}, action) => {
  switch (action.type) {
    case VIEWS_DETAILS_REQUEST:
      return { loading: true };
    case VIEWS_DETAILS_SUCCESS:
      return { loading: false, statae: action.payload };
    case VIEWS_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

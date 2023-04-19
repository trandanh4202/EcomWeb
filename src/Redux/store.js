import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productCreateReviewReducer,
  productDetailsReducer,
  productListReducer,
} from "./Reducer/ProductReducers";
import {
  cartListReducer,
  cartReducer,
  cartReducer2,
  cartRemoveReducer,
  cartUpdateReducer,
} from "./Reducer/CartReducer";
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from "./Reducer/UserReducer";
import { orderCreateReducer, orderDetailsReducer } from "./Reducer/OrderReduce";
import {
  addressDetailReducer,
  addressReducer,
} from "./Reducer/ShippingReducer";
import { brandListReducer, categoryListReducer } from "./Reducer/FilterReducer";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productReviewCreate: productCreateReviewReducer,
  // cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  // userUpdateProfile: userUpdateProfileReducer,

  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  address: addressReducer,
  addressDetail: addressDetailReducer,

  cartList: cartListReducer,

  brandList: brandListReducer,
  categoryList: categoryListReducer,
});

const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

//login
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// //shippingAddress
// const shippingAddressFromLocalStorage = localStorage.getItem("shippingAddress")
//   ? JSON.parse(localStorage.getItem("shippingAddress"))
//   : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromLocalStorage,
  },
  userLogin: { userInfo: userInfoFromLocalStorage },
  // address: {
  //   shippingAddress: shippingAddressFromLocalStorage,
  // },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

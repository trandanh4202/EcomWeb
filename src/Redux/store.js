import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productCreateReviewReducer,
  productDetailsReducer,
  productListForYouReducer,
  productListReducer,
  reviewCheckedReducer,
  reviewListReducer,
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
import {
  orderCreateReducer,
  orderDataReducer,
  orderDetailsReducer,
  orderListReducer,
  orderPayReducer,
} from "./Reducer/OrderReduce";
import {
  addressDetailReducer,
  addressReducer,
} from "./Reducer/ShippingReducer";
import { brandListReducer, categoryListReducer } from "./Reducer/FilterReducer";

const reducer = combineReducers({
  productList: productListReducer,
  brandList: brandListReducer,
  categoryList: categoryListReducer,
  productDetails: productDetailsReducer,
  productReviewCreate: productCreateReviewReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderData: orderDataReducer,
  address: addressReducer,
  addressDetail: addressDetailReducer,
  cartList: cartListReducer,
  orderList: orderListReducer,
  orderPay: orderPayReducer,
  reviewList: reviewListReducer,
  reviewChecked: reviewCheckedReducer,
  productListForYou: productListForYouReducer,
});

const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

// login
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// shippingAddress
const shippingAddressFromLocalStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const paymentMethodLocalstorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : {};

const initialState = {
  cartList: {
    shippingAddress: shippingAddressFromLocalStorage,
    paymentMethod: paymentMethodLocalstorage,
  },
  userLogin: { userInfo: userInfoFromLocalStorage },
  orderData: {
    paymentMethod: paymentMethodLocalstorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

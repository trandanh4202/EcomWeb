import {
  CART_ADD_ITEM,
  CART_ADD_ITEM_FAIL,
  CART_ADD_ITEM_REQUEST,
  CART_ADD_ITEM_SUCCESS,
  CART_CLEAR_ITEMS,
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
  DECREMENT_QUANTITY,
  INCREMENT_QUANTITY,
} from "../Constants/CartConstants";

export const cartListReducer = (state = { cartLists: [] }, action) => {
  switch (action.type) {
    case CART_LIST_REQUEST:
      return { loading: true, ...state, cartLists: [] };
    case CART_LIST_SUCCESS:
      return { loading: false, ...state, cartLists: action.payload };
    case CART_LIST_FAIL:
      return { loading: false, error: action.payload };

    case CART_REMOVE_ITEM_REQUEST:
      return { ...state, loading: true };
    case CART_REMOVE_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        cartLists: action.payload,
      };
    case CART_REMOVE_ITEM_FAIL:
      return { ...state, loading: false, error: action.payload };

    case CART_UPDATE_REQUEST:
      return { ...state, loading: true };
    case CART_UPDATE_SUCCESS:
      const updatedCartItems = state.cartLists.map((item) =>
        item.productId === action.payload.data.productId
          ? { ...item, quantity: action.payload.data.quantity }
          : item
      );
      return { loading: false, success: true, cartLists: updatedCartItems };
    case CART_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };

    case CART_ADD_ITEM_REQUEST:
      return { loading: true, ...state };
    case CART_ADD_ITEM_SUCCESS:
      return { loading: false, cartLists: action.payload };
    case CART_ADD_ITEM_FAIL:
      return { loading: false, error: action.payload, ...state };
    default:
      return state;
  }
};

// export const cartReducer2 = (state = { cartItems2: [] }, action) => {
//   switch (action.type) {
//     case CART_ADD_ITEM_REQUEST:
//       return { loading: true, ...state };
//     case CART_ADD_ITEM_SUCCESS:
//       const item = action.payload;
//       const product = state.cartItems2.find(
//         (x) => x.productId === item.productId
//       );
//       if (product) {
//         return {
//           loading: false,
//           cartItems2: state.cartItems2.map((x) =>
//             x.productId === product.productId ? item : x
//           ),
//         };
//       } else {
//         return {
//           ...state,
//           loading: false,
//           cartItems2: [...state.cartItems2, item],
//         };
//       }
//     case CART_ADD_ITEM_FAIL:
//       return { loading: false, error: action.payload, ...state };
//     default:
//       return state;
//   }
// };

// export const cartUpdateReducer = (state = { cartItems: [] }, action) => {
//   switch (action.type) {
//     case CART_UPDATE_REQUEST:
//       return { loading: true };
//     case CART_UPDATE_SUCCESS:
//       const updatedCartItems = state.cartItems.map((item) =>
//         item.product === action.payload.product
//           ? { ...item, quantity: action.payload.quantity }
//           : item
//       );
//       return { loading: false, success: true, cartItems: updatedCartItems };
//     case CART_UPDATE_FAIL:
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

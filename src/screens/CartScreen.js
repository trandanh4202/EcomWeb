import React, { useEffect, useState } from "react";
import Header from "./../components/Header";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart2,
  listCart,
  removeFromCart2,
  updateQty,
} from "../Redux/Action/CartAction";
import { listProductDeTails } from "../Redux/Action/ProductAction";

const CartScreen = ({ match, location, history }) => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();

  const removeFromCartHandle = (id) => {
    dispatch(removeFromCart2(id));
  };

  useEffect(() => {
    dispatch(listCart());
  }, [dispatch]);

  const cartList = useSelector((state) => state.cartList);
  const { cartLists } = cartList;

  const checkOutHandler = () => {
    history.push("/login?redirect=shipping");
  };
  const handleQtyChange = (id, newQty) => {
    const item = cartLists.find((item) => item.product.id === id);
    if (item) {
      if (newQty > item.product.quantity) {
        // Nếu `newQty` vượt quá số lượng sản phẩm hiện có, cập nhật `newQty` bằng số lượng sản phẩm hiện có.
        newQty = item.product.quantity;
      }
      dispatch(updateQty(id, newQty));
    }
  };

  const total = cartLists.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.quantity * currentValue.product.price;
  }, 0);

  return (
    <>
      <Header />
      {/* Cart */}
      <div className="container">
        {cartLists.length === 0 ? (
          <div className=" alert alert-info text-center mt-3">
            Your cart is empty
            <Link
              className="btn btn-success mx-5 px-5 py-3"
              to="/"
              style={{
                fontSize: "12px",
              }}
            >
              SHOPPING NOW
            </Link>
          </div>
        ) : (
          <>
            <div className=" alert alert-info text-center mt-3">
              Total Cart cartLists
              <Link className="text-success mx-2" to="/cart">
                ({cartLists.length})
              </Link>
            </div>
            {/* cartiterm */}
            {cartLists.map((item) => (
              <div className="cart-iterm row">
                <div
                  onClick={() => removeFromCartHandle(item.product.id)}
                  className="remove-button d-flex justify-content-center align-items-center"
                >
                  <i className="fas fa-times"></i>
                </div>
                <div className="cart-image col-md-3">
                  <img src={item.product.imageUrl} alt={item.product.name} />
                </div>
                <div className="cart-text col-md-5 d-flex align-items-center">
                  <Link to={`/products/${item.product.id}`}>
                    <h4>{item.product.name}</h4>
                  </Link>
                </div>
                <div className="cart-qty col-md-2 col-sm-5 mt-md-5 mt-3 mt-md-0 d-flex flex-column  align-items-center">
                  <h6>QUANTITY</h6>
                  <div className="d-flex">
                    <button
                      onClick={() =>
                        handleQtyChange(item.product.id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <input
                      value={item.quantity}
                      onChange={(e) =>
                        handleQtyChange(item.product.id, e.target.value)
                      }
                      className=" justify-content-center align-items-center text-center input-width "
                    />
                    <button
                      onClick={() =>
                        handleQtyChange(item.product.id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="cart-price mt-3 mt-md-0 col-md-2 align-items-sm-end align-items-start  d-flex flex-column justify-content-center col-sm-7">
                  <h6>Price</h6>
                  <h4>${item.product.price}</h4>
                </div>
              </div>
            ))}

            {/* End of cart iterms */}
            <div className="total">
              <span className="sub">total:</span>
              <span className="total-price">{total}</span>
            </div>
            <hr />
            <div className="cart-buttons d-flex align-items-center row">
              <Link to="/" className="col-md-6 ">
                <button>Continue To Shopping</button>
              </Link>
              {total > 0 && (
                <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
                  <button onClick={checkOutHandler}>Checkout</button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartScreen;

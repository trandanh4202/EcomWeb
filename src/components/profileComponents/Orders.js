import moment from "moment";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrderDetails } from "../../Redux/Action/OrderAction";
import { createProductReview } from "../../Redux/Action/ProductAction";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const Orders = (props) => {
  const { loading, error, orders } = props;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { orderDetail } = orderDetails;
  const dispatch = useDispatch();

  const [ratings, setRatings] = useState({});
  const [comments, setComments] = useState({});

  const handleRatingChange = (value, productId) => {
    setRatings({ ...ratings, [productId]: value });
  };

  const handleCommentChange = (event, productId) => {
    setComments({ ...comments, [productId]: event.target.value });
  };
  const getOrderDetail = (orderId) => {
    dispatch(getOrderDetails(orderId));
  };
  const handleSubmit = (productId, orderId) => {
    const rating = ratings[productId] || 0;
    const comment = comments[productId] || "";
    console.log(rating, comment, productId, orderId);
    dispatch(createProductReview(rating, comment, productId, orderId));
  };

  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Review Products in Order
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {orderDetail && orderDetail.cartItems && (
                <>
                  {orderDetail.cartItems.map((item) => (
                    <div className="row my-3" key={item.product.id}>
                      <div className="col-4">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="img-fluid rounded"
                        />
                      </div>
                      <div className="col-8">
                        <h4>{item.product.name}</h4>
                        <div>
                          {[...Array(5)].map((_, i) => (
                            <i
                              key={i}
                              className={`far fa-star ${
                                i < ratings[item.product.id]
                                  ? "text-warning"
                                  : ""
                              }`}
                              style={{
                                fontSize: "24px",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                handleRatingChange(i + 1, item.product.id)
                              }
                            ></i>
                          ))}
                        </div>
                        <div className="mt-3">
                          <textarea
                            className="form-control"
                            rows="5"
                            placeholder="Write your review here..."
                            value={comments[item.product.id] || ""}
                            onChange={(e) =>
                              handleCommentChange(e, item.product.id)
                            }
                          />
                        </div>
                      </div>
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          handleSubmit(item.product.id, orderDetail.orderId)
                        }
                      >
                        Submit Review
                      </button>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className=" d-flex justify-content-center align-items-center flex-column">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            {orders.length === 0 ? (
              <div className="col-12 alert alert-info text-center mt-3">
                No Orders
                <Link
                  className="btn btn-success mx-2 px-3 py-2"
                  to="/"
                  style={{
                    fontSize: "12px",
                  }}
                >
                  START SHOPPING
                </Link>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>STATUS</th>
                      <th>DATE</th>
                      <th>TOTAL</th>
                      <th>Review</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr
                        className={`${
                          order.isPaid ? "alert-success" : "alert-danger"
                        }`}
                        key={order.id}
                      >
                        <td>
                          <a href={`/order/${order.id}`} className="link">
                            {order.id}
                          </a>
                        </td>
                        <td>
                          {order.paidAt === null ? <>Not Paid</> : <> Paid</>}
                        </td>
                        <td>
                          {order.paidAt === null
                            ? moment(order.date).calendar()
                            : moment(order.paidAt).calendar()}
                        </td>
                        <td>${order.total}</td>
                        <td>
                          {order.paidAt !== null ? (
                            <button
                              type="button"
                              className="btn btn-primary mb-3"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                              onClick={() => getOrderDetail(order.id)}
                            >
                              Review
                            </button>
                          ) : (
                            ""
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Orders;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listProduct,
  listProductForYou,
} from "../../Redux/Action/ProductAction";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import product from "../../data/Products";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

const ProductRecommendations = () => {
  const dispatch = useDispatch();
  const productListForYou = useSelector((state) => state.productListForYou);
  const { products } = productListForYou;

  useEffect(() => {
    dispatch(listProductForYou());
  }, [dispatch]);

  const [productPriceA, setProductPriceA] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("api/Products?pageSize=1");
        const {
          data: {
            data: { products },
          },
        } = await response.json();
        setProductPriceA(products);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className="container seagame-banner">
        <img src="https://cdn2.cellphones.com.vn/1200x75,webp,q100/https://dashboard.cellphones.com.vn/storage/seagame-banner-special-desk.png" />
      </div>

      <div
        className="container my-5 "
        style={{
          backgroundColor: "rgb(249 207 83)",
          borderRadius: "10px",
          padding: "20px",
        }}
      >
        <div className="container seagame-banner">
          <img src="https://cdn2.cellphones.com.vn/600x,webp/media/wysiwyg/hst.png" />
        </div>
        <Slider {...settings}>
          {productPriceA &&
            productPriceA.map((product) => (
              <div key={product.id} className="card h-100">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="card-img-top "
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{`$${product.price}`}</p>
                  <Link
                    to={`/products/${product.id}`}
                    className="btn btn-primary"
                  >
                    View Product
                  </Link>
                </div>
              </div>
            ))}
        </Slider>
      </div>
      <div
        className="container my-5 rcm-product "
        style={{ borderRadius: "10px" }}
      >
        <h3 className="mb-4 text-center">Recommended Products</h3>
        <Slider {...settings}>
          {products &&
            products.map((product) => (
              <div key={product.id} className="card h-100">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="card-img-top "
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{`$${product.price}`}</p>
                  <Link
                    to={`/products/${product.id}`}
                    className="btn btn-primary"
                  >
                    View Product
                  </Link>
                </div>
              </div>
            ))}
        </Slider>
      </div>
    </>
  );
};

export default ProductRecommendations;

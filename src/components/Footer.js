import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <div class="container">
        <div class="row">
          <div class="col-md-6 col-lg-3">
            <h5>Chăm sóc khách hàng</h5>
            <ul class="list-unstyled">
              <li>
                <a href="#" className="footer-item__link">
                  Trung tâm trợ giúp
                </a>
              </li>
              <li>
                <a href="#" className="footer-item__link">
                  Điều khoản sử dụng
                </a>
              </li>
              <li>
                <a href="#" className="footer-item__link">
                  Quy định đổi trả
                </a>
              </li>
            </ul>
          </div>
          <div class="col-md-6 col-lg-3">
            <h5>Giới thiệu</h5>
            <ul class="list-unstyled">
              <li>
                <a href="#" className="footer-item__link">
                  Về chúng tôi
                </a>
              </li>
              <li>
                <a href="#" className="footer-item__link">
                  Liên hệ
                </a>
              </li>
              <li>
                <a href="#" className="footer-item__link">
                  Tin tức
                </a>
              </li>
            </ul>
          </div>
          <div class="col-md-6 col-lg-3">
            <h5>Địa chỉ</h5>
            <p>123 đường ABC, Quận XYZ, TP.HCM</p>
            <p>Điện thoại: 0123456789</p>
            <p>Email: example@example.com</p>
          </div>
          <div className="d-flex flex-column col-md-6 col-lg-3">
            <div className="card-name">
              <img
                alt="mastercard"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/1200px-MasterCard_Logo.svg.png"
              />
            </div>
            <div className="card-name">
              <img
                alt="visa"
                src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
              />
            </div>
            <div className="card-name">
              <img
                alt="paypal"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/2560px-PayPal.svg.png"
              />
            </div>
            <div className="card-name">
              <img
                alt="express"
                src="https://icons.iconarchive.com/icons/designbolts/credit-card-payment/256/American-Express-icon.png"
              />
            </div>
            <div className="card-name">
              <img
                alt="discover"
                src="https://icons-for-free.com/iconfiles/png/512/cash+checkout+discover+network+online+shopping+payment+method-1320191225548835050.png"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

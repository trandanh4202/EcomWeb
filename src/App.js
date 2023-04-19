import React from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import SingleProduct from "./screens/SingleProduct";
import Login from "./screens/Login";
import Register from "./screens/Register";
import CartScreen from "./screens/CartScreen";
import ShippingScreen from "./screens/ShippingScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import NotFound from "./screens/NotFound";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={HomeScreen} exact />
        <Route path="/search/:search" component={HomeScreen} exact />
        <Route path="/page/:currentPage" component={HomeScreen} exact />
        <Route path="/brands/:brandId" component={HomeScreen} exact />
        <Route path="/categories/:categoryId" component={HomeScreen} exact />
        <Route
          path="/search/:search/page/:currentPage"
          component={HomeScreen}
          exact
        />
        <Route
          path="/search/:search/categories/:categoryId"
          component={HomeScreen}
          exact
        />
        <Route
          path="/search/:search/page/:currentPage/categories/:categoryId"
          component={HomeScreen}
          exact
        />
        <Route
          path="/search/:search/brands/:brandId"
          component={HomeScreen}
          exact
        />
        <Route
          path="/search/:search/page/:currentPage/brands/:brandId"
          component={HomeScreen}
          exact
        />
        <Route
          path="/page/:currentPage/categories/:categoryId/brands/:brandId"
          component={HomeScreen}
          exact
        />
        <Route
          path="/search/:search/page/:currentPage/categories/:categoryId/brands/:brandId"
          component={HomeScreen}
          exact
        />
        <Route
          path="/search=:search/page/:currentPage/categories/:categoryId/brands/:brandId"
          component={HomeScreen}
          exact
        />
        <Route
          path="/search"
          render={({ location }) => {
            const searchParams = new URLSearchParams(location.search);
            const search = searchParams.get("search");
            const page = searchParams.get("page");
            const categoryId = searchParams.get("categoryId");
            const brandId = searchParams.get("brandId");

            return (
              <HomeScreen
                search={search}
                page={page}
                categoryId={categoryId}
                brandId={brandId}
              />
            );
          }}
        />

        <Route path="/products/:id" component={SingleProduct} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/profile" component={ProfileScreen} />
        <Route path="/cart/:id?" component={CartScreen} />
        <Route path="/shipping" component={ShippingScreen} />
        <Route path="/payment" component={PaymentScreen} />
        <Route path="/placeorder" component={PlaceOrderScreen} />
        <Route path="/order/:id" component={OrderScreen} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;

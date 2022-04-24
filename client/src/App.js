import "./Css/app.scss";
import Shoes from "./Components/Shoes";
import {Route, Routes} from "react-router-dom";
import NotFound from "./Components/NotFound";
import NavBar from "./Components/NavBar";
import LandingPage from "./Components/LandingPage";
import Details from "./Components/Details";
import Footer from "./Components/Footer";
import Login from "./Components/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import AdminPandO from "./Components/Admin/AdminPandO";
import AdminProducts from "./Components/Admin/AdminProducts";
import AdminCustomers from "./Components/Admin/AdminCustomers";
import AdminOrderDetail from "./Components/Admin/AdminOrderDetail";
import ClosedSideBarAdmin from "./Components/Admin/ClosedSideBarAdmin";
import AdminNav from "./Components/Admin/AdminNav";
import Cart from "./Components/Cart";
import UserProfile from "./Components/UserProfile";

function App() {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={[<NavBar key={"nav"} />, <LandingPage key={"landing"} />]}
      />
      <Route
        exact
        path="/home"
        element={[
          <NavBar key={"nav"} />,
          <Shoes key={"shoes"} />,
          <Footer key={"footer"} />,
        ]}
      />
      <Route
        exact
        path="home/:id/:model"
        element={[
          <NavBar key={"nav"} />,
          <Details key={"details"} />,
          <Footer key={"footer"} />,
        ]}
      />
      <Route
        exact
        path="home/cart"
        element={[
          <NavBar key={"nav"} />,
          <Cart key={"cart"} />,
          <Footer key={"footer"} />,
        ]}
      />
      <Route
        exact
        path="home/admin/dashboard"
        element={[
          <AdminNav section="Dashboard" key={"adminNav"} />,
          <ClosedSideBarAdmin key={"adminCloseSide"} />,
          <AdminDashboard key={"adminDashboard"} />,
        ]}
      />
      <Route
        exact
        path="home/admin/products"
        element={[
          <AdminNav section="Products" key={"adminNav"} />,
          <ClosedSideBarAdmin key={"adminCloseSide"} />,
          <AdminProducts key={"adminProducts"} />,
        ]}
      />
      <Route
        exact
        path="home/admin/customers"
        element={[
          <AdminNav section="Customers" key={"adminNav"} />,
          <ClosedSideBarAdmin key={"adminDashboard"} />,
          <AdminCustomers key={"adminCustomers"} />,
        ]}
      />
      <Route
        exact
        path="home/admin/orders"
        element={[
          <AdminPandO key={"adminPando"} />,
          <ClosedSideBarAdmin key={"adminDashboard"} />,
          <AdminNav section="Purchases and Orders" key={"adminNav"} />,
        ]}
      />
      <Route
        exact
        path="home/admin/order/:order"
        element={[
          <AdminOrderDetail key={"adminOrderDetail"} />,
          <AdminNav section="Customers" key={"adminNav"} />,
          <ClosedSideBarAdmin key={"adminDashboard"} />,
        ]}
      />

      <Route
        exact
        path="home/login"
        element={[
          <NavBar key={"nav"} />,
          <Login key={"login"} />,
          <Footer key={"footer"} />,
        ]}
      />

      <Route
        exact
        path="home/profile"
        element={[
          <NavBar key={"nav"} />,
          <UserProfile key={"profile"} />,
          <Footer key={"footer"} />,
        ]}
      />

      <Route path="*" exact={true} element={<NotFound />} />
    </Routes>
  );
}

export default App;

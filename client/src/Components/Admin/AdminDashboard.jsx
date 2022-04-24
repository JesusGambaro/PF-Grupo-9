import "../../Css/AdminDashboard.css";
import React from "react";
import bringAllData from "../../redux/actions/bringAllData";
import ClosedSideBarAdmin from "./ClosedSideBarAdmin";
import AdminNav from "./AdminNav";
import {useEffect} from "react";
import { useNavigate, NavLink } from "react-router-dom"
import {useSelector, useDispatch} from "react-redux";
import { getAllOrders, getLastSevenDaysOrders } from "../../redux/actions/ordersAdmin";
import { roleUser } from "../../redux/actions/Loginregister";

export default function AdminDashboard() {
  const { role } = useSelector(store => store.root)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shoes = useSelector((state) => state.admin.allData.length);
  useEffect(() => {
    if (!shoes.length) dispatch(bringAllData(true));
    if (window.localStorage.getItem("token")) {
      const token = window.localStorage.getItem("token")
      dispatch(roleUser(token))
      if (role.admin) {
        navigate("/home/admin/dashboard")
        dispatch(getLastSevenDaysOrders(token))
        dispatch(getAllOrders(token))
      }
      else if (role.admin===false) {
        navigate("/home")
      }
    }

  }, []);
  const allOrders = useSelector(state=>state.admin.allOrders.length)
  const lastestOrders = useSelector((state)=> state.admin.lastOrders)
  console.log('aqui',lastestOrders)

  return (
    <div className="admin-container">
      <div className="dashboard-container">
        <div className="totals">
          <div className="total-card">
            <i className="bi bi-piggy-bank itemL-dash"></i>
            <h5 className="card-text">Total Sales</h5>
            <p>$0</p>
          </div>
          <div className="total-card">
            <i className="bi bi-truck itemL-dash"></i>
            <h5 className="card-text">Total Orders</h5>
            <p>0</p>
          </div>
          <div className="total-card">
            <i className="bi bi-cart2 itemL-dash"></i>
            <h5 className="card-text">Total Products</h5>
            <p>{shoes}</p>
          </div>
        </div>
        <div className="lastest-orders-card">
          <div className="lastest-orders-body-card">
            <h3 className="t-title">Latest orders</h3>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Total</th>
                  <th scope="col">Status</th>
                  <th scope="col">Date</th>
                  <th scope="col" className="text-end">
                    {" "}
                    Action{" "}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>ID order</td>
                  <td>
                    <b>Customer name</b>
                  </td>
                  <td>email@example.com</td>
                  <td>$778.35</td>
                  <td>
                    <span className="badge rounded-pill alert-success">
                      status
                    </span>
                  </td>
                  <td>07.05.2020</td>
                  <td className="text-end">
                    <a href="#" className="btn btn-light">
                      Detail
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

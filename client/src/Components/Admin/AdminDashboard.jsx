import "../../Css/AdminDashboard.css";
import React from "react";
import bringAllData from "../../redux/actions/bringAllData";
import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import "../../Css/AdminDashboard.css";
import {useNavigate, NavLink} from "react-router-dom";

import {
  getAllGain,
  getAllOrders,
  getLastSevenDaysOrders,
} from "../../redux/actions/ordersAdmin";
import {roleUser} from "../../redux/actions/Loginregister";

export default function AdminDashboard() {
  const {role} = useSelector((store) => store.root);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shoes = useSelector((state) => state.admin.allData.length);

  useEffect(() => {
    if (!shoes.length) dispatch(bringAllData(true));
    if (window.localStorage.getItem("token")) {
      const token = window.localStorage.getItem("token");
      dispatch(roleUser(token));
      if (role.admin) {
        dispatch(getLastSevenDaysOrders(token));
        dispatch(getAllOrders(token));
        dispatch(getAllGain(token));
        navigate("/home/admin/dashboard");
      } else if (role.admin === false) {
        navigate("/home");
      }
    }
  }, [dispatch, navigate, role.admin, shoes.length]);
  const allOrders = useSelector((state) => state.admin.allOrders.length);
  const lastestOrders = useSelector((state) => state.admin.lastOrders);
  const gain = useSelector((state) => state.admin.gain[0]);

  return (
    <div className="admin-container">
      <div className="dashboard-container">
        <div className="totals">
          <div className="total-card">
            <i className="bi bi-piggy-bank itemL-dash"></i>
            <h5 className="card-text">Total Sales</h5>
            <p>$ {gain && gain.totalGain}</p>
          </div>
          <div className="total-card">
            <i className="bi bi-truck itemL-dash"></i>
            <h5 className="card-text">Total Orders</h5>
            <p>{allOrders}</p>
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
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {lastestOrders.map((e) => {
                  /* {id: 1, delivered: false, address: 'AvenidaSiempreViva 123', telephoneNum: 12345678, createdAt: '2022-04-22T19:10:45.570Z', …}
                   */
                  return (
                    <tr key={e.id}>
                      <td>
                        {e.id} {/* ID order */}
                      </td>
                      <td>
                        <b>
                         
                          {e.name} {e.surname} {/* Customer name */}
                        </b>
                      </td>
                      <td>
                      {e.user.email?e.user.email:'No ha sido suministrado'}
                        {/* email@example.com */}
                      </td>
                      <td>
                        ${e.total} {/* total */}
                      </td>
                      <td>
                        <span className="badge rounded-pill alert-success">
                          {e.delivered} {/* status */}
                        </span>
                      </td>
                      <td>
                        {e.createdAt.slice(0, 10)} {/* date */}
                      </td>
                      <td className="text-end">
                        <NavLink
                          to={`/home/admin/order/${e.id}`}
                          className="btn btn-light detalle"
                        >
                          Detail
                        </NavLink>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

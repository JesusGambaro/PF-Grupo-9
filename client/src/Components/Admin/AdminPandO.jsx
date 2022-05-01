
import "../../Css/AdminPandO.css";
import {useEffect, useState} from "react";
import {useNavigate, NavLink} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {getAllOrders, getOrderByStatus, updateOrder} from "../../redux/actions/ordersAdmin";
import {roleUser} from "../../redux/actions/Loginregister";
import {getOrderByEmail} from "../../redux/actions/ordersAdmin";
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";

export default function AdminPandO() {
  const {role} = useSelector((store) => store.root);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [order, setOrder] = useState("");

  const [dropDown, setDropDown] = useState(false);
  function abrirYcerrar() {
    setDropDown(!dropDown);
  }

  var token1 = window.localStorage.getItem("token");
  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      const token = window.localStorage.getItem("token");
      dispatch(roleUser(token));
      if (role.admin) {
        dispatch(getAllOrders(token));
      } else if (role.admin === false) {
        navigate("/home");
      }
    }
  }, [dispatch, navigate, role.admin]);
  function handleChange(e) {
    e.preventDefault();
    setOrder(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();

    dispatch(getOrderByEmail(token1, order));
  }
  function handleStatusFilter(e) {
    e.preventDefault();
    dispatch(getOrderByStatus(token1, e.target.value));
  }
  const allOrders = useSelector((state) => state.admin.allOrders);
  return (
    <div className="admin-container">
      <div className="orders-card">
        <div className="lastest-orders-body-card">
          <div className="title-and-search">
            <h3 className="t-title">Orders</h3>
            <form className=" col-md-6 admin-search">
              <input
                type="text"
                placeholder="Search..."
                className="form-control-admin"
                onChange={(e) => handleChange(e)}
              ></input>
              <button
                type="submit"
                className="submit-admin"
                onClick={(e) => handleSubmit(e)}
              >
                <i className="bi bi-search search-admin"></i>
              </button>
            </form>
            <Dropdown isOpen={dropDown} toggle={abrirYcerrar}>
              <DropdownToggle caret className="admin-drop">
                Status
              </DropdownToggle>
              <DropdownMenu>
              <DropdownItem
                  value=""
                  onClick={(e) => handleStatusFilter(e)}
                >
                  All
                </DropdownItem>
                <DropdownItem
                  value="undelivered"
                  onClick={(e) => handleStatusFilter(e)}
                >
                  undelivered
                </DropdownItem>
                <DropdownItem
                  value="delivered"
                  onClick={(e) => handleStatusFilter(e)}
                >
                  delivered
                </DropdownItem>
                <DropdownItem
                  value="completed"
                  onClick={(e) => handleStatusFilter(e)}
                >
                  completed
                </DropdownItem>
                <DropdownItem
                  value="canceled"
                  onClick={(e) => handleStatusFilter(e)}
                >
                  canceled
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

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
              {allOrders.length? allOrders.map((e) => {
                return (
                  <tr key={e.id}>
                    <td>
                      {e.id&&e.id} {/* ID order */}
                    </td>
                    <td>
                      <b>
                        {e.name&&e.name} {e.surname&&e.surname} {/* Customer name */}
                      </b>
                    </td>
                    <td>
                      {e.user.email?e.user.email:'No ha sido suministrado'}
                      {/* email@example.com */}
                    </td>
                    <td>
                      ${e.total&&e.total} {/* total */}
                    </td>
                    <td>
                      <span className="badge rounded-pill alert-success">
                        {e.delivered&&e.delivered} {/* status */}
                      </span>
                    </td>
                    <td>
                      {e.createdAt&&e.createdAt.slice(0, 10)} {/* date */}
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
              }):
              /* si no coincide ninguna */
              <tr >
                    <td>
                    No results
                       {/* ID order */}
                    </td>
                    <td>
                      <b>
                         {/* Customer name */}
                      </b>
                    </td>
                    <td>
                      
                      {/* email@example.com */}
                    </td>
                    <td>
                       {/* total */}
                    </td>
                    <td>
                      <span className="badge rounded-pill alert-success">
                         {/* status */}
                      </span>
                    </td>
                    <td>
                       {/* date */}
                    </td>
                    <td className="text-end">
                      
                    </td>
                  </tr>
              }
            </tbody>
          </table>
          {/* =======
import "../../Css/AdminPandO.css";
import React from "react";
import ClosedSideBarAdmin from "./ClosedSideBarAdmin";
import AdminNav from "./AdminNav";

export default function AdminPandO() {
  return (
    <div className="admin-container">
      <div className="orders-card">
        <div className="lastest-orders-body-card">
          <div className="title-and-search">
            <h3 className="t-title">Orders</h3>
            <form className=" col-md-6 admin-search">
              <input
                type="text"
                placeholder="Search..."
                class="form-control-admin"
              ></input>
              <button type="submit" className="submit-admin">
                <i className="bi bi-search search-admin"></i>
              </button>
            </form>
          </div>
>>>>>>> 634c6e1122b12ed7853b50ecf2282795ceaac81b */}
        </div>
      </div>
    </div>
  );
}

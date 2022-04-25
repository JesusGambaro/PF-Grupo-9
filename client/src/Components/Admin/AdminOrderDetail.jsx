import "../../Css/AdminOrderDetail.css";
import React from "react";
import {useEffect} from "react";
import {useNavigate, NavLink, useParams} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {getOrderDetail} from "../../redux/actions/ordersAdmin";
import {roleUser} from "../../redux/actions/Loginregister";

export default function AdminOrderDetail() {
  const {role} = useSelector((store) => store.root);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {order} = useParams();

  useEffect(() => {
    console.log("Entre aca");
    if (window.localStorage.getItem("token")) {
      const token = window.localStorage.getItem("token");
      dispatch(roleUser(token));

      if (role.admin) {
        dispatch(getOrderDetail(token, order));
      } else if (role.admin === false) {
        navigate("/home");
      }
    }
  }, [dispatch, navigate, order, role.admin]);
  const orderDetail = useSelector((state) => state.admin.orderDetail);
  return (
    <>
      {!Object.keys(orderDetail).every((e) => !e) && (
        <div className="admin-container">
          <div className="card-order-detail">
            <header className="card-header">
              <span>
                <b>{orderDetail.createdAt?.slice(0, 10)}</b>
              </span>
              <b>{orderDetail.createdAt?.slice(11, 16)}</b>
              <small className="">Order ID: {orderDetail.id}</small>
            </header>
            <div className="card-order-detail-body">
              <article className="order-data">
                <i className="bi bi-person icon-detail-order"></i>
                <div className="order-data-container">
                  <h5 className="">Customer</h5>
                  <p className="detail-text-data">
                    {orderDetail.user.userName} <br /> {orderDetail.user.email}{" "}
                    <br /> {"+" + orderDetail.telephoneNum}
                  </p>
                  {/*               <a href="#">View profile</a>
                   */}
                </div>
              </article>

              <article className="order-data">
                <i className="bi bi-truck icon-detail-order"></i>
                <div className="order-data-container">
                  <h5 className="">Order info</h5>
                  <p className=" detail-text-data">
                    Shipping: Fargo express <br /> Pay method: card <br />
                    Status: {orderDetail.delivered}
                  </p>
                </div>
              </article>

              <article className="order-data">
                <i className="bi bi-geo-alt icon-detail-order"></i>
                <div className="order-data-container">
                  <h5 className="">Deliver to</h5>
                  <p className="detail-text-data">{orderDetail.address}</p>
                </div>
              </article>
            </div>
            <div className="table-container-detail">
              <div className="table-responsive">
                <table className="table border">
                  <thead>
                    <tr>
                      <th width="40%">Product</th>
                      <th width="20%">Unit Price</th>
                      <th width="20%">Quantity</th>
                      <th width="20%" className="text-end">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderDetail.shoppingCartItems.map((e, i) => {
                      return (
                        <tr key={i}>
                          <td className="product">
                            <div className="left">
                              <img
                                src={e.product.images[0].url}
                                width="40"
                                height="40"
                                className="img-xs"
                                alt="Item"
                              ></img>
                            </div>
                            <div className="info">
                              {e.product.model} {/* model */}{" "}
                            </div>
                          </td>
                          <td> ${e.product.price}</td>
                          <td> 2 </td>
                          <td className="text-end"> $99.50 </td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td className="product">
                        <div className="left">
                          <img
                            src="https://m.media-amazon.com/images/I/61Nh8BmRvoL._AC_UY395_.jpg"
                            width="40"
                            height="40"
                            className="img-xs"
                            alt="Item"
                          ></img>
                        </div>
                        <div className="info"> model </div>
                      </td>
                      <td> $44.25 </td>
                      <td> 2 </td>
                      <td className="text-end"> $99.50 </td>
                    </tr>
                    <td colSpan="4">
                      <article className="float-end">
                        <dl className="dlist">
                          <dt>Subtotal:</dt> <dd>$973.35</dd>
                        </dl>
                        <dl className="dlist">
                          <dt>Shipping cost:</dt> <dd>$10.00</dd>
                        </dl>
                        <dl className="dlist">
                          <dt>Grand total:</dt>{" "}
                          <dd>
                            <b className="h5">$983.00</b>{" "}
                          </dd>
                        </dl>
                        <dl className="dlist">
                          <dt className="text-muted">Status:</dt>
                          <dd>
                            <span className="badge rounded-pill alert-success text-success">
                              Payment done
                            </span>
                          </dd>
                        </dl>
                      </article>
                    </td>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="box shadow-sm bg-light Payment-info">
              <h5>Payment info</h5>
              <p className="detail-text-data">
                Master Card **** **** 4768 <br />
                Business name: Grand Market LLC <br />
                Phone: +1 (800) 555-154-52
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

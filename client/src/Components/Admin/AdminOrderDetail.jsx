import "../../Css/AdminOrderDetail.css";
import React from "react";
import {useEffect, useState} from "react";
import {useNavigate, NavLink, useParams} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {getOrderDetail, updateOrder} from "../../redux/actions/ordersAdmin";
import {roleUser} from "../../redux/actions/Loginregister";
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";

export default function AdminOrderDetail() {
  const {role} = useSelector((store) => store.root);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {order} = useParams();
  const orderDetail = useSelector((state) => state.admin.orderDetail);
  
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
        dispatch(getOrderDetail(token, order));
      } else if (role.admin === false) {
        navigate("/home");
      }
    }
  }, [dispatch, navigate, order, role.admin,orderDetail ]);
  
  


  function handleStatusChange(e){
    e.preventDefault();
   dispatch(updateOrder(token1, order, e.target.value))
   
  }
  return (
    <>
      {!Object.keys(orderDetail).every((e) => !e) && (
        <div className="admin-container">
          <div className="card-order-detail">
            <header className="card-header">
              <span className="date">
                <b>{orderDetail.createdAt?.slice(0, 10)}</b>
                <b>{orderDetail.createdAt?.slice(11, 16)}</b>
              <small className="">Order ID: {orderDetail.id}</small>
              </span>
              
              <span className="change-status">
              <Dropdown isOpen={dropDown} toggle={abrirYcerrar}>
              <DropdownToggle caret className="btn-lg">
                Change Status
              </DropdownToggle>
              <DropdownMenu>
             
                <DropdownItem
                  value="undelivered"
                  onClick={(e) => handleStatusChange(e)}
                >
                  undelivered
                </DropdownItem>
                <DropdownItem
                  value="delivered"
                  onClick={(e) => handleStatusChange(e)}
                >
                  delivered
                </DropdownItem>
                <DropdownItem
                  value="completed"
                  onClick={(e) => handleStatusChange(e)}
                >
                  completed
                </DropdownItem>
                <DropdownItem
                  value="canceled"
                  onClick={(e) => handleStatusChange(e)}
                >
                  canceled
                </DropdownItem>
              </DropdownMenu>
            </Dropdown></span>
            </header>
            <div className="card-order-detail-body">
              <article className="order-data">
                <i className="bi bi-person icon-detail-order"></i>
                <div className="order-data-container">
                  <h5 className="">Customer</h5>
                  <p className="detail-text-data">
                    {orderDetail.name&&orderDetail.name} {orderDetail.surname&&orderDetail.surname} <br /> {orderDetail.user.email && orderDetail.user.email}
                    <br /> {orderDetail.telephoneNumber&& "+" + orderDetail.telephoneNumber}
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
                    Status: {orderDetail.delivered && orderDetail.delivered}
                  </p>
                </div>
              </article>

              <article className="order-data">
                <i className="bi bi-geo-alt icon-detail-order"></i>
                <div className="order-data-container">
                  <h5 className="">Deliver to</h5>
                  <p className="detail-text-data">City: {orderDetail.city && orderDetail.city}, {orderDetail.country && orderDetail.country} </p>
                  <p className="detail-text-data">{orderDetail.address && orderDetail.address}, 
                   {orderDetail.apartment && '  ' +orderDetail.apartment },
                   {orderDetail.floor && ' floor '+orderDetail.floor}</p>
                  <p className="detail-text-data">Postalcode: {orderDetail.postalCode && orderDetail.postalCode}</p>
                </div>
              </article>
            </div>
            <div className="table-container-detail">
              <div className="table-responsive">
                <table className="table border">
                  <thead>
                    <tr>
                      <th width="20%">Product</th>
                      <th width="20%">color</th>
                      <th width="20%">Size</th>
                      <th width="20%">Unit Price</th>
                      
                      
                      {/* <th width="20%">Quantity</th>
                      <th width="20%" className="text-end">
                        Total
                      </th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {orderDetail.shoppingCartItems?.map((e, i) => {
                     
                      return (
                        <tr key={i}>
                          <td className="product">
                            <div className="left">
                              <img
                                src={e.product.images[0].url &&e.product.images[0].url}
                                width="40"
                                height="40"
                                className="img-xs"
                                alt="Item"
                              ></img>
                            </div>
                            <div className="info">
                              {e.product.model && e.product.model} {/* model */}{" "}
                            </div>
                          </td>
                          <td> {e.product.color && e.product.color} </td>
                          <td > {e.size && e.size}</td>
                          <td > ${e.product.price && e.product.price}</td>
                          
                          {/* 
                          <td className="text-end"> $99.50 </td> */}
                        </tr>
                      );
                    })}
                    {/* <tr>
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
                    </tr> */}
                    <tr>
                    <td colSpan="4">
                      <div className="float-end">
                        {/* <dl className="dlist">
                          <dt>Subtotal:</dt> <dd>$973.35</dd>
                        </dl> */}
                        {/* <dl className="dlist">
                          <dt>Shipping cost:</dt> <dd>$10.00</dd>
                        </dl> */}
                        <figure >
                          <div>
                        <dl className="dlist">
                          <dt>Grand total:</dt>
                          <dd>
                            <b className="h5">${orderDetail.total && orderDetail.total}</b>
                          </dd>
                        </dl>
                        </div>
                    </figure>
                        {/* <dl className="dlist">
                          <dt className="text-muted">Status:</dt>
                          <dd>
                            <span className="badge rounded-pill alert-success text-success">
                              Payment done
                            </span>
                          </dd>
                        </dl> */}
                      </div>
                    </td>
                    </tr>
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

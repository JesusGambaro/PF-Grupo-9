import "../../Css/AdminOrderDetail.css";
import React from "react";
import ClosedSideBarAdmin from "./ClosedSideBarAdmin";
import AdminNav from "./AdminNav";
import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";

export default function AdminOrderDetail() {
    return (
        <div className="admin-container">
            <div className="card-order-detail">
                <header className="card-header">
          <span>
            <b>Wed, Aug 13, 2020, 4:34PM</b>
          </span>
                    <small className="">Order ID: 3453012</small>
                </header>

                <div className="card-order-detail-body">
                    <article className="order-data">
                        <i className="bi bi-person icon-detail-order"></i>
                        <div className="order-data-container">
                            <h5 className="">Customer</h5>
                            <p className="detail-text-data">
                                John Alexander <br/> alex@example.com <br/> +998 99 22123456
                            </p>
                            <a href="#">View profile</a>
                        </div>
                    </article>

                    <article className="order-data">
                        <i className="bi bi-truck icon-detail-order"></i>
                        <div className="order-data-container">
                            <h5 className="">Order info</h5>
                            <p className=" detail-text-data">
                                Shipping: Fargo express <br/> Pay method: card <br/>
                                Status: new
                            </p>
                        </div>
                    </article>

                    <article className="order-data">
                        <i className="bi bi-geo-alt icon-detail-order"></i>
                        <div className="order-data-container">
                            <h5 className="">Deliver to</h5>
                            <p className="detail-text-data">
                                City: Tashkent, Uzbekistan <br/>
                                Block A, House 123, Floor 2 <br/> Po Box 10000
                            </p>
                            <a href="#">View profile</a>
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
                                    <div className="info"> model</div>
                                </td>
                                <td> $44.25</td>
                                <td> 2</td>
                                <td className="text-end"> $99.50</td>
                            </tr>

                            <td colspan="4">
                                <article className="float-end">
                                    <dl className="dlist">
                                        <dt>Subtotal:</dt>
                                        <dd>$973.35</dd>
                                    </dl>
                                    <dl className="dlist">
                                        <dt>Shipping cost:</dt>
                                        <dd>$10.00</dd>
                                    </dl>
                                    <dl className="dlist">
                                        <dt>Grand total:</dt>
                                        {" "}
                                        <dd>
                                            {" "}
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
                        Master Card **** **** 4768 <br/>
                        Business name: Grand Market LLC <br/>
                        Phone: +1 (800) 555-154-52
                    </p>
                </div>
            </div>
        </div>
    );
}

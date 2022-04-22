import '../../Css/AdminPandO.css'
import React from "react"; 
import {useEffect} from "react";
import { useNavigate, NavLink } from "react-router-dom"
import {useSelector, useDispatch} from "react-redux";
import ClosedSideBarAdmin from "./ClosedSideBarAdmin";
import AdminNav from './AdminNav';
import { getAllOrders } from '../../redux/actions/ordersAdmin';
import { roleUser } from "../../redux/actions/Loginregister";



export default function AdminPandO() {
  const { role } = useSelector(store => store.root)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  
  useEffect(() => {
    
    if (window.localStorage.getItem("token")) {
      const token = window.localStorage.getItem("token")
      dispatch(roleUser(token))
      if (role.admin) {
        
        dispatch(getAllOrders(token))
      }
      else if (role.admin===false) {
        navigate("/home")
      }
    }

  }, []);
  const allOrders = useSelector(state=>state.admin.allOrders)
  console.log('?',allOrders)
    return (
      <div className="container-fluid admin-container">
      
      <ClosedSideBarAdmin />   
      <div className='adminNav'>   
      <AdminNav section='Purchases and Orders'/>
      </div>

      <div className='orders-card'>
        <div className='lastest-orders-body-card'>
        <div className='title-and-search'>
        <h3 className='t-title'>Orders</h3>
        <form className=" col-md-6 admin-search">
        
						<input type="text" placeholder="Search..." className="form-control-admin"></input>
            <button type="submit" className='submit-admin'>
        <i className="bi bi-search search-admin"></i>
        </button>
					</form>
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
							<th scope="col" className="text-end"> Action </th>
						</tr>
					</thead>
          <tbody>
            {allOrders.map(e=>{
              return(
                <tr>
                <td>{e.id} {/* ID order */}</td>
                <td>
                  <b>Customer name</b>
                </td>
                <td>email@example.com</td>
                <td>$778.35</td>
                <td>
                  <span className="badge rounded-pill alert-success">
                   {e.delivered === true? 'Delivered':'Pending'} {/* status */}
                  </span>
                </td>
                <td>{e.createdAt.slice(0,10)} {/* date */}</td>
                <td className="text-end">
                <NavLink exact to={`/home/admin/order/${e.id}`} className="btn btn-light detalle">
                  Detail
                </NavLink>
                </td>
              </tr>)
              
            })}
          		<tr>
                <td>ID order</td>
          			<td><b>Customer name</b></td>
          			<td>email@example.com</td>
          			<td>$778.35</td>
          			<td><span className="badge rounded-pill alert-success">status</span></td>
          			<td>07.05.2020</td>
          			<td className="text-end">
          				<a href="order/detail" className="btn btn-light detalle">Detail</a>
          			</td>
          		</tr>
              </tbody>
        </table>

        </div>
      </div>
      </div>
    );
  }
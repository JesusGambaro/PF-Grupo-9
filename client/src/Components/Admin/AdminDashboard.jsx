import "../../Css/AdminDashboard.css"
import React from "react"; 
import bringAllData from "../../redux/actions/bringAllData";
import ClosedSideBarAdmin from "../ClosedSideBarAdmin";
import AdminNav from './AdminNav';
import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";



export default function AdminDashboard() {
  const dispatch = useDispatch();
  const shoes = useSelector((state) => state.allData.length);
  useEffect(() => {
    if (!shoes.length) dispatch(bringAllData());
  }, []);
  
  
    return (
      <div className="container-fluid admin-container">
      
      <div>
      <ClosedSideBarAdmin />
      </div>
      <div className='adminNav'>   
      <AdminNav section='Dashboard'/>
      </div>

      <div className='totals'>
      <div className='total-card'><i className="bi bi-piggy-bank itemL-dash"></i>
      <h5 className='card-text'>Total Sales</h5>
      <p>$0</p>
      </div>
      <div className='total-card'><i className="bi bi-truck itemL-dash" ></i>
      <h5 className='card-text'>Total Orders</h5>
      <p>0</p>
      </div>
      <div className='total-card'><i className="bi bi-cart2 itemL-dash"></i>
      <h5 className='card-text'>Total Products</h5>
      <p>{shoes}</p>
      </div>
      </div> 

      <div className='lastest-orders-card'>
        <div className='lastest-orders-body-card'>
        <h3 className='t-title'>Latest orders</h3>
        <table className="table table-hover">
        <thead>
						<tr>
              <th scope="col">#ID</th>
							<th scope="col">Name</th>
							<th scope="col">Email</th>
							<th scope="col">Total</th>
							<th scope="col">Status</th>
							<th scope="col">Date</th>
							<th scope="col" class="text-end"> Action </th>
						</tr>
					</thead>
          <tbody>
          		<tr>
                <td>ID order</td>
          			<td><b>Customer name</b></td>
          			<td>email@example.com</td>
          			<td>$778.35</td>
          			<td><span className="badge rounded-pill alert-success">status</span></td>
          			<td>07.05.2020</td>
          			<td className="text-end">
          				<a href="#" class="btn btn-light">Detail</a>
          			</td>
          		</tr>
              </tbody>
        </table>

        </div>
      </div>
      </div>
    );
  }
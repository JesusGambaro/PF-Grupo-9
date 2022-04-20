import '../Css/AdminDashboard.css'
import React from "react"; 

import ClosedSideBarAdmin from "./ClosedSideBarAdmin";
import AdminNav from './AdminNav';



export default function AdminDashboard() {
    
  
    return (
      <div className="container-fluid admin-container">
      
      <div>
      <ClosedSideBarAdmin />
      </div>
      <div className='adminNav'>   
      <AdminNav section='Dashboard'/>
      </div>

      <div className='totals'>
      <div className='total-card'><i class="bi bi-piggy-bank itemL-dash"></i>
      <h5 className='card-text'>Total Orders</h5>
      <p>$19,626,058.20</p>
      </div>
      <div className='total-card'><i class="bi bi-truck itemL-dash" ></i>
      <h5 className='card-text'>Total Sales</h5>
      <p>626</p>
      </div>
      <div className='total-card'><i class="bi bi-cart2 itemL-dash"></i>
      <h5 className='card-text'>Total Products</h5>
      <p>207</p>
      </div>
      </div> 

      <div className='lastest-orders-card'>
        <div className='lastest-orders-body-card'>
        <h3 className='t-title'>Latest orders</h3>
        <table class="table table-hover">
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
          			<td><span class="badge rounded-pill alert-success">status</span></td>
          			<td>07.05.2020</td>
          			<td class="text-end">
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
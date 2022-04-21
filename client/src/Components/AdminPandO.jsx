import '../Css/AdminPandO.css'
import React from "react"; 

import ClosedSideBarAdmin from "./ClosedSideBarAdmin";
import AdminNav from './AdminNav';



export default function AdminPandO() {
    
  
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
        
						<input type="text" placeholder="Search..." class="form-control-admin"></input>
            <button type="submit" className='submit-admin'>
        <i className="bi bi-search search-admin"></i>
        </button>
					</form>
          </div>
        
        <table class="table table-hover">
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
          		<tr>
                <td>ID order</td>
          			<td><b>Customer name</b></td>
          			<td>email@example.com</td>
          			<td>$778.35</td>
          			<td><span class="badge rounded-pill alert-success">status</span></td>
          			<td>07.05.2020</td>
          			<td className="text-end">
          				<a href="order/detail" class="btn btn-light">Detail</a>
          			</td>
          		</tr>
              </tbody>
        </table>

        </div>
      </div>
      </div>
    );
  }
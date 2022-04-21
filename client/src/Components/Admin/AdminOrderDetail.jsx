import '../../Css/AdminOrderDetail.css'
import React from "react"; 
import ClosedSideBarAdmin from "./ClosedSideBarAdmin";
import AdminNav from './AdminNav';
import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";

export default function AdminOrderDetail(){


    return(
        <div className="container-fluid admin-container">

            <div>
                <ClosedSideBarAdmin />
            </div>

            <div className='adminNav'>   
                <AdminNav section='Dashboard'/>
            </div>
            
         <div className="card-order-detail">

            <header class="card-header">
              
                <span>
                   <b>Wed, Aug 13, 2020, 4:34PM</b>  
                </span> 
                <small class="">Order ID: 3453012</small>
              
            </header>

 <div class="card-order-detail-body">


  
    <article class="order-data"> 
    <i class="bi bi-person icon-detail-order"></i>
      <div class="order-data-container">
      <h5 class="">Customer</h5> 
        <p class="detail-text-data">
          John Alexander <br/> alex@example.com <br/> +998 99 22123456
        </p>
        <a href="#">View profile</a>
      </div>
    </article> 
 

    <article class="order-data">
    <i class="bi bi-truck icon-detail-order"></i>
      <div class="order-data-container">
        <h5 class="">Order info</h5> 
        <p class=" detail-text-data">
          Shipping: Fargo express <br/> Pay method: card  <br/>Status: new
        </p>
       
      </div>
    </article> 
  
  
    <article class="order-data">
    <i class="bi bi-geo-alt icon-detail-order"></i>
      <div class="order-data-container">
        <h5 class="">Deliver to</h5> 
        <p class="detail-text-data">
          City: Tashkent, Uzbekistan <br/>Block A, House 123, Floor 2 <br/> Po Box 10000
        </p>
        <a href="#">View profile</a>
      </div>
    </article> 
  

</div>
<div class="table-container-detail">
              
                <div class="table-responsive">
                <table class="table border">
                  <thead>
                    <tr>
                      <th width="40%">Product</th>
                      <th width="20%">Unit Price</th>
                      <th width="20%">Quantity</th>
                      <th width="20%" class="text-end">Total</th>
                    </tr>
                  </thead>
                   <tbody>
                    <tr>
                      <td className='product'>
                        
                            <div class="left">
                                <img src="https://m.media-amazon.com/images/I/61Nh8BmRvoL._AC_UY395_.jpg" width="40" height="40" class="img-xs" alt="Item"></img>
                            </div>
                            <div class="info"> model </div>
                        
                      </td>
                      <td> $44.25 </td>
                      <td> 2 </td>
                      <td class="text-end">  $99.50  </td>
                    </tr>

                    <td colspan="4"> 
                          <article class="float-end">
                            <dl class="dlist"> 
                                <dt>Subtotal:</dt> <dd>$973.35</dd> 
                              </dl>
                              <dl class="dlist"> 
                                <dt>Shipping cost:</dt> <dd>$10.00</dd> 
                              </dl>
                              <dl class="dlist"> 
                                <dt>Grand total:</dt> <dd> <b class="h5">$983.00</b> </dd> 
                              </dl>
                              <dl class="dlist"> 
                                <dt class="text-muted">Status:</dt> 
                                <dd>  
                                  <span class="badge rounded-pill alert-success text-success">Payment done</span> 
                                </dd> 
                              </dl>
                          </article>
                      </td>
                    
                   </tbody>
                </table>
                </div> 




 
 </div>
 <div class="box shadow-sm bg-light Payment-info">
                   <h5>Payment info</h5>
                   <p className='detail-text-data'> 
                   Master Card **** **** 4768  <br/>
                    Business name: Grand Market LLC <br/>
                    Phone: +1 (800) 555-154-52
                   </p>
                </div>
 </div>


</div>
    )
}
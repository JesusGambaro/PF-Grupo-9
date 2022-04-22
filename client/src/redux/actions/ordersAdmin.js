import axios from "axios";
import { GET_ALL_ORDERS, GET_LAST_SEVEN_DAYS_ORDERS,GET_ORDER_DETAIL} from './actionsAdmin'



export const getLastSevenDaysOrders = (token)=>{
    return async (dispatch)=>{
    const data =  await axios.get(
      `http://localhost:3001/orders/ByDate`,{
        headers: {'Authorization':`bearer ${token}`}
      });
    

    dispatch({type: GET_LAST_SEVEN_DAYS_ORDERS, payload: data.data});
  };
}

export const getAllOrders =(token)=>{
  return async (dispatch)=>{
  const data =  await axios.get(
    `http://localhost:3001/orders`,{
      headers: {'Authorization':`bearer ${token}`}
    });
  

  dispatch({type: GET_ALL_ORDERS, payload: data.data});
};
}

export const getOrderDetail =(token,order)=>{
  return async (dispatch)=>{
  const data =  await axios.get(
    `http://localhost:3001/orders?order=${order}`,{
      headers: {'Authorization':`bearer ${token}`}
    });
  

  dispatch({type: GET_ORDER_DETAIL, payload: data.data});
};
}

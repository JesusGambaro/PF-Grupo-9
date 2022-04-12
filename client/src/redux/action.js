import axios from "axios";
export const BRING_ALL_DATA = "@shoes/bringAllData"
export const ORDER_NAME = "@shoes/orderName"
export const ORDER_PRICE = "@shoes/orderPrice"

export function bringAllData(){
    return async (dispatch)=>{
        const dataBack = (await axios.get("http://localhost:5000/data")).data;
        console.log(await dataBack);
        return dispatch({
            type:BRING_ALL_DATA,
            payload:dataBack,
        });
    };
}
export function orderName(){
    
}
export function orderPrice(){

}
import {LOGIN_USER,REGISTER_USER, CLEAR_USER} from "./actions"
import axios from "axios"
const URL="localhost:3001/user"
 
export const registerUsers= (datos)=>{
  return async (dispatch)=>{
    const response= await axios.post(`${URL}/signUp`,datos)
    dispatch({
      type:REGISTER_USER,
      payload:response
    })
  }
}

export const loginUsers=(datos)=>{
  return async (dispatch)=>{
    const response= await axios.post(`${URL}/signIn`,datos)
    dispatch({
      type: LOGIN_USER,
      payload:response
    })
  }
}

export const clearUser=()=>{
  return {
      type:CLEAR_USER,
      payload:{}
    }
  }
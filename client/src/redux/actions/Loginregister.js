import {LOGIN_USER,REGISTER_USER} from "./actions"
import axios from "axios"
const URL="localhost:3001/user"
 
export const registerUser= (datos)=>{
  return async (dispatch)=>{
    const response= await axios.post(`${URL}/signUp`,datos)
    dispatch({
      type:REGISTER_USER,
      payload:response
    })
  }
}

export const loginUser=(datos)=>{
  return async (dispatch)=>{
    const response= await axios.post(`${URL}/signIn`,datos)
    dispatch({
      type: LOGIN_USER,
      payload:response
    })
  }
}
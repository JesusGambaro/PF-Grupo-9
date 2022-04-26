import axios from "axios"

const URL = "http://localhost:3001/orders"

export const postOrder = (token, order) => {
  return async () => {
    await axios.post(`${URL}`, order, {
      headers: { "Authorization": `bearer ${token}` },
    })
  }
}

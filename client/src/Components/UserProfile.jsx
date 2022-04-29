import "../Css/UserProfile.css"
import { useDispatch, useSelector } from "react-redux"
import { getOrderProfile, userInfo } from "../redux/actions/getOrdersUser";
import { roleUser } from "../redux/actions/Loginregister";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const { orderUser, role, user } = useSelector(store => store.root)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!window.localStorage.getItem("token")) {
      navigate("/home/login")
    }
    else {
      const token = window.localStorage.getItem("token")
      if (role.admin) {
        navigate("/home/admin/dashboard")
      }
      else if (role.admin === false) {
        dispatch(getOrderProfile(token))
        dispatch(userInfo(token))
      }
      else if (role.admin === undefined) {
        dispatch(roleUser(token))
      }
    }
  }, [role])

  return (

    <div className="container p-0 bg-light shadow-lg con" style={{ "marginTop": "7rem", "marginBottom": "3rem" }}>
      <div className="row w-100 m-0 p-0 mb-5" >
        <h1 className="text-center fw-bold mb-5 pt-5">MY ACCOUNT</h1>

        <div className="row align-items-center justify-content-center m-0 p-0">

          <img src="https://previews.123rf.com/images/chudtsankov/chudtsankov1703/chudtsankov170300127/73952540-cara-divertida-de-dibujos-animados-feliz-con-expresi%C3%B3n-sonriente-ilustraci%C3%B3n-con-fondo-amarillo.jpg" alt="fondo"
            className="col-12 rounded-circle p-0 border border-5 border-secondary perfil"
          />
          <div className="col-12 text-center m-0 p-0 mt-4">
            {user.userName && (
              <>
                <p className="col-12 fs-5 m-0"><strong>UserName:</strong> {user.userName}</p>
                <p className="col-12 fs-5 m-0"><strong>Email:</strong> {user.email}</p>
              </>
            )}
          </div>
        </div>
      </div>
      <hr className="border border-2 border-secondary" />

      <div className="w-100">
        <h1 className="text-center">My orders</h1>

        {
          orderUser.length > 0
            ? orderUser.map((order) => (
              <div className="row w-100 m-0 shadow-lg bg-light pt-5 p-2 p-md-4 mt-5 con" key={order.id}>
                <div className="shadow  datos">
                  <h3 className="col-12 fw-bold text-center mb-2 pt-3">Order data</h3>
                  <div className="col-12 d-flex flex-column flex-xl-row gap-2 gap-xl-4 justify-content-center m-0 align-items-center pt-4 pb-4 rounded rounded-5">
                    <p className="m-0"><strong>Order number: </strong>{order.id}</p>
                    <p className="m-0"><strong>Addres:</strong> {order.address}</p>
                    <p className="m-0"><strong>Phone Number:</strong> {order.telephoneNumber} </p>
                    <p className="m-0"><strong>Date:</strong> {order.createdAt}</p>
                    <p className="m-0"><strong>Total:</strong> ${order.total}</p>
                    <p className="m-0"><strong>Status:</strong> {order.delivered}</p>
                  </div>
                </div>

                <div className="mt-5 mb-3 gap-5 cards">

                  {order.shoppingCartItems.length > 0
                    ? order.shoppingCartItems.map((item) => (
                      <div className="d-flex flex-column flex-md-row align-items-center gap-0 pt-3 pb-2 shadow pedido" key={item.id}>
                        <div className="imagen">
                          <img src={item.product.images[0].url} className="card-img-top" alt="..." onClick={() =>
                            navigate(
                              `/home/${item.productId}/${item.product.model}`
                            )
                          }/>
                        </div>
                        <div className="text-center text-md-start m-0 p-0 w-100">
                          <h5 className="fw-bold fs-4 mb-3">{item.product.brand}-{item.product.model}</h5>
                          <p className="fs-5 m-0"><strong>Color:</strong> {item.product.color}</p>
                          <p className="fs-5 m-0"><strong>Size:</strong> {item.size}</p>
                          <p className="fs-5 m-0"><strong>Price:</strong> ${item.product.finalPrice}</p>
                          <p className="fs-5 m-0"><strong>Amount:</strong> {item.amount}</p>
                        </div>
                      </div>
                    ))
                    : <h1>No hay productos</h1>
                  }
                </div>
              </div>
            ))
            : <h1 className="text-center mt-5 pt-5 mb-5 pb-5 text-danger">You don't have orders</h1>
        }
      </div>
    </div>
  );
}

export default UserProfile; 
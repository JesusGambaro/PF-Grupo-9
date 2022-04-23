import "../Css/UserProfile.css"
import { useDispatch, useSelector } from "react-redux"
import { getOrderProfile } from "../redux/actions/getOrdersUser";
import { roleUser } from "../redux/actions/Loginregister";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const { orderUser, role } = useSelector(store => store.root)
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
      }
      else if (role.admin===undefined){
        dispatch(roleUser(token))
      }
    }
  }, [role])

  console.log(orderUser)
  return (

    <div className="container p-0 bg-light shadow-lg con" style={{ "marginTop": "7rem", "marginBottom": "3rem" }}>
      <div className="row w-100 mb-5" >
        <h1 className="text-center fw-bold mb-5 pt-5">MY ACCOUNT</h1>

        <div className="row align-items-center justify-content-center">

          <img src="https://previews.123rf.com/images/chudtsankov/chudtsankov1703/chudtsankov170300127/73952540-cara-divertida-de-dibujos-animados-feliz-con-expresi%C3%B3n-sonriente-ilustraci%C3%B3n-con-fondo-amarillo.jpg" alt="fondo"
            className="col-12 rounded-circle p-0 border border-5 border-secondary perfil"
          />
          <div className="col-12 ms-sm-4 text-center mt-4">
            <p className="col-12 fw-bold m-0 fs-sm-4">UserName: Camilo  </p>
            <p className="col-12 fw-bold m-0 fs-sm-4">Email: Camilo@gmail.com  </p>
          </div>
        </div>
      </div>
      <hr className="border border-2 border-secondary" />

      <div className="w-100">
        <h1 className="text-center">Pedidos</h1>

        <div className="row w-100 m-0 shadow-lg bg-light pt-5 p-2 p-md-4 mt-5 con">
          <div className="shadow  datos">
            <h3 className="col-12 text-center mb-2 pt-3">Datos del pedido</h3>
            <div className="col-12 d-flex flex-column flex-lg-row gap-2 gap-lg-5 justify-content-center m-0 fs-5 align-items-center pt-4 pb-4 rounded rounded-5">
              <p className="m-0">Order number: 121212</p>
              <p className="m-0">Addres: cra 61 D</p>
              <p className="m-0">Phone Number:12343213</p>
              <p className="m-0">Date: 12/1/1999</p>
              <p className="m-0">Total: $121212</p>
              <p className="m-0">Status: entregado</p>
            </div>
          </div>

          <div className="mt-5 mb-3 gap-5 cards">

            <div className="d-flex flex-column flex-md-row align-items-center gap-3 pt-3 pb-2 shadow pedido">
              <div className="imagen">
                <img src="../Images/logo2.png" className="card-img-top" alt="..." />
              </div>
              <div className="text-center text-md-start m-0 p-0 w-100">
                <h5 className="fw-bold fs-2 mb-3">Adidas</h5>
                <p className="fs-5">Color: Black</p>
                <p className="fs-5">Size: 21</p>
                <p className="fs-5">Precio: $2000</p>
                <p className="fs-5">Cantidad: 20</p>
              </div>
            </div>

            <div className="d-flex flex-column flex-md-row align-items-center gap-3 pt-3 pb-2 shadow pedido">
              <div className="imagen">
                <img src="../Images/logo2.png" className="card-img-top" alt="..." />
              </div>
              <div className="text-center text-md-start m-0 p-0 w-100">
                <h5 className="fw-bold fs-2 mb-3">Adidas</h5>
                <p className="fs-5">Color: Black</p>
                <p className="fs-5">Size: 21</p>
                <p className="fs-5">Precio: $2000</p>
                <p className="fs-5">Cantidad: 20</p>
              </div>
            </div>

            <div className="d-flex flex-column flex-md-row align-items-center gap-3 pt-3 pb-2  shadow pedido">
              <div className="imagen">
                <img src="../Images/logo2.png" className="card-img-top" alt="..." />
              </div>
              <div className="text-center text-md-start m-0 p-0 w-100">
                <h5 className="fw-bold fs-2 mb-3">Adidas</h5>
                <p className="fs-5">Color: Black</p>
                <p className="fs-5">Size: 21</p>
                <p className="fs-5">Precio: $2000</p>
                <p className="fs-5">Cantidad: 20</p>
              </div>
            </div>
          </div>
        </div>


      </div>


    </div>
  );
}

export default UserProfile; 
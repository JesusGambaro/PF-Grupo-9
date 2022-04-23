import "../Css/UserProfile.css"

function UserProfile() {
  return (

    <div className="container p-0" style={{ "marginTop": "7rem", "marginBottom": "3rem" }}>
      <div className="row w-100 mb-5" >
        
        <div className="col col-12 mt-5 ms-4 d-flex align-items-center">

          <img src="https://previews.123rf.com/images/chudtsankov/chudtsankov1703/chudtsankov170300127/73952540-cara-divertida-de-dibujos-animados-feliz-con-expresi%C3%B3n-sonriente-ilustraci%C3%B3n-con-fondo-amarillo.jpg" alt="fondo"
            className="rounded-circle p-0 border border-5 border-secondary" style={{ "width": "12%", "height": "20vh" }}
          />
          <div className="col ms-4  ">
            <p className="col-12 fw-bold m-0 fs-4">UserName: Camilo  </p>
            <p className="col-12 fw-bold m-0 fs-4">Email: Camilo@gmail.com  </p>
          </div>
        </div>
      </div>

      <div className="w-100">
        <h1 className="text-center mb-5">Pedidos</h1>
        <div className="row w-100 m-0 shadow-lg bg-light pt-5 p-4 con">
          <div className="shadow  datos">
            <h3 className="col-12 text-center mb-2 pt-3">Datos del pedido</h3>
            <div className="col-12 d-flex gap-5 justify-content-center m-0 fs-5 align-items-center pt-4 pb-4 rounded rounded-5">
              <p className="m-0">Order number: 121212</p>
              <p className="m-0">Addres: cra 61 D</p>
              <p className="m-0">Phone Number:12343213</p>
              <p className="m-0">Date: 12/1/1999</p>
              <p className="m-0">Total: $121212</p>
              <p className="m-0">Status: entregado</p>
            </div>
          </div>

          <div className="mt-5 mb-3 gap-5 cards">
            <div className="d-flex align-items-center gap-3 pt-3 pb-2 shadow pedido">
              <div className="w-100">
                <img src="../Images/logo2.png" className="card-img-top" alt="..." />
              </div>
              <div className="m-0 p-0 w-100">
                <h5 className="fw-bold fs-2 mb-3">Adidas</h5>
                <p className="fs-5">Color: Black</p>
                <p className="fs-5">Size: 21</p>
                <p className="fs-5">Precio: $2000</p>
                <p className="fs-5">Cantidad: 20</p>
              </div>
            </div>

            <div className="d-flex align-items-center gap-3 pt-3 pb-2 shadow pedido">
              <div className="w-100">
                <img src="../Images/logo2.png" className="card-img-top" alt="..." />
              </div>
              <div className="m-0 p-0 w-100">
                <h5 className="fw-bold fs-2 mb-3">Adidas</h5>
                <p className="fs-5">Color: Black</p>
                <p className="fs-5">Size: 21</p>
                <p className="fs-5">Precio: $2000</p>
                <p className="fs-5">Cantidad: 20</p>
              </div>
            </div>

            <div className="d-flex align-items-center gap-3 pt-3 pb-2  shadow pedido">
              <div className="w-100">
                <img src="../Images/logo2.png" className="card-img-top" alt="..." />
              </div>
              <div className="m-0 p-0 w-100">
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
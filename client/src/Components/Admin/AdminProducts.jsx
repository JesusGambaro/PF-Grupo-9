import ClosedSideBarAdmin from "./ClosedSideBarAdmin";
import AdminNav from "./AdminNav";
import ConfirmPanel from "./ConfirmPanel";
import ShoeForm from "./ShoeForm";
import {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import bringAllData from "../../redux/actions/bringAllData";
import {deleteShoe} from "../../redux/actions/productsAdmin";
import axios from "axios";
import {roleUser} from "../../redux/actions/Loginregister";
import "../../Css/AdminProducts.scss";
import {useNavigate} from "react-router-dom";

const CardProduct = ({shoe, func}) => {
  //console.log(shoe);

  return (
    <div className="product-card">
      <img src={shoe.images[0].url} alt="" />
      <p>$ {shoe.price}</p>
      <p>Status</p>
      <p>{shoe.createdAt.substring(0, shoe.createdAt.indexOf("T"))}</p>
      <div className="actions">
        <button>
          <i className="bi bi-pen"></i>Edit
        </button>
        <button
          onClick={() => {
            //DeleteItem(shoe.id);
            func("Active", shoe.id);
          }}
        >
          <i className="bi bi-trash"></i> Delete
        </button>
      </div>
    </div>
  );
};

const AdminProducts = () => {
  const dispatch = useDispatch();
  const shoes = useSelector((state) => state.admin.allData);
  useEffect(() => {
    if (!shoes.length) dispatch(bringAllData(true));
  }, []);
  const [confirmState, setConfirmState] = useState("Desactive");
  const [createState, setCreateState] = useState("Desactive");
  const [idToDelete, setidToDelete] = useState();
  const navigate = useNavigate();
  const DeleteItem = async () => {
    //await axios.delete(`http://localhost:3001/allFootwear/${id}`);
    dispatch(deleteShoe(idToDelete));
  };
  const HandleConfirmState = (estado) => {
    setConfirmState(estado);
  };
  const HandlecreateState = (estado) => {
    setCreateState(estado);
  };
  const HandleidToDelete = (id) => {
    setidToDelete(id);
  };
  const role = useSelector((state) => state.root.role);

  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      const token = window.localStorage.getItem("token");
      dispatch(roleUser(token));
      /*    if (role.admin) {
              navigate("/home/admin/dashboard");
            } else */
      if (role.admin === false) {
        navigate("/home");
      }
    }
  }, []);

  return (
    <div className="admin-container">
      <ClosedSideBarAdmin />
      <AdminNav section="Purchases and Orders" />

      {confirmState === "Active" && (
        <ConfirmPanel
          textoDisplay={"Are You Sure You Want To Delete It Permanently?"}
          cancelFunc={() => {
            HandleConfirmState();
          }}
          deleteFunc={() => {
            DeleteItem();
          }}
        />
      )}
      {createState === "Active" && (
        <ShoeForm
          funcEnviar={() => {
            HandlecreateState();
          }}
        />
      )}
      <div className="products-section-container">
        <div className="add-section">
          <h1>Products list</h1>
          <button
            onClick={() => {
              HandlecreateState("Active");
            }}
          >
            <i className="bi bi-plus"></i> Add New Shoe
          </button>
        </div>
        <div className="products-cards-container">
          {shoes.map((shoe, id) => (
            <CardProduct
              key={id}
              shoe={shoe}
              func={(estado, idShoe) => {
                HandleConfirmState(estado);
                HandleidToDelete(idShoe);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;

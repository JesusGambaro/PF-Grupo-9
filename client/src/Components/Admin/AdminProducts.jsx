import ConfirmPanel from "./ConfirmPanel";
import ShoeForm from "./ShoeForm";
import {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import bringAllData from "../../redux/actions/bringAllData";
import {deleteShoe} from "../../redux/actions/productsAdmin";
import {roleUser} from "../../redux/actions/Loginregister";
import "../../Css/AdminProducts.scss";
import {useNavigate} from "react-router-dom";
import {getAllCategories, getAllGenders} from "../../redux/actions/getAllUtils";

const CardProduct = ({shoe}) => {
  const dispatch = useDispatch();
  const [confirmDialog, setConfirmDialog] = useState(false);
  const handleDeleteShoe = () => {
    dispatch(deleteShoe(shoe.id));
    setConfirmDialog(false);
  };
  return (
    <div className="product-card">
      {confirmDialog && (
        <ConfirmPanel
          textoDisplay={"Are You Sure You Want To Delete It Permanently?"}
          handleDeleteShoe={() => handleDeleteShoe()}
          cancelDelete={() => setConfirmDialog(false)}
        />
      )}
      <img src={shoe.images[0].url} alt="" />
      <p>$ {shoe.price}</p>
      <p>Status</p>
      <p>{shoe.createdAt.substring(0, shoe.createdAt.indexOf("T"))}</p>
      <div className="actions">
        <button>
          <i className="bi bi-pen"></i>Edit
        </button>
        <button onClick={() => setConfirmDialog(true)}>
          <i className="bi bi-trash"></i> Delete
        </button>
      </div>
    </div>
  );
};

const AdminProducts = () => {
  const dispatch = useDispatch();
  const shoes = useSelector((state) => state.admin.allData);
  const {categories, genders, role} = useSelector((state) => state.root);
  const navigate = useNavigate();
  const [shoeDialog, setShoeDialog] = useState(false);
  useEffect(() => {
    if (!shoes.length) dispatch(bringAllData(true));
    if (!categories.length || !genders.length) {
      dispatch(getAllGenders());
      dispatch(getAllCategories());
    }
  }, [shoes.length, categories.length, genders.length, dispatch]);
  shoeDialog
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");
  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      const token = window.localStorage.getItem("token");
      dispatch(roleUser(token));
      /*if (role.admin) {
              navigate("/home/admin/dashboard");
        }else*/
      if (role.admin === false) {
        navigate("/home");
      }
    }
  }, [dispatch, navigate, role.admin]);

  return (
    <div className="admin-container">
      {shoeDialog && <ShoeForm handleShoeDialog={() => setShoeDialog(false)} />}
      <div className="products-section-container">
        <div className="add-section">
          <h1>Products list</h1>
          <button onClick={() => setShoeDialog(true)}>
            <i className="bi bi-plus"></i> Add New Shoe
          </button>
        </div>
        <div className="products-cards-container">
          {shoes.map((shoe, id) => (
            <CardProduct key={id} shoe={shoe} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;

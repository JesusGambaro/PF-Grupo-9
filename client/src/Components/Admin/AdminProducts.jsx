import ClosedSideBarAdmin from "./ClosedSideBarAdmin";
import AdminNav from "./AdminNav";
import {useSelector, useDispatch} from "react-redux";
import bringAllData from "../../redux/actions/bringAllData";
import {deleteShoe} from "../../redux/actions/productsAdmin";
import axios from "axios";
import "../../Css/AdminProducts.scss";
const CardProduct = ({shoe}) => {
  //console.log(shoe);
  const dispatch = useDispatch();
  const DeleteItem = async (id) => {
    //await axios.delete(`http://localhost:3001/allFootwear/${id}`);
    dispatch(deleteShoe(id));
  };
  return (
    <div className="product-card">
      <img src={shoe.images[0].url} alt="" />
      <p>$ {shoe.price}</p>
      <p>Status</p>
      <p>{shoe.createdAt.substring(0, shoe.createdAt.indexOf("T"))}</p>
      <div className="actions">
        <button>
          <i class="bi bi-pen"></i>Edit
        </button>
        <button
          onClick={() => {
            DeleteItem(shoe.id);
          }}
        >
          <i class="bi bi-trash"></i> Delete
        </button>
      </div>
    </div>
  );
};

const AdminProducts = () => {
  const shoes = useSelector((state) => state.admin.allData);
  //console.log(shoes);

  return (
    <div className="container-fluid admin-container">
      <ClosedSideBarAdmin />
      <div className="adminNav">
        <AdminNav section="Purchases and Orders" />
      </div>
      <div className="products-section-container">
        <div className="add-section">
          <h1>Products list</h1>
          <button>
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

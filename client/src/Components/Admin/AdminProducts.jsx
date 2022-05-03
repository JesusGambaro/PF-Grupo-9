import ConfirmPanel from "./ConfirmPanel";
import ShoeForm from "./ShoeForm";
import {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getAllGenders} from "../../redux/actions/getAllUtils";
import {
  deleteShoe,
  getAllProductsAdmin,
  searchProduct,
} from "../../redux/actions/productsAdmin";
import {roleUser} from "../../redux/actions/Loginregister";
import "../../Css/AdminProducts.scss";
import Loading from "../Loading";
import usePagination from "../../hooks/usePagination";
const CardProduct = ({shoe, editShoeFunctions}) => {
  if (shoe.stock) shoe = {...shoe, stocks: shoe.stock};
  const {setFunc} = editShoeFunctions;
  const {openEditorFunc} = editShoeFunctions;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [confirmDialog, setConfirmDialog] = useState(false);
  const {role} = useSelector((store) => store.root);
  const handleDeleteProduct = (id) => {
    if (role.admin){
      dispatch(deleteShoe(window.localStorage.getItem("token"), id));
    }
    else if (role.admin === false) navigate("/home");
  };
  //console.log(shoe);
  return (
    <div className="product-card">
      {confirmDialog && (
        <ConfirmPanel
          textoDisplay={"Are You Sure You Want To Delete It Permanently?"}
          handleDelete={() => {
            handleDeleteProduct(shoe.id);
            setConfirmDialog(false);
          }}
          cancelDelete={() => setConfirmDialog(false)}
        />
      )}
      <img src={shoe?.images[0]?.url} alt="" />
      <p>{shoe.brand + " - " + shoe.model}</p>
      <p>$ {shoe.price}</p>
      <p
        style={
          !shoe.stocks.length
            ? {background: "#FF5F00"}
            : {background: "#B4E197"}
        }
      >
        {!shoe.stocks.length ? "Out of stock" : "In stock"}
      </p>
      {shoe.createdAt && (
        <p>{shoe.createdAt.substring(0, shoe.createdAt.indexOf("T"))}</p>
      )}
      <div className="actions">
        <button
          onClick={() => {
            setFunc(shoe);
            openEditorFunc();
          }}
        >
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
  const [ShoeToEdit, setShoeToEdit] = useState();
  const dispatch = useDispatch();
  const handleShoeToEdit = (param) => {
    if (param) {
      let newShoe = {};
      console.log("-------------------------New Shoe-------------------------");
      Object.keys(param).map((e) => {
        let value = param[e];
        switch (e) {
          case "price":
            return (newShoe = {...newShoe, [e]: value});
          case "id":
            return (newShoe = {...newShoe, [e]: value});

          case "model":
            return (newShoe = {...newShoe, [e]: value});

          case "description":
            return (newShoe = {...newShoe, [e]: value});

          case "sale":
            return (newShoe = {...newShoe, [e]: value});

          case "color":
            return (newShoe = {...newShoe, [e]: value});

          case "brand":
            return (newShoe = {...newShoe, [e]: value});

          case "gender":
            return (newShoe = {...newShoe, [e]: value});

          case "category":
            return (newShoe = {...newShoe, [e]: value});

          case "images":
            value = value.map((e) => {
              return {url: e.url};
            });
            return (newShoe = {...newShoe, [e]: value});
          case "stocks":
            value = value.map((e) => {
              return {size: e.size, amount: e.amount};
            });
            return (newShoe = {...newShoe, stock: value});
          default:
            return;
        }
      });
      setShoeToEdit(newShoe);
      console.log(newShoe);
      console.log("-------------------------New Shoe-------------------------");
    } else setShoeToEdit(param);
  };
  const {products, loading} = useSelector((state) => state.admin);
  const {categories, genders, role} = useSelector((state) => state.root);
  const {Pagination, dataPerPage} = usePagination(products, 12, 4);
  const navigate = useNavigate();
  const [shoeDialog, setShoeDialog] = useState(false);
  shoeDialog
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");

  useEffect(() => {
    if (role.admin) {
      const token = window.localStorage.getItem("token");
      if (!products.length) dispatch(getAllProductsAdmin(token));
      if (!genders.length) dispatch(getAllGenders(token));
      dispatch(roleUser(token));
    } else if (role.admin === false) {
      navigate("/home");
    }
  }, [dispatch, navigate, products.length, role.admin]);
  /* ---------------------------------- searh --------------------------------- */
  const [searchParam, setSearchParam] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    if (role.admin) {
      dispatch(
        searchProduct(window.localStorage.getItem("token"), searchParam)
      );
    } else if (role.admin === false) {
      navigate("/home");
    }
  };
  /* ---------------------------------- searh --------------------------------- */
  return (
    <div className="admin-container">
      {shoeDialog && (
        <ShoeForm
          handleShoeDialog={() => {
            handleShoeToEdit(undefined);
            setShoeDialog(false);
          }}
          shoeObject={ShoeToEdit}
        />
      )}

      <div className="products-section-container">
        <div className="add-section">
          <h1>Products list</h1>
          <form
            className="searchOwn"
            onSubmit={handleSearch}
            onClick={() => {
              //dispatch(resetState());
              //dispatch(resetFilters());
            }}
          >
            <button type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <input
              type="text"
              placeholder="SEARCH"
              value={searchParam}
              onChange={(e) => setSearchParam(e.target.value)}
            />
          </form>
          <button onClick={() => setShoeDialog(true)}>
            <i className="bi bi-plus"></i> Add New Shoe
          </button>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className="products-cards-container">
            {products.length > 0 ? (
              dataPerPage().map((shoe, id) => {
                return shoe.hasOwnProperty("msg") ? (
                  <h2 key={id}>{shoe.msg}</h2>
                ) : (
                  <CardProduct
                    key={id}
                    shoe={shoe}
                    editShoeFunctions={{
                      setFunc: (param) => handleShoeToEdit(param),
                      openEditorFunc: () => {
                        setShoeDialog(true);
                      },
                    }}
                  />
                );
              })
            ) : (<h2>No results</h2>)}
            <Pagination />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;

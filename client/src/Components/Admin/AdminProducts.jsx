import ClosedSideBarAdmin from "./ClosedSideBarAdmin";
import AdminNav from "./AdminNav";
const AdminProducts = () => {
  return (
    /*Hola bro, todo bien pa */
    <div className="container-fluid admin-container">
      <ClosedSideBarAdmin />
      <div className="adminNav">
        <AdminNav section="Purchases and Orders" />
      </div>

      <div className="products-section-container">
        
      </div>
    </div>
  );
};

export default AdminProducts;

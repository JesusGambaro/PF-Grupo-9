import ClosedSideBarAdmin from "./ClosedSideBarAdmin";
import AdminNav from "./AdminNav";
const AdminCustomers = () => {
  return (
    <div className="container-fluid admin-container">
      <ClosedSideBarAdmin />
      <div className="adminNav">
        <AdminNav section="Customers" />
      </div>

      <div className="customers-section-container"></div>
    </div>
  );
};

export default AdminCustomers;

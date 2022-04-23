import "../../Css/AdminCustomers.scss";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {deleteUser, getAllUsers} from "../../redux/actions/userAdmin";
import {useEffect} from "react";

const UserCard = ({user}) => {
  const dispatch = useDispatch();
  const DeleteUser = async (userName) => {
    //await axios.delete(`http://localhost:3001/allFootwear/${id}`);
    dispatch(deleteUser(userName));
  };
  return (
    <div className="user-card">
      <div className="user-profile">
        <i class="bi bi-person-circle"></i>
      </div>
      <p>$ {user.userName}</p>
      <p
        className="isAdmin-pop"
        style={user.isAdmin ? {background: "#069A8E"} : {background: "#F55353"}}
      >
        {user.isAdmin ? "Is admin" : "Not admin"}
      </p>
      <p>{user.email}</p>
      <p>{user.password.replace(/./g, "*").substring(0, 10)}</p>
      <div className="actions">
        <button>
          <i class="bi bi-pen"></i>
          {user.isAdmin ? "Remove admin" : "Make admin"}
        </button>
        <button
          onClick={() => {
            DeleteUser(user.userName);
          }}
        >
          <i class="bi bi-trash"></i> Delete
        </button>
      </div>
    </div>
  );
};

const AdminCustomers = () => {
  const users = useSelector((state) => state.admin.users);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!users.length) dispatch(getAllUsers());
  }, []);
  return (
    <div className="admin-container">
      <div className="customers-section-container">
        <div className="add-section">
          <h1>Customers list</h1>
        </div>
        <div className="customers-cards-container">
          {users.map((user, id) => (
            <UserCard key={id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminCustomers;

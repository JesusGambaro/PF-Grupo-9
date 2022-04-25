import "../../Css/AdminCustomers.scss";
import {useSelector, useDispatch} from "react-redux";
import ConfirmPanel from "./ConfirmPanel";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {
  deleteUser,
  getAllUsers,
  changeUserRole,
} from "../../redux/actions/userAdmin";
import {useEffect} from "react";
import {roleUser} from "../../redux/actions/Loginregister";

const UserCard = ({user, handleDeleteUser, handleUpdateUser, disabled}) => {
  const [confirmState, setConfirmState] = useState(false);
  return (
    <div className="user-card">
      {confirmState && (
        <ConfirmPanel
          textoDisplay={"Are You Sure You Want To Delete The User?"}
          handleDelete={() => {
            handleDeleteUser(user.email);
            setConfirmState(false);
          }}
          cancelDelete={() => setConfirmState(false)}
        />
      )}
      <div className="user-profile">
        <i className="bi bi-person-circle"></i>
      </div>
      <p>$ {user.userName}</p>
      <p
        className="isAdmin-pop"
        style={user.isAdmin ? {background: "#069A8E"} : {background: "#F55353"}}
      >
        {user.isAdmin ? "Is admin" : "Not admin"}
      </p>
      <p>{user.email}</p>
      {user.password && (
        <p>{user.password.replace(/./g, "*").substring(0, 10)}</p>
      )}
      <div className="actions">
        <button onClick={() => handleUpdateUser(user.email, user.isAdmin)}>
          <i className="bi bi-pen"></i>
          {user.isAdmin ? "Remove admin" : "Make admin"}
        </button>
        <button
          onClick={() => setConfirmState(true) /*handleDeleteUser(user.email)*/}
        >
          <i className="bi bi-trash"></i> Delete
        </button>
      </div>
    </div>
  );
};

const AdminCustomers = () => {
  const users = useSelector((state) => state.admin.users);
  const {role} = useSelector((store) => store.root);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      if (!users.length) {
        const token = window.localStorage.getItem("token");
        dispatch(roleUser(token));
        if (role.admin) {
          dispatch(getAllUsers(token));
        } else if (role.admin === false) {
          navigate("/home");
        }
      }
    }
  }, [dispatch, navigate, role.admin, users.length]);

  const handleDeleteUser = (email) => {
    if (role.admin) {
      if (users.length > 1)
        dispatch(deleteUser(window.localStorage.getItem("token"), {email}));
    } else if (role.admin === false) {
      navigate("/home");
    }
  };
  const handleUpdateUser = (email, state) => {
    if (role.admin) {
      dispatch(
        changeUserRole(window.localStorage.getItem("token"), {
          email,
          adminState: !state,
        })
      );
    } else if (role.admin === false) {
      navigate("/home");
    }
  };
  return (
    <div className="admin-container">
      <div className="customers-section-container">
        <div className="add-section">
          <h1>Customers list</h1>
        </div>
        <div className="customers-cards-container">
          {users.map((user, id) => (
            <UserCard
              key={id}
              user={user}
              handleDeleteUser={(email) => handleDeleteUser(email)}
              handleUpdateUser={(email, state) =>
                handleUpdateUser(email, state)
              }
              disabled={users.length < 2 || user.isAdmin}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminCustomers;

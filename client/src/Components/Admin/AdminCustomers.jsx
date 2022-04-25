import "../../Css/AdminCustomers.scss";
import {useSelector, useDispatch} from "react-redux";
import ConfirmPanel from "./ConfirmPanel";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import Loading from "../Loading";
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
  const {users, loading} = useSelector((state) => state.admin);
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

  /* ------------------------------- PAGINATION ------------------------------- */
  const pageLimit = 4,
    cardsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const pages = Math.ceil(users.length / cardsPerPage);

  const nextPage = () => setCurrentPage((currentPage) => currentPage + 1);

  const prevPage = () => setCurrentPage((currentPage) => currentPage - 1);

  const goPage = (e) => setCurrentPage(Number(e.target.textContent));

  useEffect(() => {
    if (users.length < 40) setCurrentPage(1);
  }, [users.length]);

  const dataPerPage = () => {
    const start = currentPage * cardsPerPage - cardsPerPage,
      end = start + cardsPerPage;
    return users.slice(start, end);
  };

  const dividedGroups = () => {
    const start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, i) => {
      let limit = start + i + 1;
      return limit <= pages && limit;
    });
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);
  /* ------------------------------- PAGINATION ------------------------------- */

  return (
    <div className="admin-container">
      {loading ? <Loading /> : false}

      <div className="customers-section-container">
        <div className="add-section">
          <h1>Customers list</h1>
        </div>
        <div className="customers-cards-container">
          {users.length > 0 &&
            dataPerPage().map((user, id) => (
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
        {users.length > 1 && (
          <div className="pagination-container">
            <div className="selectionOwn">
              <button
                className="btnOwn prev"
                onClick={prevPage}
                disabled={currentPage === 1}
              >
                <i className="fa-solid fa-angle-left"></i>
              </button>
              {dividedGroups().map((e, i) => {
                return (
                  e && (
                    <button
                      className={currentPage === e ? "btnOwn active" : "btnOwn"}
                      key={i}
                      onClick={goPage}
                    >
                      {e}
                    </button>
                  )
                );
              })}

              <button
                className="btnOwn next"
                onClick={nextPage}
                disabled={currentPage === pages}
              >
                <i className="fa-solid fa-angle-right"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCustomers;

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
  searchUser,
  filterUsers,
  filterByName,
} from "../../redux/actions/userAdmin";
import {useEffect} from "react";
import {roleUser} from "../../redux/actions/Loginregister";
import usePagination from "../../hooks/usePagination";
import Selection from "./Selection";
import axios from "axios";
const UserCard = ({
  user,
  handleDeleteUser,
  handleUpdateUser,
  isTheMasterOne,
}) => {
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
      <p>{user.userName}</p>
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
      {isTheMasterOne && user.email !== "admin@gmail.com" ? (
        <div className="actions">
          <button onClick={() => handleUpdateUser(user.email, user.isAdmin)}>
            <i className="bi bi-pen"></i>
            {user.isAdmin ? "Remove admin" : "Make admin"}
          </button>
          <button
            onClick={
              () => setConfirmState(true) /*handleDeleteUser(user.email)*/
            }
          >
            <i className="bi bi-trash"></i> Delete
          </button>
        </div>
      ) : (
        <div className="actions"></div>
      )}
    </div>
  );
};

const AdminCustomers = () => {
  const {users, loading} = useSelector((state) => state.admin);
  const {role} = useSelector((store) => store.root);
  const [isTheMasterOne, setIsTheMasterOne] = useState(false);
  const {Pagination, dataPerPage} = usePagination(users, 12, 4);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (!token || (token && !token.length)) navigate("/home");
    else {
      dispatch(roleUser(token));
      if (role.admin) {
        if (!users.length) {
          dispatch(getAllUsers(token));
        }
        (async () => {
          const {data} = await axios.get(
            `https://shoespfhenry.herokuapp.com/user/superAdmin`,
            {
              headers: {
                Authorization: `bearer ${token}`,
              },
            }
          );
          setIsTheMasterOne(data.superAdmin);
        })();
      } else if (role.admin === false) {
        navigate("/home");
      } else {
        dispatch(roleUser(token));
      }
    }
  }, [dispatch, navigate, role.admin, users]);

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

  /* --------------------------------- search --------------------------------- */
  const [searchParam, setSearchParam] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    if (role.admin) {
      dispatch(searchUser(window.localStorage.getItem("token"), searchParam));
    } else if (role.admin === false) {
      navigate("/home");
    }
  };
  /* --------------------------------- search --------------------------------- */
  const handleChange = (e) => {
    if (role.admin) {
      if (e.target.value === "Is admin" || e.target.value === "Not admin") {
        dispatch(
          filterUsers(
            window.localStorage.getItem("token"),
            e.target.value === "Is admin"
          )
        );
      } else if (e.target.value === "All")
        dispatch(getAllUsers(window.localStorage.getItem("token")));
      dispatch(filterByName(e.target.value));
    } else if (role.admin === false) navigate("/home");
  };
  return (
    <div className="admin-container">
      <div className="customers-section-container">
        <div className="add-section">
          <h1>Customers list</h1>
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
          <div className="filter-sortby">
            <Selection
              options={["All", "Is admin", "Not admin", "A-Z", "Z-A"]}
              type="Sort By"
              handleChange={handleChange}
            />
          </div>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className="customers-cards-container">
            {!users.length ? (
              <h2>No results</h2>
            ) : (
              dataPerPage().map((user, id) =>
                user.hasOwnProperty("msg") ? (
                  <h2 key={id}>{user.msg}</h2>
                ) : (
                  <UserCard
                    key={id}
                    user={user}
                    id={id}
                    handleDeleteUser={(email) => handleDeleteUser(email)}
                    handleUpdateUser={(email, state) =>
                      handleUpdateUser(email, state)
                    }
                    isTheMasterOne={isTheMasterOne}
                  />
                )
              )
            )}
            <Pagination />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCustomers;

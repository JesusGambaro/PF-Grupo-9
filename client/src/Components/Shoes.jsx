import Card from "./Card";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import Loading from "./Loading";
import LeftSideFilters from "./LeftSideFilters";
import UpSideBar from "./UpSideBar";
import NavBar from "./NavBar";
const Shoes = () => {
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const start = useRef(false);
  const [toggle, setToggle] = useState(true);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const {data} = await axios.get("http://localhost:3001/sneaks");
      setInfo(data);
      start.current = true;
      setLoading(false);
    })();
  }, [start]);
  return (
    <div className="home-container">
      <NavBar key={"nav"} />
      <div id="scroll-bar"></div>
      <UpSideBar quantity={info.length} handleToggle={(p) => setToggle(p)} />
      <LeftSideFilters />
      {loading ? (
        <Loading />
      ) : (
        <div className={"shoes-container" + (toggle ? "" : " h")}>
          {info.map((e, i) => (
            <Card e={e} key={i} horizontal={!toggle} />
          ))}
        </div>
      )}
    </div>
  );
};
export default Shoes;

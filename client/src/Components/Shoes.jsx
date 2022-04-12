import Card from "./Card";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Loading from "./Loading";
import LeftSideFilters from "./LeftSideFilters";
import UpSideBar from "./UpSideBar";
import { bringAllData } from "../redux/action";
const Shoes = () => {
  /*
    state = undefined
    state.allData
    state ? state.allData
  */
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const start = useRef(false);
  const [toggle, setToggle] = useState(true);
  /*useEffect(() => {
    (async () => {
      setLoading(true);
      const {data} = await axios.get("http://localhost:5000/data");
      setInfo(data);
      start.current = true;
      setLoading(false);
    })();
  }, [start]);*/
  const HandeInfo =(proms) => {
    setInfo(proms);
  }
  useEffect(() => {
    setLoading(true);
    dispatch(bringAllData());
    console.log(a);
    start.current = true;
    setLoading(false);
  }, [start]);

  const scrollBar = document.getElementById("scroll-bar");
  console.log(scrollBar);
  const capo = document.getElementById("capo");
  console.log(capo);
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  window.addEventListener("scroll", () => {
    const scrollTop =
      document.body.scrollTop || document.documentElement.scrollTop;
    scrollBar.style.height = `${(scrollTop / height) * 100}%`;
  });

  return (
    <div className="home-container">
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

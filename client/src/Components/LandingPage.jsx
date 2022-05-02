import "../Css/LandingPage.scss";
import {Link, NavLink} from "react-router-dom";
import React from "react";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "./Card";
import {agregarFiltros} from "../redux/actions/leftSideFilter";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import bringAllData from "../redux/actions/bringAllData";
import getAllSales from "../redux/actions/getAllSales";
import {
  CarouselControl,
  Carousel,
  CarouselItem,
  CarouselIndicators,
} from "reactstrap";
import {addCart} from "../redux/actions/userCart";

export default function LandingPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSales());

  }, [dispatch, addCart]);

  // State for Active index
  const sales = useSelector((state) => state.root.sales);
  const [activeIndex, setActiveIndex] = React.useState(0);

  // State for Animation
  const [animating, setAnimating] = React.useState(false);

  // Sample items for Carousel
  const items = [
    {
      /* caption: 'Sample Caption One', */ src: require("../Images/LandingCarruselKyrieInfinity.png"),
      altText: "Slide One",
      red: "/home",
      filtros: [{name: "namebrand", value: "kyrie"}],
    },
    {
      /* caption: 'Sample Caption Two', */ src: "https://http2.mlstatic.com/D_NQ_993577-MLA49602953344_042022-OO.webp",
      altText: "Slide Two",
      red: "/home",
      filtros: [{name: "discount", value: "On Discount"}],
    },
    {
      /* caption: 'Sample Caption Two', */ src: require("../Images/LandingCarruselRunningShoes.png"),
      altText: "Slide Two",
      red: "/home",
      filtros: [{name: "category", value: "Running"}],
    },
  ];

  // Items array length
  const itemLength = items.length - 1;

  // Previous button for Carousel
  const previousButton = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? itemLength : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  // Next button for Carousel
  const nextButton = () => {
    if (animating) return;
    const nextIndex = activeIndex === itemLength ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  // Carousel Item Data
  const carouselItemData = items.map((item, i) => {
    return (
      <CarouselItem
        key={i}
        onExited={() => setAnimating(false)}
        onExiting={() => setAnimating(true)}
      >
        <NavLink
          to={item.red}
          onClick={() => {
            dispatch(agregarFiltros(item.filtros));
          }}
        >
          <img src={item.src} alt={item.altText} width="100%" height="200%" />
        </NavLink>
      </CarouselItem>
    );
  });

  return (
    <div style={{width: "100%"}}>
      {/* <NavBar/> */}
      <div
        style={{
          display: "block",
          width: "100%",
          padding: 10,
        }}
        className="container-fluid"
      >
        <Carousel
          previous={previousButton}
          next={nextButton}
          activeIndex={activeIndex}
        >
          <CarouselIndicators
            items={items}
            activeIndex={activeIndex}
            onClickHandler={(newIndex) => {
              if (animating) return;
              setActiveIndex(newIndex);
            }}
          />
          {carouselItemData}
          <CarouselControl
            directionText="Prev"
            direction="prev"
            onClickHandler={previousButton}
          />
          <CarouselControl
            directionText="Next"
            direction="next"
            onClickHandler={nextButton}
          />
        </Carousel>
      </div>
      <h1 className="oferta">ON DISCOUNT</h1>

      <div className="cards-container">
        {sales.length > 0 &&
          sales.map((shoe, i) => (
            <div key={i} className="landing-card col col-3">
              <Card e={shoe} key={shoe.id} />
            </div>
          ))}
      </div>

      <Footer />
    </div>
  );
}

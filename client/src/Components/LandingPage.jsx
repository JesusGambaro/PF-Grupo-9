import "../Css/LandingPage.scss";
import {Link, NavLink} from "react-router-dom";
import React from "react";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "./Card";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import bringAllData from "../redux/actions/bringAllData";

import {
  CarouselControl,
  Carousel,
  CarouselItem,
  CarouselIndicators,
} from "reactstrap";

export default function LandingPage() {
  // State for Active index
  const state = useSelector((state) => state.allData);
  const offers = [...state].splice(0, 4);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const dispatch = useDispatch();
  // State for Animation
  const [animating, setAnimating] = React.useState(false);

  // Sample items for Carousel
  const items = [
    {
      /* caption: 'Sample Caption One', */ src: require("../Images/calzado al mejor precio fondo morado.jpg"),
      altText: "Slide One",
      red: "/home",
    },
    {
      /* caption: 'Sample Caption Two', */ src: "https://http2.mlstatic.com/D_NQ_993577-MLA49602953344_042022-OO.webp",
      altText: "Slide Two",
      red: "/home",
    },
    {
      /* caption: 'Sample Caption Two', */ src: require("../Images/zapatos fondo gris.png"),
      altText: "Slide Two",
      red: "/home",
    },
  ];
  useEffect(() => {
    if (!state.length) dispatch(bringAllData());
  }, []);
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
  const carouselItemData = items.map((item) => {
    return (
      <CarouselItem
        key={item.src}
        onExited={() => setAnimating(false)}
        onExiting={() => setAnimating(true)}
      >
        <NavLink to={item.red}>
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

      <div className="cards-container">
        {state.length > 0 &&
          offers.map((shoe, i) => <Card e={shoe} key={i} />)}
      </div>

      <Footer />
    </div>
  );
}

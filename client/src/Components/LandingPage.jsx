import "../Css/LandingPage.css";
import {Link} from "react-router-dom";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  CarouselControl,
  Carousel,
  CarouselItem,
  CarouselIndicators,
} from "reactstrap";

export default function LandingPage() {
  // State for Active index
  const [activeIndex, setActiveIndex] = React.useState(0);

  // State for Animation
  const [animating, setAnimating] = React.useState(false);

  // Sample items for Carousel
  const items = [
    {
      /* caption: 'Sample Caption One', */ src: require("../Images/calzado al mejor precio fondo morado.jpg"),
      altText: "Slide One",
    },
    {
      /* caption: 'Sample Caption Two', */ src: "https://http2.mlstatic.com/D_NQ_993577-MLA49602953344_042022-OO.webp",
      altText: "Slide Two",
    },
    {
      /* caption: 'Sample Caption Two', */ src: require("../Images/zapatos fondo gris.png"),
      altText: "Slide Two",
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
  const carouselItemData = items.map((item) => {
    return (
      <CarouselItem
        key={item.src}
        onExited={() => setAnimating(false)}
        onExiting={() => setAnimating(true)}
      >
        <img src={item.src} alt={item.altText} width="100%" height="200%" />
      </CarouselItem>
    );
  });

  return (
    <div className="landingpage-container">
      <div
        style={{
          display: "visible",
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

      <div className="cards">
        <Link to="/">
          <img
            alt="shortcut"
            className="foto-card"
            src="https://calzatodocol.vteximg.com.br/arquivos/ids/187217-292-292/1312100011_blanco-azul_01.jpg?v=637783622330730000"
          ></img>
        </Link>
        <Link to="/">
          <img
            alt="shortcut"
            className="foto-card"
            src="https://calzatodocol.vteximg.com.br/arquivos/ids/187217-292-292/1312100011_blanco-azul_01.jpg?v=637783622330730000"
          ></img>
        </Link>
        <Link to="/">
          <img
            alt="shortcut"
            className="foto-card"
            src="https://calzatodocol.vteximg.com.br/arquivos/ids/187217-292-292/1312100011_blanco-azul_01.jpg?v=637783622330730000"
          ></img>
        </Link>
        <Link to="/">
          <img
            alt="shortcut"
            className="foto-card"
            src="https://calzatodocol.vteximg.com.br/arquivos/ids/187217-292-292/1312100011_blanco-azul_01.jpg?v=637783622330730000"
          ></img>
        </Link>
        <Link to="/">
          <img
            alt="shortcut"
            className="foto-card"
            src="https://calzatodocol.vteximg.com.br/arquivos/ids/187217-292-292/1312100011_blanco-azul_01.jpg?v=637783622330730000"
          ></img>
        </Link>
        <Link to="/">
          <img
            alt="shortcut"
            className="foto-card"
            src="https://calzatodocol.vteximg.com.br/arquivos/ids/187217-292-292/1312100011_blanco-azul_01.jpg?v=637783622330730000"
          ></img>
        </Link>
      </div>

      <div className="images-container">
        <Link to="/">
          <img
            alt="shortcut"
            className="icons"
            src="https://cdn-icons-png.flaticon.com/512/53/53283.png"
          ></img>
        </Link>
        <Link to="/">
          <img
            alt="shortcut"
            className="icons"
            src="https://static.vecteezy.com/system/resources/previews/001/196/883/non_2x/basketball-png.png"
          ></img>
        </Link>
        <Link to="/">
          <img
            alt="shortcut"
            className="icons"
            src="https://cdn-icons-png.flaticon.com/512/2362/2362563.png"
          ></img>
        </Link>
        <Link to="/">
          <img
            alt="shortcut"
            className="icons"
            src="https://cdn-icons-png.flaticon.com/512/82/82705.png"
          ></img>
        </Link>
        <Link to="/">
          <img
            alt="shortcut"
            className="icons"
            src="https://cdn-icons-png.flaticon.com/512/1851/1851806.png"
          ></img>
        </Link>
      </div>

      <footer className="footer">Información de contácto:</footer>
    </div>
  );
}
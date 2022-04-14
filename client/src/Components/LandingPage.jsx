import '../Css/LandingPage.css'
import { Link } from "react-router-dom";
import React from 'react'
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    CarouselControl,
    Carousel,
    CarouselItem,
    CarouselIndicators,
} from 'reactstrap';


  
export default function LandingPage() {
    
    // State for Active index
    const [activeIndex, setActiveIndex] = React.useState(0);
  
    // State for Animation
    const [animating, setAnimating] = React.useState(false);
  
    // Sample items for Carousel
    const items = [
        {
            /* caption: 'Sample Caption One', */src: require(
'../Images/calzado al mejor precio fondo morado.jpg'),
            altText: 'Slide One'
        },
        {
            /* caption: 'Sample Caption Two', */src: 
'https://http2.mlstatic.com/D_NQ_993577-MLA49602953344_042022-OO.webp',
            altText: 'Slide Two'
        },
        {
            /* caption: 'Sample Caption Two', */src: require(
'../Images/zapatos fondo gris.png'),
            altText: 'Slide Two'
        }

    ];
  
    // Items array length
    const itemLength = items.length - 1
  
    // Previous button for Carousel
    const previousButton = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ?
            itemLength : activeIndex - 1;
        setActiveIndex(nextIndex);
    }
  
    // Next button for Carousel
    const nextButton = () => {
        if (animating) return;
        const nextIndex = activeIndex === itemLength ?
            0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }
  
    // Carousel Item Data
    const carouselItemData = items.map((item) => {
        return (
            <CarouselItem
                key={item.src}
                onExited={() => setAnimating(false)}
                onExiting={() => setAnimating(true)}
            >
                <img src={item.src} alt={item.altText} width='100%' height='200%' />
            </CarouselItem>
        );
    });
  
    return (
        <div>{/* <NavBar/> */}
        <div style={{
            display: 'block', width: '100%', padding: 10
        }} className='container-fluid'>
            
            <Carousel previous={previousButton} next={nextButton} 
                activeIndex={activeIndex}>
                <CarouselIndicators items={items} 
                    activeIndex={activeIndex}
                    onClickHandler={(newIndex) => {
                        if (animating) return;
                        setActiveIndex(newIndex);
                    }} />
                {carouselItemData}
                <CarouselControl directionText="Prev" 
                    direction="prev" onClickHandler={previousButton} />
                <CarouselControl directionText="Next"
                    direction="next" onClickHandler={nextButton} />
            </Carousel>

            

        </div>
              
        <div className='cards-container'>
            <div className='card' >
                <div className='card-encabezado' >
                <img className='foto-card' src='https://calzatodocol.vteximg.com.br/arquivos/ids/187217-292-292/1312100011_blanco-azul_01.jpg?v=637783622330730000' alt='imagen'></img>
                </div>
                <div className='card-contenido'>
                    <div className='info'>shoe name</div>
                    <div className='info'>Price </div>
                    
                </div>
                <div className='card-iconos'>
                  <button className='add'> <li className='agrandar'><i className="bi bi-heart"></i></li> </button>
                   <Link to='/' className='go-detail'><li className='agrandar' >more details</li> </Link>
                  <button className='add' > <li className='agrandar'><i className="bi bi-bag"></i></li></button>
                  
                </div>
                
            
                
            </div>

            <div className='card' >
                <div className='card-encabezado' >
                <img className='foto-card' src='https://calzatodocol.vteximg.com.br/arquivos/ids/187217-292-292/1312100011_blanco-azul_01.jpg?v=637783622330730000' alt='imagen'></img>
                </div>
                <div className='card-contenido'>
                    <div className='info'>shoe name</div>
                    <div className='info'>Price </div>
                    
                </div>
                <div className='card-iconos'>
                  <button className='add'> <li className='agrandar'><i className="bi bi-heart"></i></li> </button>
                   <Link to='/' className='go-detail'><li className='agrandar' >more details</li> </Link>
                  <button className='add' > <li className='agrandar'><i className="bi bi-bag"></i></li></button>
                  
                </div>
                
            
                
            </div>
            <div className='card' >
                <div className='card-encabezado' >
                <img className='foto-card' src='https://calzatodocol.vteximg.com.br/arquivos/ids/187217-292-292/1312100011_blanco-azul_01.jpg?v=637783622330730000' alt='imagen'></img>
                </div>
                <div className='card-contenido'>
                    <div className='info'>shoe name</div>
                    <div className='info'>Price </div>
                    
                </div>
                <div className='card-iconos'>
                  <button className='add'> <li className='agrandar'><i className="bi bi-heart"></i></li> </button>
                   <Link to='/' className='go-detail'><li className='agrandar' >more details</li> </Link>
                  <button className='add' > <li className='agrandar'><i className="bi bi-bag"></i></li></button>
                  
                </div>
                
            
                
            </div>
            <div className='card' >
                <div className='card-encabezado' >
                <img className='foto-card' src='https://calzatodocol.vteximg.com.br/arquivos/ids/187217-292-292/1312100011_blanco-azul_01.jpg?v=637783622330730000' alt='imagen'></img>
                </div>
                <div className='card-contenido'>
                    <div className='info'>shoe name</div>
                    <div className='info'>Price </div>
                    
                </div>
                <div className='card-iconos'>
                  <button className='add'> <li className='agrandar'><i className="bi bi-heart"></i></li> </button>
                   <Link to='/' className='go-detail'><li className='agrandar' >more details</li> </Link>
                  <button className='add' > <li className='agrandar'><i className="bi bi-bag"></i></li></button>
                  
                </div>
                
            
                
            </div>
            <div className='card' >
                <div className='card-encabezado' >
                <img className='foto-card' src='https://calzatodocol.vteximg.com.br/arquivos/ids/187217-292-292/1312100011_blanco-azul_01.jpg?v=637783622330730000' alt='imagen'></img>
                </div>
                <div className='card-contenido'>
                    <div className='info'>shoe name</div>
                    <div className='info'>Price </div>
                    
                </div>
                <div className='card-iconos'>
                  <button className='add'> <li className='agrandar'><i className="bi bi-heart"></i></li> </button>
                   <Link to='/' className='go-detail'><li className='agrandar' >more details</li> </Link>
                  <button className='add' > <li className='agrandar'><i className="bi bi-bag"></i></li></button>
                  
                </div>
                
            
                
            </div>

             

            <div className='card' >
                <div className='card-encabezado' >
                <img className='foto-card' src='https://calzatodocol.vteximg.com.br/arquivos/ids/187217-292-292/1312100011_blanco-azul_01.jpg?v=637783622330730000' alt='imagen'></img>
                </div>
                <div className='card-contenido'>
                    <div className='info'>shoe name</div>
                    <div className='info'>Price </div>
                    
                </div>
                <div className='card-iconos'>
                  <button className='add'> <li className='agrandar'><i className="bi bi-heart"></i></li> </button>
                   <Link to='/' className='go-detail'><li className='agrandar' >more details</li> </Link>
                  <button className='add' > <li className='agrandar'><i className="bi bi-bag"></i></li></button>
                  
                </div>
                
            
                
            </div>


                
            </div>

       
            
        <Footer/>
        </div>
    );
}
  
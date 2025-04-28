import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './CarouselC.css';

const CarouselC = () => {
  return (
    <div className="carousel-container my-3">
      <Carousel fade interval={5000} className="tech-carousel">
        <Carousel.Item>
          <img 
            src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
            alt="Laptop premium" 
            className="carousel-image" 
          />
          <Carousel.Caption className="carousel-caption">
            <h3>Nueva Colección de Laptops</h3>
            <p>Descubre nuestra línea premium de laptops con la última tecnología.</p>
          </Carousel.Caption>
        </Carousel.Item>
        
        <Carousel.Item>
          <img 
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
            alt="Componentes electrónicos" 
            className="carousel-image" 
          />
          <Carousel.Caption className="carousel-caption">
            <h3>Componentes de Alta Gama</h3>
            <p>Todo lo que necesitas para armar tu PC de ensueño.</p>
          </Carousel.Caption>
        </Carousel.Item>
        
        <Carousel.Item>
          <img 
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
            alt="Persona trabajando en laptop" 
            className="carousel-image" 
          />
          <Carousel.Caption className="carousel-caption">
            <h3>Soluciones para Profesionales</h3>
            <p>Equipos diseñados para maximizar tu productividad.</p>
          </Carousel.Caption>
        </Carousel.Item>
        
        <Carousel.Item>
          <img 
            src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
            alt="Setup moderno" 
            className="carousel-image" 
          />
          <Carousel.Caption className="carousel-caption">
            <h3>Hasta 40% de Descuento</h3>
            <p>Ofertas especiales en nuestra selección de productos destacados.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default CarouselC;
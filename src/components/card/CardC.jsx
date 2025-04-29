import React from 'react';
import Card from 'react-bootstrap/Card';
import './CardC.css';
import { Link } from 'react-router-dom';

const CardC = ({ urlImage, alt, titulo, descripcion, idProducto, precio }) => {
  return (
    <Card className="product-card">
      <div className="card-img-container">
        <Card.Img variant="top" src={urlImage} alt={alt} />
        <div className="card-overlay">
          <Link to={`/productDetail/${idProducto}`} className="view-details-btn">
            Ver Detalle
          </Link>
        </div>
      </div>
      <Card.Body>
        <div className="card-price-tag">${precio}</div>
        <Card.Title className="product-title">{titulo}</Card.Title>
        <Card.Text className="product-description">
          {descripcion}
        </Card.Text>
        <div className="card-actions">
          <Link to={`/productDetail/${idProducto}`} className=" card-btn text-decoration-none">

            VER MAS
            
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardC;

import CarouselC from "../components/carousel/CarouselC";
import { useEffect, useState } from "react";
import CardC from "../components/card/CardC";
import { Col, Container, Row } from "react-bootstrap";
import productosData from "../Producto.json";
import { useChangeTitle } from "../helpers/useChangeTitlePage";

const HomePage = () => {
  useChangeTitle('home')


  const [productos, setProductos] = useState([]);

  const obtenerProductos = () => {
    try {
      let productoLs = JSON.parse(localStorage.getItem("productos")) || [];

      if (productoLs.length === 0) {
        productoLs = productosData.map((producto) => ({
          ...producto,
          status: "enable",
        }));
        localStorage.setItem("productos", JSON.stringify(productoLs));
      }
      setProductos(productoLs);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  
  const productosHabilitados = productos.filter(
    (producto) => producto.status !== "disabled"
  );

  return (
    <>
      <CarouselC />
      <Container className="my-5">
        
        <Row>
          {productosHabilitados
            .slice(0, Math.ceil(productosHabilitados.length / 2))
            .map((producto) => (
              <Col sm="12" md="6" lg="4" key={producto.id} className="my-3 d-flex justify-content-center">
                <CardC
                  urlImage={producto.image}
                  alt={producto.description}
                  titulo={producto.title}
                  descripcion={producto.description}
                  precio={producto.price}
                  idProducto={producto.id}
                />
              </Col>
            ))}
        </Row>

        
        <Row className="justify-content-center my-4">
          <Col sm="12" md="8" lg="6" className="text-center">
            <div className="promo-banner">
              <h2>🔥 ¡40% de descuento en toda la tienda! 🔥</h2>
            </div>
          </Col>
        </Row>

        
        <Row>
          {productosHabilitados
            .slice(Math.ceil(productosHabilitados.length / 2))
            .map((producto) => (
              <Col sm="12" md="6" lg="4" key={producto.id} className="my-3 d-flex justify-content-center">
                <CardC
                  urlImage={producto.image}
                  alt={producto.description}
                  titulo={producto.title}
                  descripcion={producto.description}
                  precio={producto.price}
                  idProducto={producto.id}
                />
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
};

export default HomePage;

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import Swal from "sweetalert2";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const productosLs = JSON.parse(localStorage.getItem("productos")) || [];
    const productoEncontrado = productosLs.find(
      (producto) => producto.id === Number(id)
    );

    if (productoEncontrado) {
      setProducto(productoEncontrado);
    }
  }, [id]);

  
  if (!producto) return <p>Cargando producto...</p>;

  const agregarProductoCarrito = () => {
    const usuarioLogeado = JSON.parse(sessionStorage.getItem('usuarioLogeado')) || null;
    const carritoLs = JSON.parse(localStorage.getItem('carrito')) || [];

    if (!usuarioLogeado) {
      Swal.fire({
        icon: "info",
        title: "Debes iniciar sesion para poder comprar",
        text: "En breve seras redirigido a iniciar tu sesion",
      });

      setTimeout(() => {
        navigate('/LoginPage');
      }, 500);
      return; 
    }

    const productoExisteCarrito = carritoLs.find((prod) => prod.id === Number(id));

    if (productoExisteCarrito) {
      Swal.fire({
        icon: "info",
        title: "El producto ya esta cargado en el carrito",
        text: "Para modificar la cantidad debes ir al carrito",
      });
      return;
    }

    carritoLs.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carritoLs));
    Swal.fire({
      icon: "success",
      title: "El producto se cargo al carrito con exito",
      text: "Podes modificar la cantidad desde el carrito",
    });
  };

  const comprarProductoMP = () => {
    const usuarioLogeado = JSON.parse(sessionStorage.getItem('usuarioLogeado')) || null;

    if (!usuarioLogeado) {
      Swal.fire({
        icon: "info",
        title: "Debes iniciar sesion para poder comprar",
        text: "En breve seras redirigido a iniciar tu sesion",
      });

      setTimeout(() => {
        navigate('/LoginPage');
      }, 500);
      return;
    }

   
  };

  return (
    <Container className="my-5">
      <Row>
        <Col sm="12" md="6" className="col-img-detalle-producto text-center">
          <img src={producto.image} alt={producto.description} />
        </Col>
        <Col sm="12" md="6">
          <h2 className="producto-titulo">{producto.title}</h2>
          <p className="producto-detalles">${producto.price}</p>
          <p className="producto-detalle-descripcion">{producto.description}</p>

          <Button className="mx-3 producto-boton" variant="warning"  onClick={agregarProductoCarrito}>
            Agregar al Carrito
          </Button>
          <Button className="producto-boton" variant="success" onClick={comprarProductoMP}>
            Comprar
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;

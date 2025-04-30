import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import Swal from "sweetalert2";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [producto, setProducto] = useState(null);
  const [esFavorito, setEsFavorito] = useState(false); 

  useEffect(() => {
    const productosLs = JSON.parse(localStorage.getItem("productos")) || [];
    const productoEncontrado = productosLs.find(
      (producto) => producto.id === Number(id)
    );

    if (productoEncontrado) {
      setProducto(productoEncontrado);
    }

    
    const usuario = localStorage.getItem("usuarioActual") || "invitado";
    const key = `wishlist_${usuario}`;
    const listaIds = JSON.parse(localStorage.getItem(key)) || [];
    if (listaIds.includes(Number(id))) {
      setEsFavorito(true);
    }
  }, [id]);

  
  if (!producto) return <p>Cargando producto...</p>;

  
  const agregarAFavoritos = () => {
    const usuario = localStorage.getItem("usuarioActual") || "invitado";
    const key = `wishlist_${usuario}`;
    const listaIds = JSON.parse(localStorage.getItem(key)) || [];
    if (!listaIds.includes(Number(id))) {
      listaIds.push(Number(id));
      localStorage.setItem(key, JSON.stringify(listaIds));
      setEsFavorito(true); 
      Swal.fire({
        icon: "success",
        title: "Producto agregado a favoritos",
        text: "Ahora puedes verlo en tu lista de favoritos.",
      });
    }
  };

  
  const quitarDeFavoritos = () => {
    const usuario = localStorage.getItem("usuarioActual") || "invitado";
    const key = `wishlist_${usuario}`;
    let listaIds = JSON.parse(localStorage.getItem(key)) || [];
    listaIds = listaIds.filter((idFavorito) => idFavorito !== Number(id)); 
    localStorage.setItem(key, JSON.stringify(listaIds));
    setEsFavorito(false); 
    Swal.fire({
      icon: "info",
      title: "Producto eliminado de favoritos",
      text: "Ya no está en tu lista de favoritos.",
    });
  };

  const agregarProductoCarrito = () => {
    const usuarioLogeado = JSON.parse(sessionStorage.getItem('usuarioLogeado')) || null;
    const carritoLs = JSON.parse(localStorage.getItem('carrito')) || [];

    if (!usuarioLogeado) {
      Swal.fire({
        icon: "info",
        title: "Debes iniciar sesión para poder comprar",
        text: "En breve serás redirigido a iniciar tu sesión",
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
        title: "El producto ya está cargado en el carrito",
        text: "Para modificar la cantidad debes ir al carrito",
      });
      return;
    }

    carritoLs.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carritoLs));
    Swal.fire({
      icon: "success",
      title: "El producto se cargó al carrito con éxito",
      text: "Puedes modificar la cantidad desde el carrito",
    });
  };

  const comprarProductoMP = () => {
    const usuarioLogeado = JSON.parse(sessionStorage.getItem('usuarioLogeado')) || null;

    if (!usuarioLogeado) {
      Swal.fire({
        icon: "info",
        title: "Debes iniciar sesión para poder comprar",
        text: "En breve serás redirigido a iniciar tu sesión",
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

          <Button className="mx-3 producto-boton" variant="warning" onClick={agregarProductoCarrito}>
            Agregar al Carrito
          </Button>
          <Button className="producto-boton" variant="success" onClick={comprarProductoMP}>
            Comprar
          </Button>

          
          {esFavorito ? (
            <Button className="producto-boton" variant="danger" onClick={quitarDeFavoritos}>
              Quitar de Favoritos
            </Button>
          ) : (
            <Button className=" producto-boton" variant="primary" onClick={agregarAFavoritos}>
              Agregar a Favoritos
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;

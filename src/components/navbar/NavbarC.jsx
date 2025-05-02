import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa"; 
import './NavbarC.css'; 

const NavbarC = () => {
  const usuarioLog = JSON.parse(sessionStorage.getItem('usuarioLogeado'));
  const [productos, setProductos] = useState([]);
  const [buscar, setBuscar] = useState("");
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const productosLs = JSON.parse(localStorage.getItem("productos")) || [];
    setProductos(productosLs);
  }, []);

  const filtrarProductos = (texto) => {
    setBuscar(texto);
    if (texto.trim() === "" || texto.length < 3) {
      setProductosFiltrados([]);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const resultado = productos.filter(producto =>
        producto.title.toLowerCase().includes(texto.toLowerCase())
      );
      setProductosFiltrados(resultado.slice(0, 5));
      setLoading(false);
    }, 300);
  };

  const handleBuscarProducto = (e) => {
    e.preventDefault();
    if (buscar.trim() === "") return;

    const productoEncontrado = productos.find((prod) =>
      prod.title.toLowerCase().includes(buscar.toLowerCase())
    );

    if (productoEncontrado) {
      navigate(`/ProductDetail/${productoEncontrado.id}`);
      setBuscar("");
    } else {
      alert("Producto no encontrado");
    }
  };

  const logoutUser = () => {
    const usuariosLs = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuariosLs.find((user) => user.id === usuarioLog?.id);
    if (usuario) {
      usuario.login = false;
      localStorage.setItem('usuarios', JSON.stringify(usuariosLs));
    }
    sessionStorage.removeItem('usuarioLogeado');
    navigate('/');
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <>
      <Navbar expand="lg" className="custom-navbar py-5">
        <Container>
          <NavLink
            to={
              usuarioLog && usuarioLog.rol === 'usuario'
                ? '/UserPage'
                : usuarioLog && usuarioLog.rol === 'admin'
                  ? '/AdminPage'
                  : '/'
            }
            className="brand-logo text-decoration-none me-4"
          >
            GoMiNext
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse  id="basic-navbar-nav">

          
            {usuarioLog && usuarioLog.rol === 'usuario' ? (
              <Nav className="me-auto">
                <NavLink to="/UserPage" className="custom-link text-decoration-none">Inicio</NavLink>
                <NavLink to="/UserCartPage" className="custom-link text-decoration-none">Carrito</NavLink>
                <NavLink to="/UserFavoritos" className="custom-link text-decoration-none">Favoritos</NavLink>
               
              </Nav>
            ) : usuarioLog && usuarioLog.rol === 'admin' ? (
              <Nav className="me-auto">
                <NavLink to="/AdminPage" className="custom-link text-decoration-none">Inicio</NavLink>
                <NavLink to="/AdminPage/user" className="custom-link text-decoration-none">Panel Usuario</NavLink>
                <NavLink to="/AdminPage/products" className="custom-link text-decoration-none">Panel Producto</NavLink>
              </Nav>
            ) : (
              <Nav className="me-auto">
                <NavLink to="/" className="custom-link text-decoration-none">Inicio</NavLink>
                <NavLink to="/AboutUs" className="custom-link text-decoration-none">Sobre Nosotros</NavLink>
              </Nav>
            )}

            
            <Form className="d-none d-md-flex mx-auto" onSubmit={handleBuscarProducto}>
              <Form.Control
                type="search"
                placeholder="Buscar productos"
                className="me-2"
                aria-label="Buscar"
                value={buscar}
                onChange={(e) => filtrarProductos(e.target.value)}
              />
              <Button variant="outline-light" type="submit">Buscar</Button>
            </Form>

            
            {productosFiltrados.length > 0 && buscar.length >= 3 && (
              <div className="autocomplete-results">
                {productosFiltrados.map((producto) => (
                  <NavLink
                    key={producto.id}
                    to={`/ProductDetail/${producto.id}`}
                    className="result-item"
                    onClick={() => setBuscar("")}
                  >
                    {producto.title}
                  </NavLink>
                ))}
                {loading && <div className="loading">Cargando...</div>}
              </div>
            )}

            
            <Nav className="ms-auto align-items-center">
              <NavLink to="/UserCartPage" className="custom-link text-decoration-none me-3 d-none d-md-block">
                <FaShoppingCart size={24} />
              </NavLink>

              {usuarioLog ? (
                <NavLink
                  to="#"
                  onClick={logoutUser}
                  className="custom-link text-decoration-none cerrar-sesion"
                >
                  Cerrar sesión
                </NavLink>
              ) : (
                <>
                  <NavLink to="/LoginPage" className="custom-link text-decoration-none cerrar-sesion me-3">Iniciar Sesión</NavLink>
                </>
              )}
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarC;

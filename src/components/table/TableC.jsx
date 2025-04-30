import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const TableC = ({ array, idPage, funcionReseteador }) => {
  const navigate = useNavigate();

  const usuarioLog = JSON.parse(sessionStorage.getItem('usuarioLogeado'));

  const esAdmin = () => {
    return usuarioLog && usuarioLog.rol === 'admin'; 
  };

  const validarSesion = () => {
    if (!usuarioLog || usuarioLog.rol !== 'admin') {
      Swal.fire({
        title: "Debes iniciar sesión como administrador!",
        icon: "info"
      });
      setTimeout(() => {
        navigate('/LoginPage');
      }, 1000);
      return false;
    }
    return true;
  };

  const borrarProducto = (idProducto) => {
    if (!validarSesion()) return;

    Swal.fire({
      title: "¿Estás seguro de que quieres eliminar este producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        const nuevoArray = array.filter((producto) => producto.id !== idProducto);
        localStorage.setItem('productos', JSON.stringify(nuevoArray));
        funcionReseteador();

        Swal.fire({
          title: "¡Producto eliminado con éxito!",
          icon: "success"
        });
      }
    });
  };

  const deshabilitarOhabilitarProducto = (idProducto) => {
    if (!validarSesion()) return;

    const producto = array.find((producto) => producto.id === idProducto);

    Swal.fire({
      title: `¿Estás seguro de que quieres ${producto.status === 'enable' ? 'deshabilitar' : 'habilitar'} este producto?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, confirmar",
      cancelButtonText: "No, cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        producto.status = producto.status === 'enable' ? 'disabled' : 'enable';
        localStorage.setItem('productos', JSON.stringify(array));
        funcionReseteador();

        Swal.fire({
          title: `¡Producto ${producto.status === 'enable' ? 'habilitado' : 'deshabilitado'} con éxito!`,
          icon: "success"
        });
      }
    });
  };

  const editarProducto = (idProducto) => {
    if (!validarSesion()) return;

    navigate(`/admin/products/createUpdate?id=${idProducto}`);
  };

  return (
    <Table striped bordered hover>
      <thead>
        {idPage === 'products' ? (
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        ) : (
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        )}
      </thead>

      <tbody>
        {array.map((element, i) => {
          if (idPage === 'products') {
            return (
              <tr key={element.id}>
                <td>{i + 1}</td>
                <td className='w-25'>{element.title}</td>
                <td className='w-25'>{element.description}</td>
                <td className='text-center'>${element.price}</td>
                <td>
                  <img src={element.image} alt={element.description} width={50} />
                </td>
                <td>
                  <Button
                    variant='danger'
                    onClick={() => borrarProducto(element.id)}
                  >
                    Eliminar
                  </Button>

                  <Button
                    className='mx-2'
                    variant={element.status === 'enable' ? 'warning' : 'info'}
                    onClick={() => deshabilitarOhabilitarProducto(element.id)}
                  >
                    {element.status === 'enable' ? 'Deshabilitar' : 'Habilitar'}
                  </Button>

                  <Button
                    variant='success'
                    onClick={() => editarProducto(element.id)}
                  >
                    Editar
                  </Button>
                </td>
              </tr>
            );
          } else {
            return (
              <tr key={element.id}>
                <td>{i + 1}</td>
                <td>{element.nombreUsuario}</td>
                <td className='w-25'>{element.emailUsuario}</td>
                <td>{element.rol}</td>
                <td>
                  <Button
                    variant='danger'
                    onClick={() => Swal.fire('Función pendiente')}
                  >
                    Eliminar
                  </Button>

                  <Button
                    className='mx-2'
                    variant='warning'
                    onClick={() => Swal.fire('Función pendiente')}
                  >
                    Deshabilitar
                  </Button>

                  <Button
                    variant='success'
                    onClick={() => Swal.fire('Función pendiente')}
                  >
                    Editar
                  </Button>
                </td>
              </tr>
            );
          }
        })}
      </tbody>
    </Table>
  );
};

export default TableC;

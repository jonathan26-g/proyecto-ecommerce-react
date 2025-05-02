import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const TableC = ({ array, idPage, funcionReseteador }) => {
  const navigate = useNavigate();
  const usuarioLog = JSON.parse(sessionStorage.getItem('usuarioLogeado'));

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

  const borrarElemento = (idElemento) => {
    if (!validarSesion()) return;

    Swal.fire({
      title: `¿Estás seguro de que quieres eliminar este ${idPage === 'products' ? 'producto' : 'usuario'}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        const nuevoArray = array.filter((elemento) => elemento.id !== idElemento);
        localStorage.setItem(idPage === 'products' ? 'productos' : 'usuarios', JSON.stringify(nuevoArray));
        funcionReseteador();

        Swal.fire({
          title: `${idPage === 'products' ? 'Producto' : 'Usuario'} eliminado con éxito!`,
          icon: "success"
        });
      }
    });
  };

  const deshabilitarOhabilitarElemento = (idElemento) => {
    if (!validarSesion()) return;

    const elemento = array.find((e) => e.id === idElemento);

    Swal.fire({
      title: `¿Estás seguro de que quieres ${elemento.status === 'enable' ? 'deshabilitar' : 'habilitar'} este ${idPage === 'products' ? 'producto' : 'usuario'}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, confirmar",
      cancelButtonText: "No, cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        elemento.status = elemento.status === 'enable' ? 'disabled' : 'enable';
        localStorage.setItem(idPage === 'products' ? 'productos' : 'usuarios', JSON.stringify(array));
        funcionReseteador();

        Swal.fire({
          title: `${idPage === 'products' ? 'Producto' : 'Usuario'} ${elemento.status === 'enable' ? 'habilitado' : 'deshabilitado'} con éxito!`,
          icon: "success"
        });
      }
    });
  };

  const editarElemento = (idElemento) => {
    if (!validarSesion()) return;

    navigate(
      idPage === 'products'
        ? `/admin/products/createUpdate?id=${idElemento}`
        : `/admin/users/edit?id=${idElemento}`
    );
  };

  return (
    <div className="table-responsive" >
    <Table striped bordered hover className='mx-0'>
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
        {array.map((element, i) =>
          idPage === 'products' ? (
            <tr key={element.id}>
              <td>{i + 1}</td>
              <td className='w-25'>{element.title}</td>
              <td className='w-25'>{element.description}</td>
              <td className='text-center'>${element.price}</td>
              <td>
                <img src={element.image} alt={element.description} width={50} />
              </td>
              <td>
                <Button variant='danger' onClick={() => borrarElemento(element.id)}>Eliminar</Button>
                <Button className='mx-2' variant={element.status === 'enable' ? 'warning' : 'info'} onClick={() => deshabilitarOhabilitarElemento(element.id)}>
                  {element.status === 'enable' ? 'Deshabilitar' : 'Habilitar'}
                </Button>
                <Button variant='success' onClick={() => editarElemento(element.id)}>Editar</Button>
              </td>
            </tr>
          ) : (
            <tr key={element.id}>
              <td>{i + 1}</td>
              <td>{element.nombreUsuario}</td>
              <td className='w-25'>{element.emailUsuario}</td>
              <td>{element.rol}</td>
              <td>
                <Button variant='danger' onClick={() => borrarElemento(element.id)}>Eliminar</Button>
                <Button className='mx-2' variant={element.status === 'enable' ? 'warning' : 'info'} onClick={() => deshabilitarOhabilitarElemento(element.id)}>
                  {element.status === 'enable' ? 'Deshabilitar' : 'Habilitar'}
                </Button>
                <Button variant='success' onClick={() => editarElemento(element.id)}>Editar</Button>
              </td>
            </tr>
          )
        )}
      </tbody>
    </Table>
    </div>
  );
};

export default TableC;

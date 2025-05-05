import { useEffect, useState } from 'react'
import TableC from '../components/table/TableC'
import { Container, Button } from 'react-bootstrap'  
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const AdminProductsPage = () => {
  const [productos, setProductos] = useState([])
  const usuarioLog = JSON.parse(sessionStorage.getItem('usuarioLogeado'))
  const navigate = useNavigate()

  const obtenerProductos = () => {
    const productosLs = JSON.parse(localStorage.getItem('productos'))
    setProductos(productosLs)
  }

  useEffect(() => {
    obtenerProductos()
  }, [])


  if (!usuarioLog || usuarioLog.rol !== 'admin') {
    return (
      <Container className='my-5'>
        <h2>Acceso restringido</h2>
        <p>Debes iniciar sesión como administrador para acceder a esta página.</p>
      </Container>
    )
  }

  return (
    <Container className='my-5'>
      <div className="d-flex justify-content-end mb-3">
      
      <Button
  variant="primary"
  onClick={() => {
    if (usuarioLog && usuarioLog.rol === 'admin') {
      navigate('/AdminCreateUpdateProduct');
    } else {
      Swal.fire({
        title: "Debes iniciar sesión como administrador!",
        icon: "info"
      });
      setTimeout(() => {
        navigate('/LoginPage');
      }, 1000);
    }
  }}
>
  Agregar Producto
</Button>

      </div>

      <TableC array={productos} idPage='products' funcionReseteador={obtenerProductos} />
    </Container>
  )
}

export default AdminProductsPage

import { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Swal from 'sweetalert2';

const UserCartPage = () => {
  const [productos, setProductos] = useState([]);

  const obtenerProductos = () => {
    const productosLs = JSON.parse(localStorage.getItem('carrito')) || [];
    
    const productosConCantidad = productosLs.map(p => ({ ...p, cantidad: p.cantidad || 1 }));
    setProductos(productosConCantidad);
  };

  const handleChangeQuantity = (ev, idProducto) => {
    const nuevaCantidad = parseInt(ev.target.value);
    const nuevosProductos = productos.map(producto => 
      producto.id === idProducto ? { ...producto, cantidad: nuevaCantidad } : producto
    );
    setProductos(nuevosProductos);

    
    localStorage.setItem('carrito', JSON.stringify(nuevosProductos));
  };

  const eliminarProductoCarrito = (idProducto) => {
    Swal.fire({
      title: "Estas seguro de que quieres eliminar este producto del carrito?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, estoy seguro!",
      cancelButtonText: "NO, no quiero eliminarlo!",
    }).then((result) => {
      if (result.isConfirmed) {
        const carritoActualizado = productos.filter((prod) => prod.id !== idProducto);
        localStorage.setItem("carrito", JSON.stringify(carritoActualizado));
        setProductos(carritoActualizado);

        Swal.fire({
          title: "Producto eliminado con exito del carrito!",
          icon: "success"
        });
      }
    });
  };

  const handleClickPay = (ev) => {
    ev.preventDefault();
    Swal.fire({
      title: "Gracias por tu compra!",
      text: "Te enviaremos por mail el comprobante de tu compra",
      icon: "success"
    });
  };

  useEffect(() => {
    obtenerProductos();
  }, []);


  const totalFinal = productos.reduce((acc, prod) => acc + (prod.price * prod.cantidad), 0);

  return (
    <>
      {
        productos.length
          ?
          <Container className='my-5'>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {
                  productos.map((producto, i) =>
                    <tr key={producto.id}>
                      <td>{i + 1}</td>
                      <td className='w-25'>{producto.title}</td>
                      <td>${producto.price}</td>
                      <td className='w-25'>
                        <input
                          type="number"
                          className='w-25'
                          value={producto.cantidad}
                          min="1"
                          onChange={(e) => handleChangeQuantity(e, producto.id)}
                        />
                      </td>
                      <td>
                        ${producto.price * producto.cantidad}
                      </td>
                      <td className='text-center'>
                        <Button variant='danger' onClick={() => eliminarProductoCarrito(producto.id)}>Eliminar</Button>
                      </td>
                    </tr>
                  )
                }
              </tbody>
            </Table>
            <h3>Total: ${totalFinal}</h3>
            <Button onClick={handleClickPay}>Comprar</Button>
          </Container>
          :
          <h1 className='text-center'>No hay productos cargados en el carrito todavía</h1>
      }
    </>
  )
}

export default UserCartPage;

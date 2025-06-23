import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const FormAdmin = () => {
  const navigate = useNavigate();
  const idParams = new URLSearchParams(location.search).get('id');

  const [formProduct, setFormProduct] = useState({
    title: '',
    description: '',
    price: 0,
    image: ''
  });

  const obtenerProducto = () => {
    const productosLs = JSON.parse(localStorage.getItem('productos'));
    const producto = productosLs.find((prod) => prod.id === Number(idParams));
    setFormProduct(producto);
  };

  const handleChangeProduct = (ev) => {
    setFormProduct({ ...formProduct, [ev.target.name]: ev.target.value });
  };

  const handleClickFormProduct = (ev) => {
    ev.preventDefault();
    const { title, description, price, image } = formProduct;
    const productosLs = JSON.parse(localStorage.getItem('productos')) || [];

  
    if (!title || !description || !image) {
      return Swal.fire({
        title: "Campos incompletos",
        text: "Por favor completá todos los campos.",
        icon: "warning"
      });
    }

    if (Number(price) < 0) {
      return Swal.fire({
        title: "Precio inválido",
        text: "El precio no puede ser negativo.",
        icon: "error"
      });
    }

    const nuevoProducto = {
      id: productosLs[productosLs.length - 1]?.id + 1 || 1,
      title,
      description,
      price,
      image
    };

    productosLs.push(nuevoProducto);
    localStorage.setItem('productos', JSON.stringify(productosLs));

    Swal.fire({
      title: "Producto creado con éxito!",
      text: "En breve lo verás en tu lista!",
      icon: "success"
    });

    setTimeout(() => {
      navigate('/adminPage/products');
    }, 500);
  };

  const handleChangeEditProduct = (ev) => {
    ev.preventDefault();

    
    if (!formProduct.title || !formProduct.description || !formProduct.image) {
      return Swal.fire({
        title: "Campos incompletos",
        text: "Por favor completá todos los campos.",
        icon: "warning"
      });
    }

    if (Number(formProduct.price) < 0) {
      return Swal.fire({
        title: "Precio inválido",
        text: "El precio no puede ser negativo.",
        icon: "error"
      });
    }

    const productosLs = JSON.parse(localStorage.getItem('productos'));
    const productoIndex = productosLs.findIndex((prod) => prod.id === Number(idParams));
    productosLs[productoIndex] = formProduct;
    localStorage.setItem('productos', JSON.stringify(productosLs));

    Swal.fire({
      title: "Producto editado con éxito!",
      text: "En breve lo verás en tu lista!",
      icon: "success"
    });

    setTimeout(() => {
      navigate('/adminPage/products');
    }, 500);
  };

  useEffect(() => {
    if (idParams) {
      obtenerProducto();
    }
  }, []);

  return (
    <>
      <Form className='w-25'>
        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name='title'
            value={formProduct.title}
            onChange={handleChangeProduct}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDescription">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            type="text"
            name='description'
            value={formProduct.description}
            onChange={handleChangeProduct}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPrice">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            name='price'
            min="0"
            value={formProduct.price}
            onChange={handleChangeProduct}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicImage">
          <Form.Label>Imagen (URL)</Form.Label>
          <Form.Control
            type="text"
            name='image'
            value={formProduct.image}
            onChange={handleChangeProduct}
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={idParams ? handleChangeEditProduct : handleClickFormProduct}>
          {idParams ? 'Guardar Cambios' : 'Agregar Producto'}
        </Button>
      </Form>
    </>
  );
};

export default FormAdmin;

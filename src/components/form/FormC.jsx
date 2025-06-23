import { Container, Button, Form, Modal } from 'react-bootstrap';
import './FormC.css';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const FormC = ({ idPage }) => {
  const navigate = useNavigate();
  const [errores, setErrores] = useState({});
  const [showModal, setShowModal] = useState(false);

  const [registro, setRegistro] = useState({
    usuario: '',
    email: '',
    contrasenia: '',
    repContrasenia: '',
    check: false,
    rol: 'usuario'
  });

  const [inicioSesion, setInicioSesion] = useState({
    usuario: '',
    contrasenia: ''
  });

  const handleChangeFormRegister = (ev) => {
    const value = ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value;
    setRegistro({ ...registro, [ev.target.name]: value });
  };

  const handleCloseModal = () => {
    
    setRegistro({
      usuario: '',
      email: '',
      contrasenia: '',
      repContrasenia: '',
      check: false,
      rol: 'usuario'
    });
    setErrores({});
    setShowModal(false);
  };

  const registroUsuario = (ev) => {
    ev.preventDefault();
    const { usuario, email, contrasenia, repContrasenia, check } = registro;
    let nuevoError = {};

    
    if (!usuario) nuevoError.usuario = 'El nombre de usuario es obligatorio';
    if (!email) nuevoError.email = 'El email es obligatorio';
    if (!contrasenia) nuevoError.contrasenia = 'La contraseña es obligatoria';
    if (!repContrasenia) nuevoError.repContrasenia = 'Repetir la contraseña es obligatorio';
    if (!check) nuevoError.check = 'Debes aceptar los términos y condiciones';

    if (Object.keys(nuevoError).length > 0) {
      setErrores(nuevoError);

      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Todos los campos son obligatorios. Por favor completá el formulario.",
      });

      return;
    }

    if (contrasenia !== repContrasenia) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Las contraseñas no son iguales!",
      });
      return;
    }

    const usuariosLs = JSON.parse(localStorage.getItem('usuarios')) || [];

    const nuevoUsuario = {
      id: usuariosLs[usuariosLs.length - 1]?.id + 1 || 1,
      nombreUsuario: usuario,
      emailUsuario: email,
      contrasenia,
      tyc: check,
      rol: usuario === 'admin' ? 'admin' : 'usuario',
      login: true,
      status: 'enable'
    };

    usuariosLs.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuariosLs));
    sessionStorage.setItem('usuarioLogeado', JSON.stringify(nuevoUsuario));

    Swal.fire({
      title: "Registro exitoso!",
      text: "Serás redirigido a tu panel.",
      icon: "success"
    });

    setErrores({});
    handleCloseModal(); 

    setTimeout(() => {
      if (usuario === 'admin') {
        navigate('/AdminPage');
      } else {
        navigate('/UserPage');
      }
    }, 1000);
  };

  const handleChangeFormLogin = (ev) => {
    setInicioSesion({ ...inicioSesion, [ev.target.name]: ev.target.value });
  };

  const iniciarSesionUsuario = (ev) => {
    ev.preventDefault();
    const usuariosLs = JSON.parse(localStorage.getItem('usuarios')) || [];
    const { usuario, contrasenia } = inicioSesion;

    const usuarioExiste = usuariosLs.find((user) => user.nombreUsuario === usuario);

    if (!usuarioExiste || usuarioExiste.contrasenia !== contrasenia) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El usuario y/o contraseña son incorrectos.",
      });
      return;
    }

    usuarioExiste.login = true;
    usuarioExiste.rol = usuario === 'admin' ? 'admin' : 'usuario';
    localStorage.setItem('usuarios', JSON.stringify(usuariosLs));
    sessionStorage.setItem('usuarioLogeado', JSON.stringify(usuarioExiste));

    if (usuario === 'admin') {
      navigate('/AdminPage');
    } else {
      navigate('/UserPage');
    }
  };

  return (
    <Container className='d-flex flex-column align-items-center justify-content-center my-5'>
      <Form className='form-login w-100 w-sm-75 w-md-50 w-lg-25'>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nombre del Usuario</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa un nombre de usuario"
            value={inicioSesion.usuario}
            onChange={handleChangeFormLogin}
            name='usuario'
            className={errores.usuario ? 'form-control is-invalid' : 'form-control'}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Colocar una contraseña"
            name='contrasenia'
            value={inicioSesion.contrasenia}
            onChange={handleChangeFormLogin}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          onClick={iniciarSesionUsuario}
          className="w-100"
        >
          Ingresar
        </Button>

        <div className="text-center mt-3">
          <span>¿No tienes cuenta? </span>
          <Button variant="link" onClick={() => setShowModal(true)}>Registrate</Button>
        </div>
      </Form>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Registro de Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={registroUsuario}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre de Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa un nombre de usuario"
                name="usuario"
                value={registro.usuario}
                onChange={handleChangeFormRegister}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu email"
                name="email"
                value={registro.email}
                onChange={handleChangeFormRegister}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Coloca una contraseña"
                name="contrasenia"
                value={registro.contrasenia}
                onChange={handleChangeFormRegister}
              />
              <ul className="lista-contrasenia">
                <li>Una mayúscula</li>
                <li>Una minúscula</li>
                <li>Números</li>
                <li>Carácter especial (@, $, +)</li>
              </ul>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Repetir Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Repetir la contraseña"
                name="repContrasenia"
                value={registro.repContrasenia}
                onChange={handleChangeFormRegister}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Aceptar términos y condiciones"
                name="check"
                checked={registro.check}
                onChange={handleChangeFormRegister}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Registrarme
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default FormC;

import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import avatar from '../assets/avatar.jpg';

import { useChangeTitle } from "../helpers/useChangeTitlePage";

const AboutUs = () => {
  useChangeTitle('aboutUs');

  return (
    <Container className="d-flex justify-content-center mt-5 mb-5">
      <Card
        className="about-card border rounded shadow-lg bg-light text-center p-3 w-100"
        style={{ maxWidth: '800px' }} 
      >
        <Card.Img
          variant="top"
          src={avatar}
          alt="Avatar de Jonathan Gómez"
          className="avatar-img rounded-circle mx-auto mt-3"
          style={{ width: '150px', height: '150px', objectFit: 'cover' }}
        />
        <Card.Body>
          <h1 className="bienvenida fs-3 fw-bold">¡Bienvenido a mi tienda de tecnología!</h1>
          <p className="frase fs-5">
            Detrás de este proyecto estoy yo, con muchas ganas de aprender y crecer en este mundo.
          </p>
          <Card.Title className="nombre fs-5 mt-4">Jonathan Gómez</Card.Title>
          <Card.Text className="descripcion">
            Apasionado por la programación y siempre aprendiendo.
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AboutUs;

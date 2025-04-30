import React from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useChangeTitle } from "../helpers/useChangeTitlePage";

const ErrorPage = () => {
  useChangeTitle("error");
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ height: "80vh" }}>
      <Row className="w-100 align-items-center">
        
        <Col md={6} className="text-center mb-4 mb-md-0">
          <Image
            src="https://img.freepik.com/vector-gratis/ilustracion-concepto-uy-error-404-robot-roto_114360-1932.jpg?semt=ais_hybrid&w=740"
            alt="Error robot roto"
            fluid
            style={{ maxHeight: "300px" }}
          />
        </Col>

        
        <Col md={6} className="text-center text-md-start">
          <h1 style={{ fontSize: "5rem", fontWeight: "bold", color: "#007bff" }}>404</h1>
          <h2 className="mb-3 ft-4">Página no encontrada</h2>
          <p className="mb-4">
            ⚠️ ¡Oops! Parece que esta sección de la tienda está caída.<br />
            Pero no te preocupes, podés volver al inicio y seguir explorando lo mejor en tecnología.
          </p>
          <Button variant="primary" size="lg" onClick={handleGoHome}>
            Volver al Inicio
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ErrorPage;

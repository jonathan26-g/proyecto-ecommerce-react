import { Container, Card } from "react-bootstrap";
import { FaUserShield } from "react-icons/fa";

const AdminPage = () => {
  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card className="text-center shadow p-4" style={{ maxWidth: "500px" }}>
        <FaUserShield size={50} className="mb-3 text-primary" />
        <Card.Title as="h1" className="mb-3">
          ¡Bienvenido, Administrador!
        </Card.Title>
        <Card.Text className="lead">
          Nos alegra verte por aquí. Desde este panel podrás gestionar usuarios, productos y mucho más.
        </Card.Text>
      </Card>
    </Container>
  );
};

export default AdminPage;

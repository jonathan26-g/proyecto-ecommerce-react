import { Container } from "react-bootstrap"
import FormAdmin from "../components/form/FormAdmin"


const AdminCreateUpdateProduct = () => {
  const idParams = new URLSearchParams(location.search).get('id')
  return (
    <>
      <h2 className='text-center mt-3'>{idParams ? 'Editar Producto' : 'Crear Producto'}</h2>
      <Container className="d-flex justify-content-center my-5">
        <FormAdmin />
      </Container>
    </>
  )
}

export default AdminCreateUpdateProduct

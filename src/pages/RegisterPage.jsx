import FormC from "../components/form/FormC"
import { useChangeTitle } from "../helpers/useChangeTitlePage"

const RegisterPage = () => {
  useChangeTitle('register')
  return (
    <>
    
     <FormC idPage='register'/>
    
    </>
  )
}

export default RegisterPage

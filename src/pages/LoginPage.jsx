import FormC from "../components/form/FormC"
import { useChangeTitle } from "../helpers/useChangeTitlePage"

const LoginPage = () => {
  useChangeTitle('login')
  return (
   <>
   <FormC idPage='Login'/>
   </>
  )
}

export default LoginPage


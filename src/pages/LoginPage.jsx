import FormC from "../components/form/FormC"
import { useChangeTitle } from "../components/helpers/useChangeTitlePage"

const LoginPage = () => {
  useChangeTitle('login')
  return (
   <>
   <FormC idPage='Login'/>
   </>
  )
}

export default LoginPage


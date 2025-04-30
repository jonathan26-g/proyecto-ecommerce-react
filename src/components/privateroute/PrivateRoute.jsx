import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const PrivateRoute = ({ children, rol }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const usuarioLog = JSON.parse(sessionStorage.getItem('usuarioLogeado')) || null;

  const rutasAdminProtegidas = ['/AdminPage', '/AdminPage/Products', '/AdminPage/user', '/Admin/Product/createUpdate'];

  useEffect(() => {
    if (!usuarioLog) {
      setTimeout(() => {
        navigate('/');
      }, 100);
    } else if (rol && usuarioLog.rol !== rol) {
      
      if (usuarioLog.rol === 'usuario' && rutasAdminProtegidas.includes(location.pathname)) {
        setTimeout(() => {
          navigate('/UserPage');
        }, 100);
      } else {
        setTimeout(() => {
          navigate('/');
        }, 100);
      }
    }
    
  }, [usuarioLog, rol, location.pathname, navigate]);

  if (!usuarioLog || (rol && usuarioLog.rol !== rol)) {
    return null; 
  }

  return children;
};

export default PrivateRoute;

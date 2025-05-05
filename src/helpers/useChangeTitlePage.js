export const useChangeTitle = (idPage) => {
  switch (idPage) {
    case 'home':
      document.title = 'Pagina Pricipal'
      break;
    case 'aboutUs':
      document.title = 'Sobre Nosotros'
      break;
    case 'contact':
      document.title = 'Contacto'
      break;
    case 'login':
      document.title = 'Iniciar Sesion'
      break;
    case 'register':
      document.title = 'Registrarse'
      break;

    default:
      document.title = 'Error'
      break;
  }
}

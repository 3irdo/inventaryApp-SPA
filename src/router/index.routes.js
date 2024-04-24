import {Home, Login} from '../controllers/index.controller'

function router(route) {
    let root = document.getElementById('root')
    root.innerHTML = ''
    
  switch (route) {
    case "":
    return root.appendChild(Login())
    case "#/":
      return root.appendChild(Home())
      case "#/inventario":
        return console.log("inventario");
    case "#/solicitudes":
      return console.log("solicitudes");
    case "#/trazabilidad":
      return console.log("trazabilidad");
      case "#/admUsuarios":
      return console.log("admUsuarios");
      default: 
      console.log("404")
  }
}

export default router;

// router js

import {
  Home,
  Login,
  printVisitas,
  printDataInventario,
} from "../controllers/index.controller";

function router(route) {
  let root = document.getElementById("root");
  root.innerHTML = "";

  if (window.location.hash === "") {
    root.appendChild(Login());
  } else {
    root.appendChild(Home());

    switch (route) {
      case "#/inventario":
        return printDataInventario();
      case "#/h_visita_tecnica":
        return printVisitas();
      case "#/trazabilidad":
        return console.log("trazabilidad");
      case "#/admUsuarios":
        return console.log("admUsuarios");
      default:
        console.log("404");
    }
  }
}

export default router;

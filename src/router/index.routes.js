// router js

import {
  Home,
  Login,
  printVisitas,
  printDataInventario,
} from "../controllers/index.controller";
import { SearchProductId, postProductHandler, postVisitaHandler,updateProductHandler } from "../handler/events.handler";

function router(route) {
  let root = document.getElementById("root");
  root.innerHTML = "";

  if (window.location.hash === "") {
    root.appendChild(Login());
  } else {
    root.appendChild(Home());

    switch (route) {
      case "#/inventario":
        return printDataInventario(), postProductHandler(),updateProductHandler(),SearchProductId();
      case "#/h_visita_tecnica":
        return printVisitas(), postVisitaHandler();
      case "#/admUsuarios":
        return console.log("admUsuarios");
      default:
        console.log("404");
    }
  }
}

export default router;

// router.js
import {
  Home,
  Login,
  printVisitas,
  printDataInventario,
} from "../controllers/index.controller";
import {
  SearchProductId,
  loginHandler,
  postProductHandler,
  updateProductHandler,
} from "../handler/inventario.events.handler";
import { postUsuarioTecnico, printUsuarios } from "../handler/usuarios.handler";

import {
  SearchVisitaId,
  postVisitaTecnicaHandler,
  updateVisitaTecnica,
} from "../handler/visitas.event.handler";

function router(route) {
  let root = document.getElementById("root");
  root.innerHTML = "";

  if (window.location.hash === "") {
    root.appendChild(Login());
    loginHandler(); // Invocar el handler después de añadir el Login al DOM
  } else {
    root.appendChild(Home());

    switch (route) {
      case "#/inventario":
        printDataInventario();
        postProductHandler();
        updateProductHandler();
        SearchProductId();
        break;
      case "#/h_visita_tecnica":
        printVisitas();
        postVisitaTecnicaHandler(), updateVisitaTecnica(), SearchVisitaId();
        break;
      case "#/admUsuarios":
        printUsuarios(), postUsuarioTecnico()
        break;
      default:
        console.log("404");
    }
  }
}

export default router;

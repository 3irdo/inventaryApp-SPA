// router.js
import {
  Home,
  Login,
  printVisitas,
  printDataInventario,
  Index,
} from "../controllers/index.controller";
import {
  SearchProductId,
  loginHandler,
  postProductHandler,
  refreshWindow,
  updateProductHandler,
} from "../handler/inventario.events.handler";
import { postUsuarioTecnico, printUsuarios, searchUsuarioTecnicoById } from "../handler/usuarios.handler";

import {
  SearchVisitaId,
  postVisitaTecnicaHandler,
  updateVisitaTecnica,
} from "../handler/visitas.event.handler";

function router(route) {
  let root = document.getElementById("root");
  root.innerHTML = "";

  if (window.location.hash === "") {
    root.appendChild(Index());
  }
  if (window.location.hash === "#/login") {
    root.appendChild(Login());
    loginHandler();
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
        printUsuarios(), postUsuarioTecnico(), searchUsuarioTecnicoById();
        break;
      default:
        console.log("404");
    }
  }
}

export default router;

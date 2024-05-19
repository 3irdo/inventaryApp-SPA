// router.js
import {
  Home,
  Login,
  printVisitas,
  printDataInventario,
} from "../controllers/index.controller";
<<<<<<< HEAD
import {
  SearchProductId,
  loginHandler,
  postProductHandler,
  updateProductHandler,
} from "../handler/inventario.events.handler";
import {
  SearchVisitaId,
  postVisitaTecnicaHandler,
  updateVisitaTecnica,
} from "../handler/visitas.event.handler";
=======
import { SearchProductId, loginHandler, postProductHandler, postVisitaHandler, updateProductHandler } from "../handler/events.handler";
>>>>>>> c2a8d2ac2a54a4297afb2068d0d6ebb86b408505

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
<<<<<<< HEAD
        postVisitaTecnicaHandler(), updateVisitaTecnica(), SearchVisitaId();
=======
        postVisitaHandler();
>>>>>>> c2a8d2ac2a54a4297afb2068d0d6ebb86b408505
        break;
      case "#/admUsuarios":
        console.log("admUsuarios");
        break;
      default:
        console.log("404");
    }
  }
}

export default router;

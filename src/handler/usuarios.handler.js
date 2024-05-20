//usuarios.handler.js

import {
  addUsuarioTecnico,
  getUsuarioTecnico,
} from "../controllers/db.contoller";
import { showAlert } from "../controllers/index.controller";
import usersView from "../views/administrar_usuarios.html";
import { refreshWindow } from "./inventario.events.handler";

export async function printUsuarios() {
  const contenidoDinamico = document.getElementById("contenidoDinamico");
  contenidoDinamico.classList = "fade-in-out";
  contenidoDinamico.innerHTML = usersView;

  try {
    const tecnicos_data = await getUsuarioTecnico();
    const tablaBody = document.getElementById("tablaBody_U");

    tecnicos_data.forEach((tecnico) => {
      const fila = document.createElement("tr");

      fila.innerHTML = `
            <td>${tecnico.Pk_CC_Usuario}</td>
            <td>${tecnico.Nombre_Usuario}</td>

            <td>${tecnico.Telefono_Usuario}</td>
            <td>${tecnico.Correo_Usuario}</td>
            
            <td>
            <button type="button" class="btn_edit rounded btn btn-primary" data-tecnico-id="${tecnico.Pk_CC_Usuario}"><span></span></button>
            <button type="button" class="btn_delete rounded btn btn-danger" data-product-id="${tecnico.Pk_CC_Usuario}"><span></span></button>
          </td>
            `;
      tablaBody.appendChild(fila);
    });
  } catch (error) {}
}

export function postUsuarioTecnico() {
  document
    .getElementById("newUserModal")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const nombre_usuario = document.getElementById("nombre_usuario").value;

      const cc_usuario = document.getElementById("cc_usuario").value;

      const email_usuario = document.getElementById("email_usuario").value;

      const rol_usuario = document.getElementById("rol_usuario").value;

      const userData = {
        nombre_usuario,
        cc_usuario,
        email_usuario,
        rol_usuario,
      };
      try {
        const newUsuario = await addUsuarioTecnico(userData);
        console.log("usuario añadido adecuadamente:", newUsuario);
        showAlert("usuario añadida exitosamente", "success");
        

        refreshWindow();
      } catch (error) {
        console.error("error al agregar la visita técnica", error);
      }
    });
}

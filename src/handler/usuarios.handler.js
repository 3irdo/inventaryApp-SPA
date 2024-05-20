//usuarios.handler.js
import * as bootstrap from "bootstrap";
import {
  addUsuarioTecnico,
  deleteUsuarioTecnico,
  getUsuarioTecnico,
  getUsuarioTecnicoById,
} from "../controllers/db.contoller";
import { showAlert } from "../controllers/index.controller";
import usersView from "../views/administrar_usuarios.html";
import { refreshWindow } from "./inventario.events.handler";

export async function printUsuarios() {
  const contenidoDinamico = document.getElementById("contenidoDinamico");
  contenidoDinamico.classList = "fade-in-out";
  contenidoDinamico.innerHTML = usersView;
  // let userId;

  try {
    const [tecnicos_data] = await Promise.all([getUsuarioTecnico()]);
    const tablaBody = document.getElementById("tablaBody_U");

    tecnicos_data.forEach((tecnico) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${tecnico.Pk_CC_Usuario}</td>
        <td>${tecnico.Nombre_Usuario}</td>
        <td>${tecnico.Apellido_Usuario}</td>
        <td>${tecnico.Telefono_Usuario}</td>
        <td>${tecnico.Correo_Usuario}</td>
        <td>
          <button type="button" class="btn_edit_user rounded btn btn-primary" data-tecnico-id="${tecnico.Pk_CC_Usuario}"><span></span></button>
          <button type="button" class="btn_delete rounded btn btn-danger" data-tecnico-id="${tecnico.Pk_CC_Usuario}"><span></span></button>
          <button type="button" class="btn_credencial rounded btn btn-info" data-tecnico-id="${tecnico.Pk_CC_Usuario}"><span></span>registrar</button>
        </td>
      `;
      tablaBody.appendChild(fila);

      fila.querySelector(".btn_delete").addEventListener("click", async (e) => {
        if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
          try {
            const userId = e.target.dataset.tecnicoId;
            console.log(`Intentando eliminar usuario con ID: ${userId}`); // Línea de depuración
            const deleteP = await deleteUsuarioTecnico(userId);
            if (deleteP) {
              showAlert("Usuario eliminado exitosamente", "danger");
              printUsuarios();
              refreshWindow();
            }
          } catch (error) {
            console.error("Error al eliminar usuario:", error);
          }
        }
      });
    });
  } catch (error) {
    console.error("Error al obtener datos de los técnicos:", error);
  }
}

export function postUsuarioTecnico() {
  document
    .getElementById("newUserModal")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const nombre_usuario = document.getElementById("nombre_usuario").value;
      const apellido_usuario =
        document.getElementById("apellido_usuario").value;

      const cc_usuario = document.getElementById("cc_usuario").value;

      const email_usuario = document.getElementById("email_usuario").value;

      const Telefono_Usuario =
        document.getElementById("Telefono_Usuario").value;

      const userData = {
        Pk_CC_Usuario: cc_usuario, // Este es el campo clave primaria
        Nombre_Usuario: nombre_usuario,
        Apellido_Usuario: apellido_usuario,
        Telefono_Usuario: Telefono_Usuario, // Asegúrate de que este campo se maneje adecuadamente
        Correo_Usuario: email_usuario,
      };

      try {
        const newUsuario = await addUsuarioTecnico(userData);
        console.log("usuario añadido adecuadamente:", newUsuario);
        showAlert("usuario añadida exitosamente", "success");

        const newUserModal = bootstrap.Modal.getInstance(
          document.getElementById("newUserModal")
        );
        newUserModal.hide();

        document.getElementById("user-form").reset();

        refreshWindow();
      } catch (error) {
        console.error("error al agregar la visita técnica", error);
      }
    });
}

export async function updateUsuarioTecnico() {
  document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("btn_edit_user")) {
      userId = e.target.dataset.tecnicoId;
      try {
        const user = await getUsuarioTecnico();
      } catch (error) {}
    }
  });
}

export function searchUsuarioTecnicoById() {
  const btnSearch = document.getElementById("usuario_btn-search");
  const userSearch = btnSearch.addEventListener("click", async () => {
    const userId = document.getElementById("usuarioSearchInput").value;
    
    try {
      const user = await getUsuarioTecnicoById(userId);

       console.log(user)

      const usuarioDetails = `
    <div>
        <p><strong>ID:</strong> ${user.Pk_CC_Usuario}</p>
        <p><strong>Nombre:</strong> ${user.Nombre_Usuario} ${user.Apellido_Usuario}</p>
        <p><strong>Contacto:</strong> ${user.Telefono_Usuario}</p>
        <p><strong>Correo:</strong> ${user.Correo_Usuario}</p>
       </div>
    `;

      const detailsContainer = document.getElementById("user-details-content");

      detailsContainer.innerHTML = usuarioDetails;

      const userDetailModal = new bootstrap.Modal(
        document.getElementById("userDetailsModal")
      );

      userDetailModal.show();
    } catch (error) {
      console.error("Error al obtener el producto:", error);
    }
  });
}

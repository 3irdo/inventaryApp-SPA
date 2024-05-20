import * as bootstrap from "bootstrap";
import {
  getClientes,
  getProducts,
  getUsuarioTecnico,
  getVisitaById,
  getVisitas,
  updateVisita,
} from "../controllers/db.contoller";
import {
  createOption,
  printVisitas,
  showAlert,
} from "../controllers/index.controller";
import { addVisitaTecnica } from "../controllers/visitas.controller";
import { refreshWindow } from "./inventario.events.handler";

export function postVisitaTecnicaHandler() {
  document
    .getElementById("visit-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const fechaVisita = document.getElementById("fecha_visita").value;
      const tipoViista = document.getElementById("tipo_visita").value;
      const descripcion = document.getElementById("descripcion").value;
      const ccUsuario = document.getElementById("clienteCC_select_input").value;
      const idProducto = document.getElementById("clienteProducto").value;
      const CuentaCliente = document.getElementById(
        "cuentaClienteSelect"
      ).value;

      const visitaData = {
        fechaVisita,
        tipoViista,
        descripcion,
        ccUsuario,
        idProducto,
        CuentaCliente,
      };
      try {
        const newVisitaTecnica = await addVisitaTecnica(visitaData);
        console.log("Producto añadido adecuadamente:", newVisitaTecnica);
        showAlert("Visita añadida exitosamente", "success");

        document.getElementById("visit-form").reset();

        printVisitas();
        refreshWindow();
      } catch (error) {
        console.error("error al agregar la visita técnica", error);
      }
    });
}

// handler para el botón de editar visitas

export async function updateVisitaTecnica() {
  let visitaId;
  document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("btn_edit_visita")) {
      visitaId = e.target.dataset.visitaId;

      try {
        const visita = await getVisitaById(visitaId);
        const [clientes_data, inventario_data, tecnicos_data] =
          await Promise.all([
            getClientes(),
            getProducts(),
            getUsuarioTecnico(),
          ]);
        const editModalLabel = document.getElementById("editVisitModalLabel");
        const editForm = document.getElementById("edit-visit-form");

        // editModalLabel.innerText = "Editar la vistia con ID" + visitaId

        editForm.dataset.visitaId = visitaId;

        function populateEditForm(visita) {
          document.getElementById("edit_fecha_visita").value =
            visita.Fecha_Visita_Tecnica;

          document.getElementById("edit_tipo_visita").value =
            visita.Tipo_Visita;

          document.getElementById("edit_descripcion").value =
            visita.Descripcion_Visita_Tecnica;

          document.getElementById("edit_clienteCC_select_input").value =
            visita.Fk_CC_Usuario;

          document.getElementById("edit_clienteProducto").value =
            visita.Fk_Id_Producto;

          document.getElementById("edit_cuentaClienteSelect").value =
            visita.Fk_Numero_Cuenta_Cliente;
        }

        tecnicos_data.forEach((tecnico) => {
          edit_clienteCC_select_input.appendChild(
            createOption(
              tecnico.Pk_CC_Usuario,
              `${tecnico.Nombre_Usuario} ${tecnico.Apellido_Usuario} CC: ${tecnico.Pk_CC_Usuario}`
            )
          );
        });

        clientes_data.forEach((cliente) => {
          edit_cuentaClienteSelect.appendChild(
            createOption(
              cliente.Pk_Numero_Cuenta_Cliente,
              `${cliente.Nombre_Cliente} ${cliente.Apellido_Cliente} CC: ${cliente.Pk_Numero_Cuenta_Cliente}`
            )
          );
        });

        inventario_data.forEach((product) => {
          edit_clienteProducto.appendChild(
            createOption(
              product.Pk_Id_Producto,
              `${product.Nombre_Producto} ID: ${product.Referencia}`
            )
          );
        });

        populateEditForm(visita);

        const editModal = new bootstrap.Modal(
          document.getElementById("editVisitModal")
        );
        editModal.show();
      } catch (error) {
        console.log("error al actualizar la visita técnica", error);
      }
    }
  });

  document
    .getElementById("editVisitModal")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const updatedData = {
        Fecha_Visita_Tecnica:
          document.getElementById("edit_fecha_visita").value,
        Tipo_Visita: document.getElementById("edit_tipo_visita").value,
        Descripcion_Visita_Tecnica:
          document.getElementById("edit_descripcion").value,
        Fk_CC_Usuario: document.getElementById("edit_clienteCC_select_input")
          .value,
        Fk_Id_Producto: document.getElementById("edit_clienteProducto").value,
        Fk_Numero_Cuenta_Cliente: document.getElementById(
          "edit_cuentaClienteSelect"
        ).value,
      };

      try {
        const updatedVisitaRes = await updateVisita(visitaId, updatedData);
        const editModal = bootstrap.Modal.getInstance(
          document.getElementById("editVisitModal")
        );
        editModal.hide();

        if (updatedVisitaRes) {
          showAlert("Visita técnica editada", "success");
        }

        printVisitas();
        refreshWindow();
      } catch (error) {
        console.error("Error al actualizar la visita técnica:", error);
      }
    });
}

// -----------------buscar visita por id ----------------------
export function SearchVisitaId() {
  const btnIdSearch = document.getElementById("visita_btn-search");

  const visitaSearch = btnIdSearch.addEventListener("click", async () => {
    const visitaId = document.getElementById("visitaSearchInput").value;

    try {
      const [visita, cliente, product, tecnico] = await Promise.all([
        getVisitaById(visitaId),
        getClientes(),
        getProducts(),
        getUsuarioTecnico(),
      ]);

      const visitaDetailsHTML = `
      <div>
        <p><strong>ID:</strong> ${visita.Pk_Id_Visita_Tecnica}</p>
        <p><strong>Fecha:</strong> ${new Date(
          visita.Fecha_Visita_Tecnica
        ).toLocaleDateString()}</p>
        <p><strong>Tipo visita:</strong> ${visita.Tipo_Visita}</p>
        <p><strong>Descripción:</strong> ${
          visita.Descripcion_Visita_Tecnica
        }</p>
       </div>
    `;

//  no boorar

    // <p><strong>CC Técnico:</strong> ${tecnico.Nombre_Usuario} ${
    //   tecnico.Pk_CC_Usuario
    // }</p>
    //   <p><strong>Producto:</strong>${product.Nombre_Producto} ${
    //   product.Fk_Id_Producto
    // }</p>
    //   <p><strong>Cuenta cliente:</strong> ${
    //     cliente.Fk_Numero_Cuenta_Cliente
    //   }</p>
    //   </div>

      // Actualizar el contenido del modal con los detalles del producto
      const visitaDetailsContainer = document.getElementById(
        "visita-details-content"
      );
      visitaDetailsContainer.innerHTML = visitaDetailsHTML;

      // Mostrar el modal
      const visitaDetailsModal = new bootstrap.Modal(
        document.getElementById("visitaDetailsModal")
      );
      visitaDetailsModal.show();
    } catch (error) {
      console.error("Error al obtener el producto:", error);
    }
  });
}

import * as bootstrap from "bootstrap";
import {
  deleteEmpresaById,
  getEmpresaById,
  getEmpresas,
} from "../controllers/db.contoller";
import { showAlert } from "../controllers/index.controller";
import empresasView from "../views/empresasView.html";
import { refreshWindow } from "./inventario.events.handler";

export async function printEmpresas() {
  const contenidoDinamico = document.getElementById("contenidoDinamico");
  contenidoDinamico.innerHTML = empresasView;
  contenidoDinamico.classList = "fade-in-out";

  try {
    const empresas_data = await getEmpresas();

    const tablaBody_E = document.getElementById("tablaBody_E");

    empresas_data.forEach((empresa) => {
      const fila = document.createElement("tr");

      fila.innerHTML = `
        <td>${empresa.Pk_NIT_Empresa_Suministradora}</td>
        <td>${empresa.Nombre_Empresa_Suministradora}</td>
        <td>${empresa.Direccion_Empresa_Suministradora}</td>
        <td>${empresa.Telefono_Empresa_Suministradora}</td>

        <td>
          <button type="button" class="btn_edit_empresa rounded btn btn-primary" data-empresa-id="${empresa.Pk_NIT_Empresa_Suministradora}"><span></span></button>
          <button type="button" class="btn_delete rounded btn btn-danger" data-empresa-id="${empresa.Pk_NIT_Empresa_Suministradora}"><span></span></button>
        </td>
           
            `;
      tablaBody_E.appendChild(fila);

      fila.querySelector(".btn_delete").addEventListener("click", async (e) => {
        if (
          confirm(
            "¿Está seguro que desea eliminar esta empresa ",
            `${empresa.Nombre_Empresa_Suministradora}`
          )
        ) {
          try {
            const empresaId = e.target.dataset.empresaId;
            const deletE = await deleteEmpresaById(empresaId);

            if (deletE) {
              showAlert("Empresa eliminada exitosamente", "danger");

              refreshWindow();
            }
          } catch (error) {
            console.error(error);
          }
        }
      });
    });
  } catch (error) {
    console.error(error);
  }
}

export function searchEmpresaById() {
  const btnSearch = document.getElementById("empresa_btn-search");

  const empresaSearch = btnSearch.addEventListener("click", async () => {
    const empresaId = arguments
     document.getElementById("empresaSearchInput").value;

    try {
      const empresa = await getEmpresaById(empresaId);
      const empresaDetails = `
        <div>
            <p><strong>NIT:</strong> ${empresa.Pk_NIT_Empresa_Suministradora}</p>
            <p><strong>Nombre:</strong> ${empresa.Nombre_Empresa_Suministradora}</p>
            <p><strong>Dirección:</strong> ${empresa.Direccion_Empresa_Suministradora}</p>
            <p><strong>Teléfono:</strong> ${empresa.Telefono_Empresa_Suministradora}</p>
        </div>
            
            `;
const empresaDetailsContainer = document.getElementById(
        "empresa-details-content"
      );
      empresaDetailsContainer.innerHTML = empresaDetails;

      const ModalDetails = new bootstrap.Modal(
        document.getElementById("empresaDetailsModal")
      );

      ModalDetails.show();
    } catch (error) {
      console.error("Error al obtener el Nit de la empresa", error);
    }
  });
}

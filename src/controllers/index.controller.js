import loginView from "../views/login.html";
import homeView from "../views/home.html";
import inventoryView from "../views/inventory.html";
import hVisitasView from "../views/historial_visitas.html";
import {
  getProducts,
  getEmpresas,
  getProductById,
  deleteProduct,
  getVisitas,
  getClientes,
  deleteVisita,
} from "./db.contoller";
import { refreshDynamicContent } from "../handler/events.handler";

export function Home() {
  const divElement = document.createElement("div");
  divElement.innerHTML = homeView;
  divElement.classList = "grid-container mx-5 justify-content-center";

  return divElement;
}

export function Login() {
  const divElement = document.createElement("div");
  divElement.innerHTML = loginView;
  divElement.classList = "fade-in-out login-container d-flex";

  return divElement;
}

// inventario

// las constantes de los items de la tabla de inventario normal al final están nombradas con las siglas N, de normal, el de inventario marcado estará al final con la letra M, de marcado

export async function printDataInventario() {
  const contenidoDinamico = document.getElementById("contenidoDinamico");
  contenidoDinamico.innerHTML = inventoryView;
  contenidoDinamico.classList = "fade-in-out";

  try {
    const inventario_data = await getProducts();
    const empresas_data = await getEmpresas();
    const selectForm = document.getElementById("nit_suministradora");

    inventario_data.forEach((producto) => {
      

      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${producto.Pk_Id_Producto}</td>
        <td>${producto.Nombre_Producto}</td>
        <td>${producto.Referencia}</td>
        <td>${producto.Marca}</td>
        <td>${producto.Numero_de_Orden}</td>
        <td>${new Date(producto.Fecha_de_Compra).toLocaleDateString()}</td>
        <td>${producto.Cantidad}</td>
        <td>${producto.Fk_Nombre_Empresa_Suministradora}</td>
        <td>
          <button type="button" class="btn_edit rounded btn btn-primary" data-product-id="${
            producto.Pk_Id_Producto
          }"><span></span></button>
          <button type="button" class="btn_delete rounded btn btn-danger" data-product-id="${
            producto.Pk_Id_Producto
          }"><span></span></button>
        </td>
      `;

      tablaBody_N.appendChild(fila);

      // Aquí, después de agregar la fila, agregamos el event listener para el botón de eliminar

      const btn_delete = fila.querySelector(".btn_delete");
      btn_delete.addEventListener("click", async (e) => {
        try {
          // Obtener el ID del producto que se va a eliminar desde el atributo data-product-id del botón
          const productId = e.target.dataset.productId;

          const deleteP = await deleteProduct(productId);

          // Mostrar un mensaje de éxito o actualizar la interfaz de usuario según sea necesario

          const alertPlaceholder = document.getElementById(
            "liveAlertPlaceholder"
          );
          const appendAlert = (message, type) => {
            const wrapper = document.createElement("div");
            wrapper.innerHTML = [
              `<div class="alert alert-${type} alert-dismissible" role="alert">`,
              `   <div>${message}</div>`,
              '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
              "</div>",
            ].join("");

            alertPlaceholder.append(wrapper);
          };

          if (deleteP) {
            appendAlert("Producto eliminado exitosamente", "danger");
          }

          printDataInventario();
        } catch (error) {
          console.error("Error al eliminar el producto:", error);
          // Puedes mostrar un mensaje de error al usuario si la eliminación falla
        }
      });
    });

    async function printProductByID() {
      const productId = 1;
      try {
        const product = await getProductById(productId);
        console.log(product);
      } catch (error) {
        console.error(error);
      }
    }

    // este foreach llama los datos de la tabla empresas para mostrarlas en el formulario de inventario y poder elegir un nit ya existente

    empresas_data.forEach((empresa) => {
      const optionElement = document.createElement("option");
      optionElement.value = empresa.Nombre_Empresa_Suministradora;
      optionElement.textContent = `
        ${empresa.Nombre_Empresa_Suministradora} - NIT: ${empresa.Pk_NIT_Empresa_Suministradora}
      `;
      selectForm.appendChild(optionElement);
    });
  } catch (error) {
    console.error("Error al obtener los datos del inventario:", error);
  }
}

// ---------------------visitas-------------------------

// export async function printVisitas() {
//   const contenidoDinamico = document.getElementById("contenidoDinamico");
//   contenidoDinamico.classList = "fade-in-out";
//   contenidoDinamico.innerHTML = hVisitasView;

//   try {
//     const hVisitas_data = await getVisitas();
//     const clientes_data = await getClientes();
//     const inventario_data = await getProducts();
//     const clienteCC_select_input = document.getElementById(
//       "clienteCC_select_input"
//     );
//     const cuentaCliente_select = document.getElementById("cuentaClienteSelect");
//     const clienteProducto_select = document.getElementById("clienteProducto");

//     hVisitas_data.forEach((visita) => {
//       const fila = document.createElement("tr");
//       fila.innerHTML = `
//       <td>${visita.Pk_Id_Visita_Tecnica}</td>
//       <td>${new Date(visita.Fecha_Visita_Tecnica).toLocaleDateString()}</td>
//       <td>${visita.Tipo_Visita}</td>

//       <td>
//           <button type="button" class="btn btn-info btn-sm" data-bs-toggle="modal" data-bs-target="#descripcionModal_${
//             visita.id
//           }">
//               Ver Descripción
//           </button>
//       </td>
//       <!-- Agrega el modal aquí -->
//       <div class="modal fade" id="descripcionModal_${
//         visita.id
//       }" tabindex="-1" aria-labelledby="descripcionModalLabel_${
//           visita.id
//         }" aria-hidden="true">
//           <div class="modal-dialog">
//               <div class="modal-content">
//                   <div class="modal-header">
//                       <h5 class="modal-title" id="descripcionModalLabel_${
//                         visita.id
//                       }">Descripción de la Visita</h5>
//                       <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                   </div>
//                   <div class="modal-body">
//                       ${visita.Descripcion_Visita_Tecnica}
//                   </div>
//               </div>
//           </div>
//       </div>

//       <td>${visita.Fk_CC_Usuario}</td>
//       <td>${visita.Fk_Id_Producto}</td>
//       <td>${visita.Fk_Numero_Cuenta_Cliente}<td>

//       <td>
//             <button type="button" class="btn_edit rounded btn btn-primary" data-product-id="${
//               visita.Pk_Id_Visita_Tecnica
//             }"><span></span></button>
//             <button type="button" class="btn_delete rounded btn btn-danger" data-product-id="${
//               visita.Pk_Id_Visita_Tecnica
//             }"><span></span></button>
//           </td>
//       `;
//         tablaBody_V.appendChild(fila);

//       const btn_delete = fila.querySelector(".btn_delete");
//       btn_delete.addEventListener("click", async (e) => {
//         try {
//           const visitaId = e.target.dataset.productId;
//           const deleteP = await deleteVisita(visitaId);

//           const alertPlaceholder = document.getElementById(
//             "liveAlertPlaceholder"
//           );
//           const appendAlert = (message, type) => {
//             const wrapper = document.createElement("div");
//             wrapper.innerHTML = [
//               `<div class="alert alert-${type} alert-dismissible" role="alert">`,
//               `   <div>${message}</div>`,
//               '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
//               "</div>",
//             ].join("");

//             alertPlaceholder.append(wrapper);
//           };

//           if (deleteP) {
//             appendAlert("Visita eliminado exitosamente", "danger");
//           }
//           printVisitas()
//         } catch (error) {
//           console.error(error);
//         }
//       });
//     });

//     clientes_data.forEach((cliente) => {
//       const optionElement = document.createElement("option");
//       optionElement.value = cliente.Cedula_Cliente;
//       optionElement.textContent = `${cliente.Nombre_Cliente}  ${cliente.Apellido_Cliente} CC: ${cliente.Cedula_Cliente} `;
//       clienteCC_select_input.appendChild(optionElement);
//     });

//     clientes_data.forEach((cliente) => {
//       const optionElement = document.createElement("option");
//       optionElement.value = cliente.Pk_Numero_Cuenta_Cliente;
//       optionElement.textContent = `${cliente.Nombre_Cliente}  ${cliente.Apellido_Cliente} CC: ${cliente.Pk_Numero_Cuenta_Cliente} `;
//       cuentaCliente_select.appendChild(optionElement);
//     });

//     inventario_data.forEach((product) => {
//       const optionElement = document.createElement("option");
//       optionElement.value = product.Pk_Id_Producto;
//       optionElement.textContent = `${product.Nombre_Producto} ID: ${product.Referencia} `;
//       clienteProducto_select.appendChild(optionElement);
//     });
//   } catch (error) {
//     console.error(error);
//   }
// }

function showDescription(descripcion) {
  document.getElementById("descripcion-content").innerText = descripcion;
}

export async function printVisitas() {

  const contenidoDinamico = document.getElementById("contenidoDinamico");
  contenidoDinamico.classList = "fade-in-out";
  contenidoDinamico.innerHTML = hVisitasView;

  try {
    const [hVisitas_data, clientes_data, inventario_data] = await Promise.all([
      getVisitas(),
      getClientes(),
      getProducts(),
    ]);

    const clienteCC_select_input = document.getElementById(
      "clienteCC_select_input"
    );
    const cuentaCliente_select = document.getElementById("cuentaClienteSelect");
    const clienteProducto_select = document.getElementById("clienteProducto");
    const tablaBody_V = document.getElementById("tablaBody_V");

    hVisitas_data.forEach((visita) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
      <td>${visita.Pk_Id_Visita_Tecnica}</td>
      <td>${new Date(visita.Fecha_Visita_Tecnica).toLocaleDateString()}</td>
      <td>${visita.Tipo_Visita}</td>

      <td>
          <button type="button" class="btn btn-info btn-sm" data-bs-toggle="modal" data-bs-target="#descripcionModal_${
            visita.id
          }">
              Ver Descripción
          </button>
      </td>
      <!-- Agrega el modal aquí -->
      <div class="modal fade" id="descripcionModal_${
        visita.id
      }" tabindex="-1" aria-labelledby="descripcionModalLabel_${
          visita.id
        }" aria-hidden="true">
          <div class="modal-dialog">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="modal-title" id="descripcionModalLabel_${
                        visita.id
                      }">Descripción de la Visita</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                      ${visita.Descripcion_Visita_Tecnica}
                  </div>
              </div>
          </div>
      </div>

      <td>${visita.Fk_CC_Usuario}</td>
      <td>${visita.Fk_Id_Producto}</td>
      <td>${visita.Fk_Numero_Cuenta_Cliente}<td>

      <td>
            <button type="button" class="btn_edit rounded btn btn-primary" data-product-id="${
              visita.Pk_Id_Visita_Tecnica
            }"><span></span></button>
            <button type="button" class="btn_delete rounded btn btn-danger" data-product-id="${
              visita.Pk_Id_Visita_Tecnica
            }"><span></span></button>
          </td>
    `;
      tablaBody_V.appendChild(fila);

      fila.querySelector(".btn_delete").addEventListener("click", async (e) => {
        if (confirm("¿Estás seguro de que deseas eliminar esta visita?")) {
          try {
            const visitaId = e.target.dataset.productId;
            const deleteP = await deleteVisita(visitaId);
            if (deleteP) {
              showAlert("Visita eliminada exitosamente", "danger");
              printVisitas();
            }
          } catch (error) {
            console.error(error);
          }
        }
      });
    });

    clientes_data.forEach((cliente) => {
      clienteCC_select_input.appendChild(
        createOption(
          cliente.Cedula_Cliente,
          `${cliente.Nombre_Cliente} ${cliente.Apellido_Cliente} CC: ${cliente.Cedula_Cliente}`
        )
      );
      cuentaCliente_select.appendChild(
        createOption(
          cliente.Pk_Numero_Cuenta_Cliente,
          `${cliente.Nombre_Cliente} ${cliente.Apellido_Cliente} CC: ${cliente.Pk_Numero_Cuenta_Cliente}`
        )
      );
    });

    inventario_data.forEach((product) => {
      clienteProducto_select.appendChild(
        createOption(
          product.Pk_Id_Producto,
          `${product.Nombre_Producto} ID: ${product.Referencia}`
        )
      );
    });
  } catch (error) {
    console.error(error);
  }
}

export function createOption(value, text) {
  const optionElement = document.createElement("option");
  optionElement.value = value;
  optionElement.textContent = text;
  return optionElement;
}

export function showAlert(message, type) {
  const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
  const wrapper = document.createElement("div");
  wrapper.innerHTML = `
    <div class="alert alert-${type} alert-dismissible" role="alert">
      <div>${message}</div>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
  alertPlaceholder.append(wrapper);
}

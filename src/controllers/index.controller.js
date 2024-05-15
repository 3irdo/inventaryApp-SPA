// index controller

import loginView from "../views/login.html";
import homeView from "../views/home.html";
import inventoryView from "../views/inventory.html";
import hVisitasView from "../views/historial_visitas.html";
import deletEditBtns from "../views/buttons_delete_edit.html";
import {
  getProducts,
  getEmpresas,
  getProductById,
  deleteProduct,
} from "./db.contoller";

function Home() {
  const divElement = document.createElement("div");
  divElement.innerHTML = homeView;
  divElement.classList = "grid-container mx-5 justify-content-center";

  return divElement;
}

function Login() {
  const divElement = document.createElement("div");
  divElement.innerHTML = loginView;
  divElement.classList = "fade-in-out login-container d-flex";

  return divElement;
}

// inventario
// las constantes de los items de la tabla de inventario normal al final están nombradas con las siglas N, de normal, el de inventario marcado estará al final con la letra M, de marcado

async function printDataInventario() {
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
          <button type="button" class="btn_edit rounded btn btn-primary" data-product-id="${producto.Pk_Id_Producto}"><span></span></button>
          <button type="button" class="btn_delete rounded btn btn-danger" data-product-id="${producto.Pk_Id_Producto}"><span></span></button>
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
         
          const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
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

          printDataInventario()
          
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
      const optionElelment = document.createElement("option");
      optionElelment.value = empresa.Nombre_Empresa_Suministradora;
      optionElelment.textContent = `
        ${empresa.Nombre_Empresa_Suministradora} - NIT: ${empresa.Pk_NIT_Empresa_Suministradora}
      `;
      selectForm.appendChild(optionElelment);
    });
  } catch (error) {
    console.error("Error al obtener los datos del inventario:", error);
  }
}

async function printVisitas() {
  const contenidoDinamico = document.getElementById("contenidoDinamico");
  contenidoDinamico.classList = "fade-in-out";
  contenidoDinamico.innerHTML = hVisitasView;
  const hVisitas_data = await getProducts();

  hVisitas_data.forEach((visita) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `<td>${visita.id}</td> <td>${visita.company}</td><td>${visita.email}</td><td>${visita.phone}</td><td>${visita.username}</td><td>${visita.website}</td> <button class="btn btn-danger"></button>`;
    tablaBody_N.appendChild(fila);
  });
}

// document.getElementById('agregar-inventario').addEventListener('click', agregarFilaInventario);

export { Home, Login, printVisitas, printDataInventario };

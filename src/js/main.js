// main.js

import "../styles.scss";
import * as bootstrap from "bootstrap";
import router from "../router/index.routes";
import {
  getProductById,
} from "../controllers/db.contoller";
import { main } from "@popperjs/core";




router(window.location.hash);
window.addEventListener("hashchange", () => {
  router(window.location.hash);
});




// buscar elemento por id
// Manejador del evento de búsqueda

// const btnIdSearch = document.getElementById("inventory_btn-search");

// const invSearch = btnIdSearch.addEventListener("click", async () => {

//   const productId = document.getElementById("inventarySearchInput").value;

//   try {
//     const product = await getProductById(productId);
//     console.log(product);

//     // Construir el HTML para mostrar los detalles del producto
//     const productDetailsHTML = `
//       <div>
//         <p><strong>ID:</strong> ${product.Pk_Id_Producto}</p>
//         <p><strong>Nombre:</strong> ${product.Nombre_Producto}</p>
//         <p><strong>Referencia:</strong> ${product.Referencia}</p>
//         <p><strong>Marca:</strong> ${product.Marca}</p>
//         <p><strong>Número de Orden:</strong> ${product.Numero_de_Orden}</p>
//         <p><strong>Fecha de Compra:</strong> ${product.Fecha_de_Compra}</p>
//         <p><strong>Cantidad:</strong> ${product.Cantidad}</p>
//         <p><strong>NIT Empresa Suministradora:</strong> ${product.Fk_NIT_Empresa_Suministradora}</p>
//       </div>
//     `;

//     // Actualizar el contenido del modal con los detalles del producto
//     const productDetailsContainer = document.getElementById(
//       "product-details-content"
//     );
//     productDetailsContainer.innerHTML = productDetailsHTML;

//     // Mostrar el modal
//     const productDetailsModal = new bootstrap.Modal(
//       document.getElementById("productDetailsModal")
//     );
//    productDetailsModal.show();
//   } catch (error) {
//     console.error("Error al obtener el producto:", error);
//   }
// });





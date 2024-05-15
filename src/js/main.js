// main.js

import "../styles.scss";
import * as bootstrap from "bootstrap";
import router from "../router/index.routes";
import {
  addProduct,
  getProductById,
  deleteProduct,
} from "../controllers/db.contoller";
import { main } from "@popperjs/core";

router(window.location.hash);
window.addEventListener("hashchange", () => {
  router(window.location.hash);
});

// Manejador de evento para el formulario "Añadir habitual"
document
  .getElementById("inventario-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente

    const Nombre_Producto = document.getElementById("nombre_producto").value;
    const Referencia = document.getElementById("referencia").value;
    const Marca = document.getElementById("marca").value;
    const Numero_de_Orden = document.getElementById("num_orden").value;
    const Fecha_de_Compra = document.getElementById("fecha_compra").value;
    const Cantidad = document.getElementById("cantidad").value;
    const Fk_Nombre_Empresa_Suministradora =
      document.getElementById("nit_suministradora").value;

    // Crear objeto con los datos del producto
    const productData = {
      Nombre_Producto,
      Referencia,
      Marca,
      Numero_de_Orden,
      Fecha_de_Compra,
      Cantidad,
      Fk_Nombre_Empresa_Suministradora,
    };

    try {
      // Agregar el producto usando la función del controlador de la base de datos
      const newProduct = await addProduct(productData);
      console.log("Producto añadido exitosamente:", newProduct);

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

      if (newProduct) {
        appendAlert("Producto añadido exitosamente", "success");

      }

      // Aquí puedes hacer algo con el nuevo producto, como mostrar un mensaje de éxito o actualizar la lista de productos en la interfaz de usuario
    } catch (error) {
      console.error("Error al añadir el producto:", error);
      // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
    }
  });

// buscar elemento por id
// Manejador del evento de búsqueda
const btnIdSearch = document.getElementById("inventory_btn-search");
btnIdSearch.addEventListener("click", async () => {

  const productId = document.getElementById("inventarySearchInput").value;

  try {
    const product = await getProductById(productId);
    console.log(product);

    // Construir el HTML para mostrar los detalles del producto
    const productDetailsHTML = `
      <div>
        <p><strong>ID:</strong> ${product.Pk_Id_Producto}</p>
        <p><strong>Nombre:</strong> ${product.Nombre_Producto}</p>
        <p><strong>Referencia:</strong> ${product.Referencia}</p>
        <p><strong>Marca:</strong> ${product.Marca}</p>
        <p><strong>Número de Orden:</strong> ${product.Numero_de_Orden}</p>
        <p><strong>Fecha de Compra:</strong> ${product.Fecha_de_Compra}</p>
        <p><strong>Cantidad:</strong> ${product.Cantidad}</p>
        <p><strong>NIT Empresa Suministradora:</strong> ${product.Fk_NIT_Empresa_Suministradora}</p>
      </div>
    `;

    // Actualizar el contenido del modal con los detalles del producto
    const productDetailsContainer = document.getElementById(
      "product-details-content"
    );
    productDetailsContainer.innerHTML = productDetailsHTML;

    // Mostrar el modal
    const productDetailsModal = new bootstrap.Modal(
      document.getElementById("productDetailsModal")
    );
   productDetailsModal.show();
  } catch (error) {
    console.error("Error al obtener el producto:", error);
  }
});
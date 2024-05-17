import * as bootstrap from "bootstrap";
import {
  getEmpresas,
  getProductById,
  getProducts,
  addProduct,
  updateProduct,
} from "../controllers/db.contoller";
import { printDataInventario } from "../controllers/index.controller";

// Función para poblar el formulario modal de edición con los datos del producto

// manejador para añadir habitual -----------
// Manejador de evento para el formulario "Añadir habitual"
function postProductHandler() {
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

        if (newProduct) {
          appendAlert("Producto añadido exitosamente", "success");
        }
        // Aquí puedes hacer algo con el nuevo producto, como mostrar un mensaje de éxito o actualizar la lista de productos en la interfaz de usuario
      } catch (error) {
        console.error("Error al añadir el producto:", error);
        // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
      }
    });
}

//   --------------------------

// Manejador de evento para el botón de edición de productos
// async function updateProductHandler() {
//   let productId;

//   document.addEventListener("click", async (event) => {
//     if (event.target.classList.contains("btn_edit")) {
//       productId = event.target.dataset.productId;
//       try {
//         // Obtener el producto por su ID
//         const product = await getProductById(productId);
//         const editModalLabel = document.getElementById("editProductModalLabel");

//         editModalLabel.innerText = "Editar producto con el ID: " + productId;

//         function populateEditForm(product) {
//           document.getElementById("edit_nombre_producto").value =
//             product.Nombre_Producto;

//           // console.log("Nombre del producto:", product.Nombre_Producto, " y el id ", productId );

//           document.getElementById("edit_referencia").value = product.Referencia;

//           document.getElementById("edit_marca").value = product.Marca;

//           document.getElementById("edit_num_orden").value =
//             product.Numero_de_Orden;

//           document.getElementById("edit_fecha_compra").value =
//             product.Fecha_de_Compra;

//           document.getElementById("edit_cantidad").value = product.Cantidad;
//         }
//         populateEditForm(product);

//         // Mostrar el formulario modal de edición
//         const editModal = new bootstrap.Modal(
//           document.getElementById("editProductModal")
//         );
//         editModal.show();
//       } catch (error) {
//         console.error("Error al obtener el producto:", error);
//         // Manejar el error, por ejemplo, mostrando un mensaje al usuario
//       }
//     }
//   });

//   // Manejador de evento para el formulario modal de edición
//   document
//     .getElementById("editProductForm")
//     .addEventListener("submit", async (event) => {
//       event.preventDefault();
//       const updatedData = {
//         Nombre_Producto: document.getElementById("edit_nombre_producto").value,
//         Referencia: document.getElementById("edit_referencia").value,
//         Marca: document.getElementById("edit_marca").value,
//         Numero_de_Orden: document.getElementById("edit_num_orden").value,
//         Fecha_de_Compra: document.getElementById("edit_fecha_compra").value,
//         Cantidad: document.getElementById("edit_cantidad").value,
//       };

//       try {
//         // Actualizar el producto utilizando la función updateProduct
//         const updatedProductRes = await updateProduct(productId, updatedData);
//         // Mostrar un mensaje de éxito al usuario
//         // Cerrar el formulario modal de edición
//         const editModal = bootstrap.Modal.getInstance(
//           document.getElementById("editProductModal")
//         );

//         editModal.hide();

//         const alertPlaceholder = document.getElementById(
//           "liveAlertPlaceholder"
//         );
//         const appendAlert = (message, type) => {
//           const wrapper = document.createElement("div");
//           wrapper.innerHTML = [
//             `<div class="alert alert-${type} alert-dismissible" role="alert">`,
//             `   <div>${message}</div>`,
//             '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
//             "</div>",
//           ].join("");

//           alertPlaceholder.append(wrapper);
//         };

//         if (updatedProductRes) {
//           appendAlert("Producto actualizado exitosamente", "primary");
//         }

//         printDataInventario();
//       } catch (error) {
//         console.error("Error al actualizar el producto:", error);
//         // Manejar el error, por ejemplo, mostrando un mensaje al usuario
//       }
//     });
// }

// Manejador de evento para el botón de edición de productos
async function updateProductHandler() {
  document.addEventListener("click", async (event) => {
    if (event.target.classList.contains("btn_edit")) {
      const productId = event.target.dataset.productId;
      try {
        // Obtener el producto por su ID
        const product = await getProductById(productId);
        const editModalLabel = document.getElementById("editProductModalLabel");
        const editForm = document.getElementById("editProductForm");

        editModalLabel.innerText = "Editar producto con el ID: " + productId;

        // Guardar productId como atributo personalizado del formulario
        editForm.dataset.productId = productId;

        function populateEditForm(product) {
          document.getElementById("edit_nombre_producto").value =
            product.Nombre_Producto;
          document.getElementById("edit_referencia").value = product.Referencia;
          document.getElementById("edit_marca").value = product.Marca;
          document.getElementById("edit_num_orden").value =
            product.Numero_de_Orden;
          document.getElementById("edit_fecha_compra").value =
            product.Fecha_de_Compra;
          document.getElementById("edit_cantidad").value = product.Cantidad;
        }
        populateEditForm(product);

        // Mostrar el formulario modal de edición
        const editModal = new bootstrap.Modal(
          document.getElementById("editProductModal")
        );
        editModal.show();
      } catch (error) {
        console.error("Error al obtener el producto:", error);
        // Manejar el error, por ejemplo, mostrando un mensaje al usuario
      }
    }
  });

  // Manejador de evento para el formulario modal de edición
  document.getElementById("editProductForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const productId = event.currentTarget.dataset.productId; 
    const updatedData = {
      Nombre_Producto: document.getElementById("edit_nombre_producto").value,
      Referencia: document.getElementById("edit_referencia").value,
      Marca: document.getElementById("edit_marca").value,
      Numero_de_Orden: document.getElementById("edit_num_orden").value,
      Fecha_de_Compra: document.getElementById("edit_fecha_compra").value,
      Cantidad: document.getElementById("edit_cantidad").value,
    };

    try {
      // Actualizar el producto utilizando la función updateProduct
      const updatedProductRes = await updateProduct(productId, updatedData);
      // Mostrar un mensaje de éxito al usuario
      // Cerrar el formulario modal de edición
      const editModal = bootstrap.Modal.getInstance(document.getElementById("editProductModal"));
      editModal.hide();

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

      if (updatedProductRes) {
        appendAlert("Producto actualizado exitosamente", "primary");
      }

      printDataInventario();
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      // Manejar el error, por ejemplo, mostrando un mensaje al usuario
    }
  });
}


export { updateProductHandler, postProductHandler };

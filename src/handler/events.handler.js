import * as bootstrap from "bootstrap";
import {
  getEmpresas,
  getProductById,
  getProducts,
  addProduct,
  updateProduct,
  addVisita,
  getVisitaById,
  getLogin,
  } from "../controllers/db.contoller";
import {
  printDataInventario,
  showAlert,
} from "../controllers/index.controller";

// función para refrescar el contenido dinamico de inventario


export function refreshWindow(delay = 2000) {
  setTimeout(() => {
    location.reload();
  }, delay);
}

// manejador buscar producto por id
export function SearchProductId() {
  const btnIdSearch = document.getElementById("inventory_btn-search");

  const invSearch = btnIdSearch.addEventListener("click", async () => {
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
}

// -----------------------------

// manejador para añadir inventario -----------
export function postProductHandler() {
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

        const newProductModal = bootstrap.Modal.getInstance(
          document.getElementById("newProductModal")
        );
        newProductModal.hide();

        document.getElementById("inventario-form").reset();

        // refreshWindow()

        // Aquí puedes hacer algo con el nuevo producto, como mostrar un mensaje de éxito o actualizar la lista de productos en la interfaz de usuario
      } catch (error) {
        console.error("Error al añadir el producto:", error);
        // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
      }
    });
}



export async function updateProductHandler() {
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
          document.getElementById("edit_fecha_compra").value = new Date(
            product.Fecha_de_Compra
          ).toLocaleDateString();
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
  document
    .getElementById("editProductForm")
    .addEventListener("submit", async (event) => {
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
        const editModal = bootstrap.Modal.getInstance(
          document.getElementById("editProductModal")
        );
        editModal.hide();

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

        if (updatedProductRes) {
          appendAlert("Producto actualizado exitosamente", "primary");
        }
      } catch (error) {
        console.error("Error al actualizar el producto:", error);
        // Manejar el error, por ejemplo, mostrando un mensaje al usuario
      }
    });
}

// Manejador para añadir visita técnica-----------

export function postVisitaHandler() {
  document
    .getElementById("visit-form")
    .addEventListener("submit", async (event) => {
      event.preventDefault(); // Evitar que el formulario se envíe automáticamente

      const fecha_visita = document.getElementById("fecha_visita").value;
      const tipo_visita = document.getElementById("tipo_visita").value;
      const descripcion = document.getElementById("descripcion").value;
      const cc_usuario = document.getElementById(
        "clienteCC_select_input"
      ).value;
      const id_producto = document.getElementById("clienteProducto").value;
      const num_cuenta_cliente = document.getElementById(
        "cuentaClienteSelect"
      ).value;

      // Crear objeto con los datos de la visita
      const visitaData = {
        fecha_visita,
        tipo_visita,
        descripcion,
        cc_usuario,
        id_producto,
        num_cuenta_cliente,
      };

      try {
        // Agregar la visita usando la función del controlador de la base de datos
        const newVisita = await addVisita(visitaData);

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

        if (newVisita && newVisita.success) {
          appendAlert("Visita añadida exitosamente", "success");
        }

        // Cerrar el modal después de agregar la visita
        const newVisitModal = bootstrap.Modal.getInstance(
          document.getElementById("newVisitModal")
        );
        newVisitModal.hide();

        // Limpiar el formulario después de agregar la visita
        document.getElementById("visit-form").reset();

        // Actualizar la ventana después de agregar la visita
        refreshWindow();
      } catch (error) {
        console.error("Error al añadir la visita:", error);
        appendAlert("Error al añadir la visita", "danger");
        // Manejar el error, como mostrar un mensaje de error al usuario
      }
    });
}



// manejador mostrar descripción visitas

// manejador buscar visita por id

// ---------------- handler login -----------------
export async function loginHandler() {
  
    const btnLogin = document.getElementById('btnLogin');
    btnLogin.addEventListener('click', async () => {
      const usuario = document.getElementById('usuario').value;
      const contrasena = document.getElementById('contrasena').value;
      
      try {
        const loginReq = await getLogin(usuario, contrasena);
      } catch (error) {
        console.error('Error al manejar el login:', error);
      }
    });
}
import "../styles.scss";
import * as bootstrap from "bootstrap";
import router from "../router/index.routes";
import { addProduct } from "../controllers/db.contoller";

router(window.location.hash);
window.addEventListener("hashchange", () => {
  router(window.location.hash);
});

// Manejador de evento para el formulario "Añadir habitual"
document
  .getElementById("inventario-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente

    // Obtener los datos del formulario
    const id = document.getElementById("id_producto").value;
    const nombre = document.getElementById("nombre_producto").value;
    const referencia = document.getElementById("referencia").value;
    const marca = document.getElementById("marca").value;
    const numOrden = document.getElementById("num_orden").value;
    const fechaCompra = document.getElementById("fecha_compra").value;
    const cantidad = document.getElementById("cantidad").value;
    const nit = document.getElementById("nit_suministradora").value;

    // Crear objeto con los datos del producto
    const productData = {
      id,
      nombre,
      referencia,
      marca,
      numOrden,
      fechaCompra,
      cantidad,
      nit,
    };

    try {
      // Agregar el producto usando la función del controlador de la base de datos
      const newProduct = await addProduct(productData);
      console.log("Producto añadido exitosamente:", newProduct);
      // Aquí puedes hacer algo con el nuevo producto, como mostrar un mensaje de éxito o actualizar la lista de productos en la interfaz de usuario
    } catch (error) {
      console.error("Error al añadir el producto:", error);
      // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
    }
  });

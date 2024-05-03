//solicitar datos inventario
// db controller 

async function getProducts() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const inventario_data = await response.json();

    return inventario_data;
  } catch (error) {
    console.error("Surgió un error al solicitar los datos ", error);
  }
}


// CREATE: Agregar un nuevo producto
async function addProduct(productData) {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(productData)
    });
    const newProduct = await response.json();
    return newProduct;
  } catch (error) {
    console.error("Error al agregar un producto:", error);
    throw error;
  }
}


// UPDATE: Actualizar un producto existente
async function updateProduct(productId, updatedData) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedData)
    });
    const updatedProduct = await response.json();
    return updatedProduct;
  } catch (error) {
    console.error(`Error al actualizar el producto con ID ${productId}:`, error);
    throw error;
  }
}

// DELETE: Eliminar un producto existente
async function deleteProduct(productId) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${productId}`, {
      method: "DELETE"
    });
    if (!response.ok) {
      throw new Error(`Error al eliminar el producto con ID ${productId}`);
    }
  } catch (error) {
    console.error(`Error al eliminar el producto con ID ${productId}:`, error);
    throw error;
  }
}

export { addProduct, getProducts, updateProduct, deleteProduct };
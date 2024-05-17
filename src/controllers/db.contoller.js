// -----------------inventario----------------------

export async function addProduct(productData) {
  try {
    const response = await fetch("http://localhost:3000/inventario", {
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

export async function getProducts() {
  try {
    const response = await fetch("http://localhost:3000/inventario");
    const inventario_data = await response.json();

    return inventario_data;
  } catch (error) {
    console.error("Surgió un error al solicitar los datos ", error);
    throw error;
  }
}

export async function getProductById(productId) {
  try {
    const response = await fetch(`http://localhost:3000/inventario/${productId}`);
    const product = await response.json();
    return product[0];
  } catch (error) {
    console.error(`Error al obtener el producto con ID ${productId}:`, error);
    throw error;
  }
}

export async function updateProduct(productId, updatedData) {
  try {
    const response = await fetch(`http://localhost:3000/inventario/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedData)
    });
    const updatedProduct = await response.json();
    return updatedProduct;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteProduct(productId) {
  try {
    console.log(productId)
    const response = await fetch(`http://localhost:3000/inventario/${productId}`, {
      method: "DELETE"
    });
    if (!response.ok) {
      throw new Error(`Error al eliminar el producto con ID ${productId}`);
    }
    return response.json()
  } catch (error) {
    console.error(`Error al eliminar el producto con ID ${productId}:`, error);
    throw error;
  }
}

// ------------------------visitas-----------------

export async function addVisita(visitaData) {
  try {
    const response = await fetch("http://localhost:3000/visitas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(visitaData)
    });
    const newVisita = await response.json();
    return newVisita;
  } catch (error) {
    console.error("Error al agregar una visita técnica:", error);
    throw error;
  }
}

export async function getVisitas() {
  try {
    const response = await fetch("http://localhost:3000/visitas");
    const visitasData = await response.json();
    return visitasData;
  } catch (error) {
    console.error("Error al obtener las visitas técnicas:", error);
    throw error;
  }
}

export async function getVisitaById(visitaId) {
  try {
    const response = await fetch(`http://localhost:3000/visitas/${visitaId}`);
    const visita = await response.json();
    return visita[0];
  } catch (error) {
    console.error(`Error al obtener la visita técnica con ID ${visitaId}:`, error);
    throw error;
  }
}

export async function updateVisita(visitaId, updatedData) {
  try {
    const response = await fetch(`http://localhost:3000/visitas/${visitaId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedData)
    });
    const updatedVisita = await response.json();
    return updatedVisita;
  } catch (error) {
    console.error(`Error al actualizar la visita técnica con ID ${visitaId}:`, error);
    throw error;
  }
}

export async function deleteVisita(visitaId) {
  try {
    const response = await fetch(`http://localhost:3000/visitas/${visitaId}`, {
      method: "DELETE"
    });
    if (!response.ok) {
      throw new Error(`Error al eliminar la visita técnica con ID ${visitaId}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Error al eliminar la visita técnica con ID ${visitaId}:`, error);
    throw error;
  }
}

// -------------------empresas ----------------------------

export async function getEmpresas() {
  try {
    const response = await fetch("http://localhost:3000/Empresa_Suministradora");
    const empresas = await response.json();
    
    return empresas;
  } catch (error) {
    console.error("Surgió un error al solicitar los datos ", error);
    throw error;
  }
}


// ----------------------------Clientes ----------------------
export async function getClientes() {
  try {
    const response = await fetch("http://localhost:3000/Clientes");
    const ClientesData = await response.json();
    return ClientesData;
  } catch (error) {
    console.error("Error al obtener los Clientes:", error);
    throw error;
  }
}
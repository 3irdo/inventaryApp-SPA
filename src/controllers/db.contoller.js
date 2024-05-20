// --------------------------auth ------------
export async function getLogin(usuario, contrasena) {
  try {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Fk_CC_Usuario: usuario, Contraseña: contrasena }),
    });

    if (response.ok) {
      const userName = document.getElementById("bnt_userLoged");
      if (userName) {
        const userData = await getUsuarioTecnico();
        userData.forEach((user) => {
          if (user.Pk_CC_Usuario === usuario) {
            userName.textContent = `${user.Nombre_Usuario}`;
          }
        });
      }
      window.location.href = "#/inventario"; // Redireccionar al inventario si el login es exitoso
    } else {
      console.error("Error al iniciar sesión:", response.statusText);
      // Aquí puedes mostrar un mensaje de error al usuario
    }
  } catch (error) {
    console.error("Error en la solicitud de login:", error);
    // Aquí puedes mostrar un mensaje de error al usuario
  }
}
// ---------------------------

// -----------------inventario----------------------

export async function addProduct(productData) {
  try {
    const response = await fetch("http://localhost:3000/inventario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    const newProduct = await response.json();
    console.log(newProduct);
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
    const response = await fetch(
      `http://localhost:3000/inventario/${productId}`
    );
    const product = await response.json();
    return product[0];
  } catch (error) {
    console.error(`Error al obtener el producto con ID ${productId}:`, error);
    throw error;
  }
}

export async function updateProduct(productId, updatedData) {
  try {
    const response = await fetch(
      `http://localhost:3000/inventario/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );
    const updatedProduct = await response.json();
    return updatedProduct;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteProduct(productId) {
  try {
    console.log(productId);
    const response = await fetch(
      `http://localhost:3000/inventario/${productId}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error(`Error al eliminar el producto con ID ${productId}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Error al eliminar el producto con ID ${productId}:`, error);
    throw error;
  }
}

// ------------------------visitas-----------------

export async function addVisita(visitaData) {
  try {
    const response = await fetch("http://localhost:3000/Visita_Tecnica/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(visitaData),
    });
    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }

    await response.json();
  } catch (error) {
    console.error("Error al agregar una visita técnica:", error);
    throw error;
  }
}

export async function getVisitas() {
  try {
    const response = await fetch("http://localhost:3000/Visita_Tecnica");
    const visitasData = await response.json();
    return visitasData;
  } catch (error) {
    console.error("Error al obtener las visitas técnicas:", error);
    throw error;
  }
}

export async function getVisitaById(visitaId) {
  try {
    const response = await fetch(
      `http://localhost:3000/Visita_Tecnica/${visitaId}`
    );
    const visita = await response.json();
    return visita[0];
  } catch (error) {
    console.error(
      `Error al obtener la visita técnica con ID ${visitaId}:`,
      error
    );
    throw error;
  }
}

export async function updateVisita(visitaId, updatedData) {
  try {
    const response = await fetch(
      `http://localhost:3000/Visita_Tecnica/${visitaId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );
    const updatedVisita = await response.json();
    return updatedVisita;
  } catch (error) {
    console.error(
      `Error al actualizar la visita técnica con ID ${visitaId}:`,
      error
    );
    throw error;
  }
}

export async function deleteVisita(visitaId) {
  try {
    const response = await fetch(
      `http://localhost:3000/Visita_Tecnica/${visitaId}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error(`Error al eliminar la visita técnica con ID ${visitaId}`);
    }
    return response.json();
  } catch (error) {
    console.error(
      `Error al eliminar la visita técnica con ID ${visitaId}:`,
      error
    );
    throw error;
  }
}

// -------------------empresas ----------------------------

export async function getEmpresas() {
  try {
    const response = await fetch(
      "http://localhost:3000/Empresa_Suministradora"
    );
    const empresas = await response.json();

    return empresas;
  } catch (error) {
    console.error("Surgió un error al solicitar los datos ", error);
    throw error;
  }
}

export async function getEmpresaById(empresaId) {
  try {
    const response = await fetch(
      `http://localhost:3000/Empresa_Suministradora/${empresaId}`
    );
    const empresa = await response.json();
    return empresa[0];
  } catch (error) {
    console.error(`Error al obtener la empresa con ID ${empresaId}:`, error);
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

// ------------------------ usuarios tecnicos ----------
export async function getUsuarioTecnico() {
  try {
    const response = await fetch("http://localhost:3000/Usuario_Tecnico");
    const usuario_data = await response.json();
    console.log(usuario_data);
    return usuario_data;
  } catch (error) {
    console.error("Error al obtener los datos de los usuarios", error);
    throw error;
  }
}

export async function getUsuarioTecnicoById(userId) {
  try {
    const response = await fetch(
      `http://localhost:3000/Usuario_Tecnico/${userId}`
    );
    const user = await response.json();
    return user;
  } catch (error) {
    console.error(`Error al obtener el usuario con ID ${userId}:`, error);
    throw error;
  }
}

export async function addUsuarioTecnico(userData) {
  try {
    const response = await fetch("http://localhost:3000/Usuario_Tecnico", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    console.log(userData);

    return response;
  } catch (error) {
    console.error("Error al agregar el nuevo usuario:", error);
    throw error;
  }
}

export async function deleteUsuarioTecnico(userId) {
  try {
    const response = await fetch(
      `http://localhost:3000/Usuario_Tecnico/${userId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(
        `Error al eliminar usuario técnico con ID ${userId}: ${errorMessage}`
      );
    }

    return response.json();
  } catch (error) {
    console.error(
      `Error al eliminar la visita técnica con ID ${userId}:`,
      error
    );
    throw error;
  }
}

export async function updateUsuarioTecnico(userId, updatedData) {
  try {
    const response = await fetch(
      `http://localhost:3000/Usuario_Tecnico/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );
    const updatedUsuario = await response.json();
    return updatedUsuario;
  } catch (error) {
    console.error(
      `Error al actualizar la visita técnica con ID ${userId}:`,
      error
    );
    throw error;
  }
}

export async function closeConnections() {
  try {
    const response = await fetch("http://localhost:3000/close-connections", {
      method: "POST",
    });
    const result = await response.json();
    console.log(result.message);
  } catch (error) {
    console.error("Error al cerrar conexiones:", error);
  }
}

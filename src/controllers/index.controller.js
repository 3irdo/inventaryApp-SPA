// index controller

import loginView from "../views/login.html";
import homeView from "../views/home.html";
import inventoryView from "../views/inventory.html";
import hVisitasView from "../views/historial_visitas.html";
import { getProducts } from "./db.contoller";

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
  contenidoDinamico.classList = "fade-in-out"
  const inventario_data = await getProducts();

  inventario_data.forEach((producto) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `<td>${producto.id}</td> <td>${producto.name}</td><td>${producto.email}</td><td>${producto.phone}</td><td>${producto.username}</td><td>${producto.website}</td> <button class="btn btn-danger"></button>`;
    tablaBody_N.appendChild(fila);
    console.log(fila);
  });
}

async function printVisitas() {
  const contenidoDinamico = document.getElementById("contenidoDinamico");
  contenidoDinamico.classList = "fade-in-out"
  contenidoDinamico.innerHTML = hVisitasView;
  const hVisitas_data = await getProducts();

  hVisitas_data.forEach((visita) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `<td>${visita.id}</td> <td>${visita.company.catchPhrase}</td><td>${visita.email}</td><td>${visita.phone}</td><td>${visita.username}</td><td>${visita.website}</td> <button class="btn btn-danger"></button>`;
    tablaBody_N.appendChild(fila);
    console.log(fila);
  });
}

// document.getElementById('agregar-inventario').addEventListener('click', agregarFilaInventario);

export { Home, Login, printVisitas, printDataInventario };

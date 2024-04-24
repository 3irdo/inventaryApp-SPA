import loginView from '../views/login.html'
import homeView from '../views/home.html'



function Home () {
  const divElement = document.createElement("div");
  divElement.innerHTML = homeView;
  divElement.classList = "main-container container d-flex"

  return divElement;
};

function Login () {
  const divElement = document.createElement("div");
  divElement.innerHTML = loginView;
  divElement.classList = "login-container container d-flex"

  return divElement;
};



export {Home, Login}
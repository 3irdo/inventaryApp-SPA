// Import our custom CSS
import '../styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import router from "../router/index.routes";

router(window.location.hash);
window.addEventListener("hashchange", () => {
  router(window.location.hash);
});

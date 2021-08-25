import "@fortawesome/fontawesome-svg-core/styles.css";

import { config, library } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faCheckSquare,
  faCoffee,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import { fab } from "@fortawesome/free-brands-svg-icons";

config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

library.add(fab, faCheckSquare, faCoffee, faBars, faTimes);

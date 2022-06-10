import "@fortawesome/fontawesome-svg-core/styles.css";

import { config, library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faBars,
  faCheckSquare,
  faCoffee,
  faTimes,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

library.add(fab, faCheckSquare, faCoffee, faBars, faTimes, faPlus);

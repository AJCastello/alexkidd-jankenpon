// style
import "./styles/globals.css";
import "./styles/title.css";
import "./styles/button.css";
import "./styles/heroActive.css";
import "./styles/think.css";
import "./styles/animate.css";

// routes
import { Routes } from "./routes/routes";

// utils
import { keyHandler } from "./utils/keyHandler";

const app = document.querySelector<HTMLDivElement>("#app")!;
Routes(app);

window.addEventListener("keydown", (e) => keyHandler.onKeyDown(e));

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "@material-tailwind/react/tailwind.css";
import "@material-tailwind/react";

import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <App />
  // </StrictMode>
);

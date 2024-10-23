import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import Root from "./routes/Root.jsx";
import ViewPDF from "./routes/ViewPDF.jsx";
import "./styles/index.css";

// JSX declaration
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Root />} path="/" />
      <Route element={<ViewPDF />} path="ViewPDF" />
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MoviesProvider } from "./components/MoviesContext";
import { UserProvider } from "./components/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <React.StrictMode>
      <UserProvider>
         <MoviesProvider>
            <App />
         </MoviesProvider>
      </UserProvider>
   </React.StrictMode>
);

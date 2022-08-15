import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MoviesProvider } from "./components/MoviesContext";
import { UserProvider } from "./components/UserContext";
import {
   AllUsersContext,
   AllUsersProvider,
} from "./components/AllUsersContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <React.StrictMode>
      <UserProvider>
         <AllUsersProvider>
            <MoviesProvider>
               <App />
            </MoviesProvider>
         </AllUsersProvider>
      </UserProvider>
   </React.StrictMode>
);

import { createContext, useEffect, useState } from "react";
import LoadingWrapper from "./LoadingWrapper";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
   const [user, setUser] = useState(null);

   const accessToken = localStorage.getItem("accessToken");

   useEffect(() => {
      if (accessToken !== null) {
         fetch("/loggedinuser", {
            method: "GET",
            headers: {
               "Content-type": "application/json",
               Authorization: "Bearer " + accessToken,
            },
         })
            .then((res) => res.json())
            .then((response) => {
               console.log(response.user);
               setUser(response.user);
            });
      }
   }, []);

   const reFetch = () => {
      if (accessToken !== null) {
         fetch("/loggedinuser", {
            method: "GET",
            headers: {
               "Content-type": "application/json",
               Authorization: "Bearer " + accessToken,
            },
         })
            .then((res) => res.json())
            .then((response) => {
               console.log(response.user);
               setUser(response.user);
            });
      }
   };

   if (accessToken !== null && user === null) {
      return <LoadingWrapper />;
   }

   return (
      <UserContext.Provider
         value={{
            user,
            reFetch,
         }}
      >
         {children}
      </UserContext.Provider>
   );
};

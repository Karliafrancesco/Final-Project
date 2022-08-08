import { createContext, useEffect, useState } from "react";

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

   if (accessToken !== null && user === null) {
      return <div>loading</div>;
   }

   return (
      <UserContext.Provider
         value={{
            user,
         }}
      >
         {children}
      </UserContext.Provider>
   );
};

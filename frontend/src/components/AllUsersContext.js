import { createContext, useEffect, useState } from "react";
import LoadingWrapper from "./LoadingWrapper";

export const AllUsersContext = createContext(null);

export const AllUsersProvider = ({ children }) => {
   const [users, setUsers] = useState(null);
   const [loading, setLoading] = useState("loading");
   const [value, setValue] = useState("");
   const [search, setSearch] = useState(false);

   useEffect(() => {
      fetch("/users")
         .then((res) => res.json())
         .then((data) => {
            setUsers(data.users);
            setLoading("idle");
            console.log(data.users);
         });
   }, []);

   if (loading === "loading") {
      return <LoadingWrapper />;
   }

   return (
      <AllUsersContext.Provider
         value={{
            users,
            value,
            setValue,
            search,
            setSearch,
         }}
      >
         {children}
      </AllUsersContext.Provider>
   );
};

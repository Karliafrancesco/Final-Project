import { createContext, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { FiLoader } from "react-icons/fi";

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
      return (
         <LoaderWrapper>
            <Icon>
               <FiLoader style={{ height: "30px", width: "30px" }} />
            </Icon>
         </LoaderWrapper>
      );
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

const LoaderWrapper = styled.div`
   height: 500px;
`;

const turning = keyframes`
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    `;

const Icon = styled.div`
   position: absolute;
   width: 30px;
   height: 30px;
   top: 49%;
   left: 49%;
   animation: ${turning} 1000ms infinite linear;
`;

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AllUsersContext } from "../AllUsersContext";
import { MdClear } from "react-icons/md";
import LoadingWrapper from "../LoadingWrapper";

const SearchUsers = () => {
   const { users, value, setValue, search, setSearch } =
      useContext(AllUsersContext);

   let navigate = useNavigate();

   const matchedSuggestions = users?.filter((x) => {
      console.log("suggestion", x);
      return x.username.toLowerCase().includes(value.toLowerCase());
   });

   return (
      <SearchBar>
         <Input
            onChange={(ev) => {
               setValue(ev.target.value);
               setSearch(false);
            }}
            type="text"
            placeholder="Search users"
            value={value}
         />

         <MdClear onClick={() => setValue("")} />

         {value?.length >= 2 && matchedSuggestions?.length > 0 ? (
            <Ul>
               {" "}
               {!search &&
                  matchedSuggestions.slice(0, 15).map((suggestion) => {
                     return (
                        <Li
                           key={suggestion._id}
                           onClick={() => {
                              navigate(`/other/profile/${suggestion._id}`);
                              setValue(suggestion.username);
                              setSearch(!search);
                           }}
                        >
                           {suggestion.username}
                        </Li>
                     );
                  })}{" "}
            </Ul>
         ) : null}
      </SearchBar>
   );
};

const Input = styled.input`
   width: 250px;
   height: 25px;
   border-radius: 3px;
   font-size: 15px;
   text-decoration: none;
   padding-left: 20px;
   margin-right: 15px;
`;

const Submit = styled.input``;

const Ul = styled.ul`
   z-index: 10;
   position: absolute;
   top: 45px;
   padding: 5px;
   background-color: #2b2b2b;
   color: white;
`;

const Li = styled.li`
   list-style-type: none;
   padding-bottom: 5px;
   width: 200px;
   :hover {
      font-weight: bold;
      color: gold;
   }
`;

const SearchBar = styled.div`
   display: flex;
   align-items: center;
`;

export default SearchUsers;

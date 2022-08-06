import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
   let nav = useNavigate();

   return (
      <Wrapper>
         <NavBar>
            <Options
               onClick={() => {
                  nav("/");
               }}
            >
               Search Movie
            </Options>
            <Options>Search Actors</Options>
            {/* <Options>Search vehicle</Options> */}
         </NavBar>
      </Wrapper>
   );
};

export default Navbar;

const Wrapper = styled.div`
   display: flex;
   justify-content: center;
   color: white;
   box-shadow: 0 6px 6px -6px gray;
   font-weight: bold;
   background: #232324;
   box-shadow: 1px 6px 6px -6px gray;
`;

const NavBar = styled.div`
   display: flex;
   justify-content: center;
   width: 100%;
`;

const Options = styled.button`
   background-color: transparent;
   font-size: 15px;
   border: none;
   display: flex;
   text-align: center;
   padding: 10px 20px;
   border-bottom: 1px solid grey;
   cursor: pointer;
   color: white;
   opacity: 0.5;

   &:hover {
      color: white;
      opacity: 1;
      /* border-bottom: 2px solid white; */
   }

   &.active {
      color: blue;
      border-radius: 35px;
   }
`;

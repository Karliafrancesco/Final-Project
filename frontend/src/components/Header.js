import styled from "styled-components";
import { BiCameraMovie } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
   let nav = useNavigate();

   return (
      <>
         <Container>
            <Wrapper>
               <TitleAndIcon
                  onClick={() => {
                     nav("/");
                  }}
               >
                  <BiCameraMovie style={{ color: "black" }} />
                  <Title>Find Film</Title>
               </TitleAndIcon>
               <SignIn>Sign In</SignIn>
            </Wrapper>
         </Container>
      </>
   );
};

export default Navbar;

const Wrapper = styled.div`
   /* box-shadow: 0 6px 6px -6px gray; */
   display: flex;
   justify-content: space-between;
   width: 100%;
   position: relative;
   background: #2b2b2b;
`;

const TitleAndIcon = styled.div`
   display: flex;
   align-items: center;
   gap: 10px;
   background-color: gold;
   margin: 10px 0 10px 100px;
   border-radius: 5px;
   padding: 0 6px;
   cursor: pointer;
`;

const Container = styled.div`
   width: 100%;
`;

const Title = styled.div`
   /* display: flex;
   justify-content: center; */
   font-size: 20px;
   margin: 10px 0;
   color: black;
   font-weight: bold;
   margin-left: 0px;
`;

const SignIn = styled.button`
   background: transparent;
   border: none;
   margin-right: 100px;
   color: white;
   font-weight: bold;
   cursor: pointer;
`;

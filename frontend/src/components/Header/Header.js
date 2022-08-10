import styled from "styled-components";
import { BiCameraMovie } from "react-icons/bi";
import { GrLogout } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";

const Navbar = () => {
   let nav = useNavigate();

   const { user } = useContext(UserContext);

   //removes accessKey from localstorage on signout, redirects to homepage
   const removeAccessKey = () => {
      localStorage.removeItem("accessToken");
      window.location.href = "/";
   };

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
               <Creds>
                  {user === null ? (
                     <>
                        <SignIn
                           onClick={() => {
                              nav("/signin");
                           }}
                        >
                           {" "}
                           Sign in |
                        </SignIn>
                        <SignUp
                           onClick={() => {
                              nav("/signup");
                           }}
                        >
                           {" "}
                           Sign up
                        </SignUp>
                     </>
                  ) : (
                     <SignedInProfile>
                        <LinkTo to={`/profile/${user._id}`}>
                           <ProfileName>{user.username}</ProfileName>
                        </LinkTo>
                        <LogoutLogo>
                           <GrLogout
                              onClick={() => {
                                 removeAccessKey();
                              }}
                              size="35px"
                              style={{
                                 cursor: "pointer",
                                 color: "red",
                              }}
                           ></GrLogout>
                        </LogoutLogo>
                     </SignedInProfile>
                  )}
               </Creds>
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

const Creds = styled.div`
   display: flex;
`;

const SignIn = styled.button`
   background: transparent;
   border: none;
   color: white;
   margin-right: 3px;
   font-weight: bold;
   cursor: pointer;

   &:hover {
      color: gold;
      text-decoration: none;
      border: none;
   }
`;

const SignUp = styled.button`
   background: transparent;
   border: none;
   margin-right: 100px;
   color: white;
   font-weight: bold;
   cursor: pointer;

   &:hover {
      color: gold;
      text-decoration: none;
      border: none;
   }
`;

const LogoutLogo = styled.div`
   &:hover {
      background: white;
      opacity: 0.5;
   }
`;

const SignedInProfile = styled.div`
   display: flex;
   align-items: center;
   margin-right: 100px;
   gap: 25px;
`;

const LinkTo = styled(Link)`
   text-decoration: none;
   color: white;
`;

const SignOut = styled.button`
   margin-right: 100px;
`;

const ProfileName = styled.div`
   cursor: pointer;
   font-size: 20px;
`;

import { useState, useNavigate } from "react";
import styled from "styled-components";

const SignIn = () => {
   const [username, setUsername] = useState("");
   const [name, setName] = useState("");
   const [lastName, setLastName] = useState("");
   const [password, setPassword] = useState("");
   const [msg, setMsg] = useState("");

   const handleSubmit = (e) => {
      e.preventDefault();
   };

   return (
      <>
         <Wrapper>
            <Wrap>
               <Form onSubmit={(e) => handleSubmit(e)}>
                  <Sign>Sign In</Sign>
                  <Input
                     placeholder="username"
                     onChange={(e) => setUsername(e.target.value)}
                  />
                  <Input
                     placeholder="first name"
                     onChange={(e) => setName(e.target.value)}
                  />
                  <Input
                     placeholder="last name"
                     onChange={(e) => setLastName(e.target.value)}
                  />
                  <Input
                     type="password"
                     placeholder="password"
                     onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button type="submit">Done</Button>
               </Form>
            </Wrap>
         </Wrapper>
      </>
   );
};

const Wrapper = styled.div`
   display: flex;
   justify-content: center;
   position: relative;
   width: 100%;
   background-color: black;
`;

const Form = styled.form`
   display: flex;
   flex-direction: column;
   position: relative;
   background-color: #2b2b2b;
   padding: 20px;
   margin-top: 100px;
   border-radius: 10px;
`;

const Sign = styled.div`
   color: white;
   padding-bottom: 10px;
   font-size: 30px;
`;

const Input = styled.input`
   margin-bottom: 10px;
   height: 30px;
   width: 250px;
   font-size: 15px;
   border-radius: 5px;
   padding-left: 10px;
`;

const Button = styled.button`
   width: 70px;
   height: 30px;
   margin-top: 10px;
   align-self: center;
   text-decoration: none;
   border-radius: 10px;
   border: none;

   &:hover {
      background-color: gold;
      text-decoration: none;
      border: none;
   }
`;

const Wrap = styled.div``;

export default SignIn;

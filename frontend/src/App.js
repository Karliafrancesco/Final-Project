import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header";
import Homepage from "./components/Hompage";
import Navbar from "./components/Navbar";
import GlobalStyles from "./GlobalStyles";
import MovieDetails from "./components/MovieDetails";

const App = () => {
   return (
      <Router>
         <GlobalStyles />
         <Header />
         <Navbar />
         <Wrapper>
            <Routes>
               <Route exact path="/" element={<Homepage />} />
               <Route exact path="/movie/:id" element={<MovieDetails />} />
            </Routes>
         </Wrapper>
      </Router>
   );
};

export default App;

const Wrapper = styled.div`
   display: flex;
   /* background: var(--color-background-blue); */
   height: 2000px;
   /* width: 750px; */
`;

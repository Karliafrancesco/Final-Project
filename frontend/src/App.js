import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import GlobalStyles from "./GlobalStyles";
import MovieDetails from "./components/MovieDetails";
import SearchMovies from "./components/SearchMovies";

const App = () => {
   return (
      <Router>
         <GlobalStyles />
         <Header />
         <Navbar />
         <Wrapper>
            <Routes>
               <Route exact path="/" element={<SearchMovies />} />
               <Route
                  exact
                  path="/movie/:movie_id"
                  element={<MovieDetails />}
               />
            </Routes>
         </Wrapper>
      </Router>
   );
};

export default App;

const Wrapper = styled.div`
   display: flex;
   height: 2000px;
`;

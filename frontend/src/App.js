import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar";
import GlobalStyles from "./GlobalStyles";
import MovieDetails from "./components/MovieDetails";
import SearchMovies from "./components/SearchMovies";
import SignUp from "./components/Header/SignUp";
import SignIn from "./components/Header/SignIn";
import Profile from "./components/Profile";
import OtherProfiles from "./components/OtherProfiles";
import PopularMovies from "./components/PopularMovies";

const App = () => {
   return (
      <Router>
         <GlobalStyles />
         <Header />
         <Navbar />
         <Wrapper>
            <Routes>
               <Route exact path="/" element={<PopularMovies />} />
               <Route exact path="/search_movie" element={<SearchMovies />} />
               <Route
                  exact
                  path="/movie/:movie_id"
                  element={<MovieDetails />}
               />
               <Route exact path="/signup" element={<SignUp />} />
               <Route exact path="/signin" element={<SignIn />} />
               <Route exact path="/profile/:id" element={<Profile />} />
               <Route
                  exact
                  path="/other/profile/:id"
                  element={<OtherProfiles />}
               />
            </Routes>
         </Wrapper>
      </Router>
   );
};

export default App;

const Wrapper = styled.div`
   display: flex;
   height: fit-content;
`;

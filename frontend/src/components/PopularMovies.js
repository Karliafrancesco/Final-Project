import LoadingWrapper from "./LoadingWrapper";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const client_key = process.env.REACT_APP_KEY;

const PopularMovies = ({ movie_id }) => {
   const [status, setStatus] = useState("loading");
   const [popularMovie, setPopularMovie] = useState("");

   useEffect(() => {
      const movieDetails = async (e) => {
         const url = `https://api.themoviedb.org/3/movie/popular?api_key=${client_key}&language=en-US&page=1`;

         try {
            const res = await fetch(url);
            const data = await res.json();
            setPopularMovie(data.results);
            setStatus("idle");
         } catch (err) {
            console.log(err);
         }
      };
      movieDetails();
   }, [movie_id]);

   if (status === "loading") {
      return <LoadingWrapper />;
   }

   return (
      <Container>
         <PageTitle>Popular Movies Now</PageTitle>
         <Wrap>
            {popularMovie.map((movie) => {
               return (
                  <LinkTo to={`/movie/${movie.id}`}>
                     <Wrapper>
                        <Img
                           src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        />
                        <Title>{movie.title}</Title>
                     </Wrapper>
                  </LinkTo>
               );
            })}
         </Wrap>
      </Container>
   );
};

const Container = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
`;

const Wrap = styled.div`
   display: flex;
   flex-wrap: wrap;
   gap: 70px;
   padding-right: 50px;
   padding-left: 50px;
   display: flex;
   justify-content: center;
   background-color: black;
`;

const PageTitle = styled.div`
   display: flex;
   justify-content: center;
   color: white;
   background-color: black;
   width: 100%;
   padding-top: 25px;
   padding-bottom: 25px;
   font-size: 25px;
`;

const LinkTo = styled(Link)`
   text-decoration: none;
`;

const Wrapper = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   gap: 15px;
   width: 250px;
   height: 400px;
   margin-top: 20px;
   position: relative;
`;

const Img = styled.img`
   height: 350px;
   width: 250px;
   box-shadow: 1px 1px 4px #888888;

   &:hover {
      box-shadow: 1px 1px 2px 2px #888888;
   }
`;
const Title = styled.div`
   color: white;

   &:hover {
      color: gold;
   }
`;
export default PopularMovies;

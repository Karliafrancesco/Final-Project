import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import LoadingWrapper from "./LoadingWrapper";

const client_key = process.env.REACT_APP_KEY;

const SimilarMovies = ({ movie_id }) => {
   const [status, setStatus] = useState("loading");
   const [similarMovie, setSimilarMovie] = useState("");

   //find similar movies with the movie_id from movie details page
   useEffect(() => {
      const movieDetails = async (e) => {
         const url = `https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=${client_key}`;

         try {
            const res = await fetch(url);
            const data = await res.json();
            setSimilarMovie(data.results);
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
      <>
         <PageTitle>Similar Movies</PageTitle>
         <Wrap>
            {similarMovie.slice(0, 4).map((movie) => {
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
      </>
   );
};

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
   color: white;
   margin-top: 30px;
   margin-bottom: 30px;
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
   padding-bottom: 10px;
   width: 250px;
   height: 450px;
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
export default SimilarMovies;

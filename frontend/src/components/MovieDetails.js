import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MoviesContext } from "./MoviesContext";
import styled from "styled-components";
import Review from "./Review";

const client_key = process.env.REACT_APP_KEY;

const MovieDetails = () => {
   const [specificMovie, setSpecificMovie] = useState("");
   const [status, setStatus] = useState("loading");

   const { movie_id } = useParams();

   useEffect(() => {
      const movieDetails = async (e) => {
         const url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${client_key}`;

         try {
            const res = await fetch(url);
            const data = await res.json();
            setSpecificMovie(data);
            setStatus("idle");
            console.log(data);
         } catch (err) {
            console.log(err);
         }
      };
      movieDetails();
   }, []);

   if (status === "loading") {
      return <div>loading</div>;
   }

   // const found = movies.find(({ id }) => id === movie_id);
   console.log(specificMovie);

   return (
      <Container>
         <Wrap>
            <Title>{specificMovie.title}</Title>
            <Year>
               <Release>{specificMovie.release_date}</Release>
               <div style={{ paddingRight: "5px", paddingLeft: "5px" }}>
                  {" "}
                  ∙{" "}
               </div>
               {specificMovie.adult === false ? <div>E</div> : <div>R</div>}
               <div style={{ paddingRight: "5px", paddingLeft: "5px" }}>
                  {" "}
                  ∙{" "}
               </div>
               <div>{specificMovie.runtime}mins</div>
            </Year>
            <Poster
               src={`https://image.tmdb.org/t/p/w500${specificMovie.poster_path}`}
            />
            <Genres>
               {specificMovie.genres.map((items) => {
                  return <Categories>{items.name}</Categories>;
               })}
            </Genres>
            <Desc>{specificMovie.overview}</Desc>
            <ProductionCounty>
               {" "}
               Production Countries:
               {specificMovie.production_countries.map((country) => {
                  return (
                     <div style={{ paddingLeft: "10px" }}>{country.name}</div>
                  );
               })}
            </ProductionCounty>
         </Wrap>
         <Reviews>
            <div>hello</div>
            <Review movie_id={movie_id} />
         </Reviews>
      </Container>
   );
};

const Container = styled.div`
   background-color: black;
   width: 100%;
   /* display: flex; */
`;

const Wrap = styled.div`
   display: flex;
   flex-direction: column;
   background-color: #2b2b2b;
   margin-left: 200px;
   margin-top: 70px;
   padding-left: 40px;
   max-width: fit-content;
   height: fit-content;
`;

const Title = styled.div`
   padding-top: 30px;
   color: white;
   font-size: 50px;
`;

const Year = styled.div`
   display: flex;
   padding-top: 10px;
   color: white;
   opacity: 0.5;
`;

const Release = styled.div``;

const Adult = styled.div``;

const Poster = styled.img`
   padding-top: 10px;
   width: 300px;
   height: 450px;
`;

const Genres = styled.div`
   display: flex;
   gap: 10px;
`;

const Categories = styled.div`
   margin-top: 20px;
   border: 2px solid gray;
   padding: 10px;
   border-radius: 15px;
   color: white;
`;

const Desc = styled.div`
   padding-top: 10px;
   padding-bottom: 10px;
   color: white;
   opacity: 0.8;
   border-bottom: 1px solid gray;
   width: 500px;
`;

const Wrap2 = styled.div`
   display: flex;
`;

const ProductionCounty = styled.div`
   display: flex;
   padding-top: 15px;
   color: white;
   padding-bottom: 15px;
   border-bottom: 1px solid gray;
   width: 500px;
`;
const Reviews = styled.div`
   margin-left: 200px;
   margin-right: 200px;
   color: white;
   background-color: #232324;
`;

export default MovieDetails;

import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { UserContext } from "./UserContext";
import Review from "./Review";
import Rate from "./Rate";
import SimilarMovies from "./SimilarMovies";
import LoadingWrapper from "./LoadingWrapper";
import Trailers from "./Trailers";

const client_key = process.env.REACT_APP_KEY;

const MovieDetails = () => {
   const { user, reFetch } = useContext(UserContext);
   const { movie_id } = useParams();

   let favMovies = user !== null ? user.favorites : null;

   //verifies if movie is already favorited
   const isFound =
      user !== null
         ? favMovies.some((movie) => {
              return movie.movie_id === movie_id;
           })
         : null;

   const [specificMovie, setSpecificMovie] = useState("");
   const [status, setStatus] = useState("loading");
   const [favorited, setFavorited] = useState(isFound);
   const [activeTab, setActiveTab] = useState("trailer");

   //gets information on specific movie using params
   useEffect(() => {
      const movieDetails = async (e) => {
         const url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${client_key}`;

         try {
            const res = await fetch(url);
            const data = await res.json();
            setSpecificMovie(data);
            setStatus("idle");
         } catch (err) {
            console.log(err);
         }
      };
      movieDetails();
   }, [movie_id]);

   //function to add specific movie to specific user document
   const handleClick = (e) => {
      e.preventDefault();
      fetch(`/favorite/${user._id}`, {
         method: "PATCH",
         body: JSON.stringify({
            movie_id: movie_id,
            title: specificMovie.title,
            poster_path: specificMovie.poster_path,
         }),
         headers: {
            "Content-type": "application/json",
         },
      })
         .then((res) => res.json())
         .then((response) => {
            setFavorited(true);
            reFetch();
            console.log(response);
         });
   };

   //funtion to remove favortie from users favortie array
   const handleRemoveFav = async (e) => {
      e.preventDefault();

      fetch(`/deleteFavorite`, {
         method: "PATCH",
         body: JSON.stringify({
            id: user._id,
            movie_id: movie_id,
         }),
         headers: {
            "Content-type": "application/json",
         },
      })
         .then((res) => res.json())
         .then((response) => {
            setFavorited(false);
            reFetch();
            console.log(response);
         });
   };

   if (status === "loading") {
      return <LoadingWrapper />;
   }

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
            <Rate movie_id={movie_id} />
            <Poster
               src={`https://image.tmdb.org/t/p/w500${specificMovie.poster_path}`}
            />
            <Genres>
               {specificMovie.genres.map((items, index) => {
                  return <Categories key={index}>{items.name}</Categories>;
               })}
            </Genres>
            <Desc>{specificMovie.overview}</Desc>
            <ProductionCounty>
               {" "}
               Production Countries:
               {specificMovie.production_countries.map((country, index) => (
                  <div key={index} style={{ paddingLeft: "10px" }}>
                     {country.name}
                  </div>
               ))}
            </ProductionCounty>
            {user !== null ? (
               <ProductionCounty>
                  {user !== null && favorited === false ? (
                     <FavButton onClick={(e) => handleClick(e)}>
                        add to favorites
                     </FavButton>
                  ) : (
                     <FavButton onClick={(e) => handleRemoveFav(e)}>
                        Remove from favorites
                     </FavButton>
                  )}
               </ProductionCounty>
            ) : (
               <ProductionCounty>
                  <FavButton>Sign in to add to favorites</FavButton>
               </ProductionCounty>
            )}
            <Buttons>
               <Tab onClick={() => setActiveTab("reviews")}>Reviews</Tab>
               <Tab onClick={() => setActiveTab("trailer")}>Trailer</Tab>
            </Buttons>
            {activeTab === "reviews" && <Review movie_id={movie_id} />}
            {activeTab === "trailer" && <Trailers movie_id={movie_id} />}
         </Wrap>
         <SimilarMovies movie_id={movie_id} />
      </Container>
   );
};

const Container = styled.div`
   background-color: black;
   width: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
`;

const Wrap = styled.div`
   display: flex;
   flex-direction: column;
   background-color: #2b2b2b;
   margin-top: 70px;
   width: 740px;
   height: fit-content;
   align-items: center;
   border-radius: 20px;
`;

const FavButton = styled.button`
   /* margin-top: 30px; */
   background: gold;
   border: none;
   margin-right: 30px;
   padding: 10px;
   border-radius: 15px;
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
   padding-bottom: 10px;
`;

const Release = styled.div``;

const Poster = styled.img`
   padding-top: 10px;
   width: 300px;
   height: 450px;
   border-radius: 15px;
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

const ProductionCounty = styled.div`
   display: flex;
   padding-top: 15px;
   color: white;
   padding-bottom: 15px;
   border-bottom: 1px solid gray;
   width: 500px;
`;

// const ReviewTitle = styled.div`
//    color: white;
//    background-color: #2b2b2b;
//    width: 700px;
//    padding-top: 30px;
//    padding-bottom: 30px;
//    font-size: 25px;
//    display: flex;
//    justify-content: center;
//    border-bottom: 2px solid black;
// `;

const Tab = styled.button`
   font-size: 20px;
   background: none;
   border: none;
   color: white;
   cursor: pointer;
   border-bottom: 2px solid black;

   &:hover {
      color: gold;
      border-bottom: 2px solid gold;
   }

   &.active {
      color: gold;
   }

   &:focus {
      border: none;
      border-bottom: 2px solid gold;
      color: gold;
   }
`;

const Buttons = styled.div`
   display: flex;
   justify-content: center;
   background-color: #2b2b2b;
   border: none;
   gap: 20px;
   margin-bottom: 30px;
   padding-top: 30px;
`;

export default MovieDetails;

import styled from "styled-components";
import { useEffect, useState } from "react";
import LoadingWrapper from "./LoadingWrapper";

const client_key = process.env.REACT_APP_KEY;

const Trailers = ({ movie_id }) => {
   const [status, setStatus] = useState("loading");
   const [popularMovie, setPopularMovie] = useState("");

   useEffect(() => {
      const trailerDetails = async (e) => {
         const url = `
         https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${client_key}`;

         try {
            const res = await fetch(url);
            const data = await res.json();
            setPopularMovie(data.results[0].key);
            console.log(data.results[0].key);
            setStatus("idle");
         } catch (err) {
            console.log(err);
         }
      };
      trailerDetails();
   }, [movie_id]);

   if (status === "loading") {
      return <LoadingWrapper />;
   }

   return (
      <Iframe
         width="560"
         height="315"
         src={`https://www.youtube.com/embed/${popularMovie}`}
         title="YouTube video player"
         frameborder="0"
         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
         allowfullscreen
      ></Iframe>
   );
};

const Iframe = styled.iframe`
   padding-bottom: 30px;
   border: none;
`;

export default Trailers;

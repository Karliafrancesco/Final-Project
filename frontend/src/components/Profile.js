import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Profile = () => {
   const { user } = useContext(UserContext);
   console.log(user);

   let favMovies = user.favorites;
   console.log(favMovies);

   const handleRemoveFav = async (e, id) => {
      e.preventDefault();

      fetch(`/deleteFavorite`, {
         method: "PATCH",
         body: JSON.stringify({
            id: user._id,
            movie_id: id,
         }),
         headers: {
            "Content-type": "application/json",
         },
      })
         .then((res) => res.json())
         .then((response) => {
            console.log(response);
         });
   };

   return (
      <Container>
         <Name>{user.name}</Name>
         <Wrapper>
            <FavMovieTab>Favorite Movies</FavMovieTab>
            <Wrap>
               {favMovies.map((m) => {
                  return (
                     <WrapFav>
                        <LinkTo to={`/movie/${m.movie_id}`}>
                           <MovieImage
                              src={`https://image.tmdb.org/t/p/w500${m.image}`}
                           />
                           <MovieTitle>{m.title}</MovieTitle>
                        </LinkTo>
                        <RemoveButton
                           onClick={(e) => handleRemoveFav(e, m.movie_id)}
                        >
                           Remove
                        </RemoveButton>
                     </WrapFav>
                  );
               })}
            </Wrap>
         </Wrapper>
      </Container>
   );
};

const Container = styled.div`
   width: 100%;
   background-color: black; ;
`;

const FavMovieTab = styled.div`
   color: white;
   font-size: 20px;
   padding-bottom: 10px;
   border-bottom: 1px solid gray;
`;

const Wrap = styled.div`
   display: flex;
   flex-wrap: wrap;
`;

const Wrapper = styled.div`
   margin-left: 100px;
   margin-top: 50px;
   background: #2b2b2b;
   margin-right: 100px;
   padding: 20px;
   display: flex;
   flex-direction: column;
`;

const WrapFav = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   padding: 20px 20px;
   flex-wrap: wrap;
   max-width: 200px;
`;

const RemoveButton = styled.button`
   border: none;
   color: black;
   background: none;
   text-decoration: underline;
   cursor: pointer;
`;

const Name = styled.div`
   color: white;
   font-size: 25px;
   margin-left: 100px;
   margin-top: 50px;
`;

const MovieTitle = styled.div`
   display: flex;
   color: white;
   padding-bottom: 10px;
   justify-content: center;
`;

const MovieImage = styled.img`
   height: 300px;
   width: 200px;
   padding-bottom: 5px;
`;

const LinkTo = styled(Link)`
   text-decoration: none;
`;

export default Profile;

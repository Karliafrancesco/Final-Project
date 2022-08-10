import { useContext } from "react";
import { UserContext } from "./UserContext";
import styled from "styled-components";

const Profile = () => {
   const { user } = useContext(UserContext);
   console.log(user);

   let favMovies = user.favorites;

   return (
      <Container>
         <Name>{user.name}</Name>
         <Wrapper>
            <FavMovieTab>Favorite Movies</FavMovieTab>
            <Wrap>
               {favMovies.map((m) => {
                  return (
                     <WrapFav>
                        <MovieImage
                           src={`https://image.tmdb.org/t/p/w500${m.image}`}
                        />
                        <MovieTitle>{m.title}</MovieTitle>
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

const Name = styled.div`
   color: white;
   font-size: 25px;
   margin-left: 100px;
   margin-top: 50px;
`;

const MovieTitle = styled.div`
   color: white;
`;

const MovieImage = styled.img`
   height: 300px;
   width: 200px;
   padding-bottom: 5px;
`;

export default Profile;
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "./UserContext";
import styled from "styled-components";

const OtherProfiles = () => {
   const { user } = useContext(UserContext);
   const [profile, setProfile] = useState("");
   const [status, setStatus] = useState("loading");

   let favMovies = profile.favorites;

   const { id } = useParams();

   let followers = user !== null ? user.followers : null;

   const isFound =
      user !== null
         ? followers.some((follower) => {
              return follower.id === id;
           })
         : null;

   const [favorited, setFavorited] = useState(isFound);

   //fetch to get info on specific user from profile
   useEffect(() => {
      fetch(`/user/${id}`)
         .then((res) => res.json())
         .then((data) => {
            setProfile(data.data);
            console.log(data.data);
            setStatus("idle");
         })
         .catch((err) => {
            setStatus("error");
         });
   }, []);

   // function to add follower to specific user document
   const handleFollow = (e) => {
      e.preventDefault();
      fetch(`/follow/${id}`, {
         method: "PATCH",
         body: JSON.stringify({
            username: user.username,
            _id: user._id,
            profile: profile.username,
            author: profile._id,
         }),
         headers: {
            "Content-type": "application/json",
         },
      })
         .then((res) => res.json())
         .then((response) => {
            setFavorited(true);
            console.log(response);
         });
   };

   if (status === "loading") {
      return <div>loading</div>;
   }

   return (
      <Container>
         <FollowAndName>
            <Name>{profile.name}</Name>
            {user !== null && favorited === false ? (
               <FollowButton onClick={(e) => handleFollow(e)}>
                  Follow
               </FollowButton>
            ) : (
               <div>remove</div>
            )}
         </FollowAndName>
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

const FollowAndName = styled.div`
   display: flex;
   align-items: center;
   margin-top: 50px;
   gap: 20px;
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
`;

const MovieTitle = styled.div`
   color: white;
`;

const MovieImage = styled.img`
   height: 300px;
   width: 200px;
   padding-bottom: 5px;
`;

const FollowButton = styled.button`
   border: none;
   font-weight: bold;
   background-color: gold;
   color: black;
   padding: 10px;
   border-radius: 10px;
`;

export default OtherProfiles;

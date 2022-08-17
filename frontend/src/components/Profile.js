import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Profile = () => {
   const { user, reFetch } = useContext(UserContext);

   const [activeTab, setActiveTab] = useState("favorites");

   let favMovies = user.favorites;
   let followers = user.followers;
   let following = user.following;

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
            reFetch();
         });
   };

   return (
      <Container>
         <Name>{user.username}</Name>
         <FollowNumbers>
            <div
               onClick={() => setActiveTab("followers")}
               style={{ display: "flex", cursor: "pointer" }}
            >
               <strong>{followers.length}</strong>
               <div style={{ paddingLeft: "5px", opacity: "0.5" }}>
                  Followers
               </div>
            </div>
            <div
               onClick={() => setActiveTab("following")}
               style={{ display: "flex", cursor: "pointer" }}
            >
               <strong>{following.length}</strong>
               <div style={{ paddingLeft: "5px", opacity: "0.5" }}>
                  Following
               </div>
            </div>
         </FollowNumbers>
         <Wrapper>
            <Buttons>
               <Tab autoFocus onClick={() => setActiveTab("favorites")}>
                  Favorite Movies
               </Tab>
               <Tab onClick={() => setActiveTab("followers")}>Followers</Tab>
               <Tab onClick={() => setActiveTab("following")}>Following</Tab>
            </Buttons>

            {activeTab === "favorites" && (
               <div>
                  {favMovies.length > 0 ? (
                     <Wrap>
                        {favMovies.map((m) => (
                           <WrapFav key={m.movie_id}>
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
                        ))}
                     </Wrap>
                  ) : (
                     <None>No Favorites</None>
                  )}
               </div>
            )}
            {activeTab === "followers" && (
               <div>
                  {followers.length > 0 ? (
                     <WrapNames>
                        {followers.map((follower) => (
                           <LinkTo
                              key={follower.id}
                              to={`/other/profile/${follower.id}`}
                           >
                              <FollowerUsername>
                                 {follower.username}
                              </FollowerUsername>
                           </LinkTo>
                        ))}
                     </WrapNames>
                  ) : (
                     <None>No Followers</None>
                  )}
               </div>
            )}
            {activeTab === "following" && (
               <div>
                  {following.length > 0 ? (
                     <WrapNames>
                        {following.map((follow) => (
                           <LinkTo
                              key={follow.id}
                              to={`/other/profile/${follow.id}`}
                           >
                              <FollowerUsername>
                                 {follow.username}
                              </FollowerUsername>
                           </LinkTo>
                        ))}
                     </WrapNames>
                  ) : (
                     <None>None</None>
                  )}
               </div>
            )}
         </Wrapper>
      </Container>
   );
};

const Container = styled.div`
   width: 100%;
   height: 1000px;
   background-color: black; ;
`;

const FollowNumbers = styled.div`
   display: flex;
   color: white;
   margin-left: 100px;
   margin-top: 15px;
   gap: 15px;
`;

const Tab = styled.button`
   font-size: 20px;
   background: none;
   border: none;
   color: white;
   cursor: pointer;

   &:hover {
      color: gold;
      border-bottom: 1px solid gold;
   }

   &.active {
      color: gold;
   }

   &:focus {
      border: none;
      border-bottom: 1px solid gold;
      color: gold;
   }
`;

const None = styled.div`
   display: flex;
   justify-content: center;
   font-size: large;
   color: white;
   text-decoration: underline;
   opacity: 0.5;
`;

const Wrap = styled.div`
   display: flex;
   flex-wrap: wrap;
   justify-content: center;
`;

const Wrapper = styled.div`
   margin-left: 100px;
   margin-top: 30px;
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
   flex-wrap: wrap;
   max-width: 200px;
   padding: 5px 15px 30px 15px;
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
   margin-top: 30px;
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

const Buttons = styled.div`
   display: flex;
   justify-content: center;
   background-color: #2b2b2b;
   border: none;
   gap: 20px;
   margin-bottom: 30px;
   margin-top: 10px;
`;

const FollowerUsername = styled.div`
   color: white;
   display: flex;
   justify-content: center;
   padding-bottom: 10px;

   &:hover {
      color: gold;
   }
`;

const WrapNames = styled.div`
   display: flex;
   flex-direction: column;
`;

export default Profile;

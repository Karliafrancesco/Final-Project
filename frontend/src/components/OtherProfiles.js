import { useEffect, useState, useContext } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import styled from "styled-components";

import { UserContext } from "./UserContext";
import LoadingWrapper from "./LoadingWrapper";

const OtherProfiles = () => {
   const { user } = useContext(UserContext);
   const [profile, setProfile] = useState("");
   const [status, setStatus] = useState("loading");
   const [activeTab, setActiveTab] = useState("favorites");

   const favMovies = profile.favorites;
   const followers = profile.followers;
   const following = profile.following;

   const { id } = useParams();

   const userFollowers = user !== null ? user.following : null;

   //verifies if movie is already favorited
   const isFound =
      user !== null
         ? userFollowers.some((follower) => {
              return follower.id === id;
           })
         : null;

   const [favorited, setFavorited] = useState(isFound);

   const reload = () => {
      fetch(`/user/${id}`)
         .then((res) => res.json())
         .then((data) => {
            setProfile(data.data);
            setStatus("idle");
         })
         .catch((err) => {
            setStatus("error");
         });
   };

   //fetch to get info on specific user from profile
   useEffect(() => {
      reload();
   }, [id]);

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
            reload();
         });
   };

   const handleUnfollow = (e) => {
      e.preventDefault();
      fetch("/unfollow", {
         method: "PATCH",
         body: JSON.stringify({
            id: user._id,
            otherId: profile._id,
         }),
         headers: {
            "Content-type": "application/json",
         },
      })
         .then((res) => res.json())
         .then((response) => {
            setFavorited(false);
            reload();
         });
   };

   if (status === "loading") {
      return <LoadingWrapper />;
   }

   if (user && user._id === profile._id) {
      return <Navigate to={`/profile/${user._id}`} />;
   }

   return (
      <Container>
         <>
            <FollowAndName>
               <Name>{profile.username}</Name>
               {user && (
                  <>
                     {favorited === false ? (
                        <FollowButton onClick={(e) => handleFollow(e)}>
                           Follow
                        </FollowButton>
                     ) : (
                        <FollowButton onClick={(e) => handleUnfollow(e)}>
                           Unfollow
                        </FollowButton>
                     )}
                  </>
               )}
            </FollowAndName>
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
         </>

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
                        {favMovies.map((m) => {
                           return (
                              <WrapFav key={m.movie_id}>
                                 <LinkTo to={`/movie/${m.movie_id}`}>
                                    <MovieImage
                                       src={`https://image.tmdb.org/t/p/w500${m.image}`}
                                    />
                                    <MovieTitle>{m.title}</MovieTitle>
                                 </LinkTo>
                              </WrapFav>
                           );
                        })}
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
                        {followers.map((follower) => {
                           return (
                              <LinkTo
                                 key={follower.id}
                                 to={`/other/profile/${follower.id}`}
                              >
                                 <FollowerUsername>
                                    {follower.username}
                                 </FollowerUsername>
                              </LinkTo>
                           );
                        })}
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
                        {following.map((follow) => {
                           return (
                              <LinkTo
                                 key={follow.id}
                                 to={`/other/profile/${follow.id}`}
                              >
                                 <FollowerUsername>
                                    {follow.username}
                                 </FollowerUsername>
                              </LinkTo>
                           );
                        })}
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

const FollowAndName = styled.div`
   display: flex;
   align-items: center;
   margin-top: 50px;
   gap: 20px;
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

const Buttons = styled.div`
   display: flex;
   justify-content: center;
   background-color: #2b2b2b;
   border: none;
   gap: 20px;
   margin-bottom: 30px;
   margin-top: 10px;
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
   padding: 5px 15px 30px 15px;
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
   display: flex;
   justify-content: center;
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

const LinkTo = styled(Link)`
   text-decoration: none;
`;

const FollowerUsername = styled.div`
   color: white;
   display: flex;
   justify-content: center;
   padding-bottom: 10px;
`;

const None = styled.div`
   display: flex;
   justify-content: center;
   font-size: large;
   color: white;
   text-decoration: underline;
   opacity: 0.5;
`;

const WrapNames = styled.div`
   display: flex;
   flex-direction: column;
`;

export default OtherProfiles;

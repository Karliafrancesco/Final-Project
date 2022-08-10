import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Review = ({ movie_id }) => {
   const [review, setReview] = useState("");
   const { user } = useContext(UserContext);
   const [reviewRes, setReviewRes] = useState(null);
   const [status, setStatus] = useState("loading");

   const handleClick = (e) => {
      e.preventDefault();

      fetch("/review", {
         method: "POST",
         body: JSON.stringify({
            id: user._id,
            author: user.username,
            movie_id: movie_id,
            review: review,
         }),
         headers: {
            "Content-type": "application/json",
         },
      })
         .then((res) => res.json())
         .then((response) => {
            setReview("");
            console.log(response);
         });
   };

   useEffect(() => {
      fetch(`/reviews/${movie_id}`)
         .then((res) => res.json())
         .then((data) => {
            setReviewRes(data.data);
            console.log(data.data);
            setStatus("idle");
         })
         .catch((err) => {
            setStatus("error");
         });
   }, [review]);

   if (status === "loading") {
      return <div>loading</div>;
   }

   return (
      <Container>
         {user === null ? (
            <div>Sign in to post a review</div>
         ) : (
            <form onSubmit={(e) => handleClick(e)}>
               <TextArea
                  type="text"
                  placeholder="Write a Review"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  maxLength="500"
               ></TextArea>
               <ButtonAndCounter>
                  <ButtonSubmit type="submit">Post</ButtonSubmit>
               </ButtonAndCounter>
            </form>
         )}
         <Reviews>
            {reviewRes.map((r) => {
               return (
                  <WrapReview>
                     <LinkTo to={`/other/profile/${r.authorId}`}>
                        <Name>{r.author}</Name>
                     </LinkTo>
                     <Rev>{r.review}</Rev>
                  </WrapReview>
               );
            })}
         </Reviews>
      </Container>
   );
};

const Container = styled.div`
   width: 740px;
   margin-left: 200px;
   background-color: white;
`;

const ButtonAndCounter = styled.div`
   display: flex;
   justify-content: flex-end;
   gap: 20px;
   align-items: center;
`;

const TextArea = styled.textarea`
   border: none;
   width: 650px;
   height: 150px;
   font-size: 18px;
   margin-top: 8px;
   resize: none;
   outline: none;
   padding-left: 20px;
`;

const ButtonSubmit = styled.button`
   font-weight: bold;
   border-radius: 25px;
   padding: 10px 15px;
   border: none;
   color: black;
   background-color: gold;
   margin-right: 10px;
   margin-bottom: 10px;
`;

const Reviews = styled.div`
   background-color: #e3e3e3;
   padding-top: 10px;
   /* padding-bottom: 20px; */
`;

const WrapReview = styled.div`
   padding-left: 40px;
   border-bottom: 1px solid white;
   margin-top: 20px;
`;

const Name = styled.div`
   font-size: 20px;
   padding-top: 10px;
   font-weight: bold;
   padding-bottom: 15px;
`;

const Rev = styled.div`
   padding-left: 10px;
   padding-bottom: 15px;
`;

const LinkTo = styled(Link)`
   text-decoration: none;
   color: black;
`;

export default Review;

import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LoadingWrapper from "./LoadingWrapper";
import moment from "moment";

const Review = ({ movie_id }) => {
   const [review, setReview] = useState("");
   const { user } = useContext(UserContext);
   const [reviewRes, setReviewRes] = useState(null);
   const [status, setStatus] = useState("loading");

   const handleClick = (e) => {
      e.preventDefault();

      let date = moment();
      let formattedDate = date.format("MMMM Do YYYY, h:mm a");

      fetch("/review", {
         method: "POST",
         body: JSON.stringify({
            id: user._id,
            author: user.username,
            movie_id: movie_id,
            review: review,
            date: formattedDate,
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
      return <LoadingWrapper />;
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
                  maxLength="700"
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
                     <NameAndDate>
                        <LinkTo to={`/other/profile/${r.authorId}`}>
                           <Name>{r.author}</Name>
                        </LinkTo>
                        <div>·</div>
                        <Date>{r.date}</Date>
                     </NameAndDate>
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
   /* margin-left: 200px; */
   background-color: white;
`;

const ButtonAndCounter = styled.div`
   display: flex;
   justify-content: flex-end;
   gap: 20px;
   align-items: center;
   border-bottom: 1px solid black;
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
`;

const WrapReview = styled.div`
   padding-left: 40px;
   border-bottom: 1px solid black;
   margin-top: 20px;
`;

const NameAndDate = styled.div`
   display: flex;
   align-items: center;
   padding-bottom: 15px;
   gap: 15px;
`;

const Name = styled.div`
   font-size: 20px;
   font-weight: bold;
`;

const Date = styled.div`
   font-size: 11px;
`;

const Rev = styled.div`
   padding-left: 10px;
   padding-bottom: 15px;
   padding-right: 20px;
   font-size: 15px;
`;

const LinkTo = styled(Link)`
   text-decoration: none;
   color: black;
`;

export default Review;

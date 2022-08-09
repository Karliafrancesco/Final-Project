import { useContext, useState } from "react";
import { UserContext } from "./UserContext";

const Review = ({ movie_id }) => {
   const [review, setReview] = useState("");
   const { user } = useContext(UserContext);

   const handleClick = (e) => {
      e.preventDefault();

      fetch("/review", {
         method: "POST",
         body: JSON.stringify({
            author: user._id,
            review: review,
            movie_id: movie_id,
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
      <>
         <form onSubmit={(e) => handleClick(e)}>
            <textarea
               placeholder="write review"
               onChange={(e) => setReview(e.target.value)}
            ></textarea>
            <button type="submit">submit</button>
         </form>
      </>
   );
};

export default Review;

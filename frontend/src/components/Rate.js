import { useState, useContext, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import styled from "styled-components";
import { UserContext } from "./UserContext";

const Rate = ({ movie_id }) => {
   const { user } = useContext(UserContext);

   const [rate, setRate] = useState(0);
   const [ratings, setRatings] = useState("");
   const [status, setStatus] = useState("loading");

   const handleRate = (e) => {
      e.preventDefault();

      fetch("/rate", {
         method: "POST",
         body: JSON.stringify({
            movie_id: movie_id,
            id: user._id,
            rating: rate,
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

   let sum = 0;

   for (let index = 0; index < ratings.length; index++) {
      sum += ratings[index].rating / ratings.length;
   }

   sum = sum.toFixed(2);
   console.log(sum);

   useEffect(() => {
      fetch(`/rate/${movie_id}`)
         .then((res) => res.json())
         .then((data) => {
            setRatings(data.data);
            console.log(data.data);
            setStatus("idle");
         })
         .catch((err) => {
            setStatus("error");
         });
   }, [sum]);

   if (status === "loading") {
      return <div>loading</div>;
   }

   return (
      <Contain>
         {[...Array(5)].map((item, index) => {
            const givenRating = index + 1;
            return (
               <label>
                  <Radio
                     type="radio"
                     value={givenRating}
                     onClick={(e) => {
                        setRate(givenRating);
                        handleRate(e);
                        alert(
                           `Are you sure you want to give ${givenRating} stars ?`
                        );
                     }}
                  />
                  <Rating>
                     <FaStar
                        color={
                           givenRating < rate || givenRating === rate
                              ? "gold"
                              : "gray"
                        }
                     />
                  </Rating>
               </label>
            );
         })}
         <AvgRating style={{ color: "white" }}>{sum} star rating</AvgRating>
      </Contain>
   );
};

const Contain = styled.div`
   display: flex;
   align-items: center;
   font-size: 20px;
`;
const Radio = styled.input`
   display: none;
`;
const Rating = styled.div`
   cursor: pointer;
`;

const AvgRating = styled.div`
   padding-left: 10px;
`;

export default Rate;

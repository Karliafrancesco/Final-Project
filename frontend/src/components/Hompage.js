import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const Homepage = () => {
   const [endPoint, setEndPoint] = useState("");
   //initial state is an empty array to make it possible to map
   const [container, setContainer] = useState([]);

   const [finalPoint, setFinalPoint] = useState("");
   //change endpoint to what is being typed in search bar.
   const onChangeHandler = (e) => {
      setEndPoint(e.target.value);
   };

   const submitHandler = (e) => {
      e.preventDefault();
      setFinalPoint(endPoint);
   };

   const options = {
      method: "GET",
      headers: {
         "X-RapidAPI-Key": "7d49252d65mshf21e09f745edc1fp1e6f53jsn7ec53551e0ac",
         "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
      },
   };

   //endPoint dependency to fire useEffect on search bar change
   useEffect(() => {
      fetchMe();
   }, [finalPoint]);
   const fetchMe = () => {
      fetch(
         `https://online-movie-database.p.rapidapi.com/auto-complete?q=+${endPoint}`,
         options
      )
         .then((response) => {
            return response.json();
         })
         //
         .then((data) => {
            setContainer(data.d);
         })
         .catch((err) => {
            console.log(err.stack);
         });
   };

   return (
      <Container>
         <SearchForm onSubmit={submitHandler}>
            <SearchInput
               placeholder="Search for movie"
               type="text"
               value={endPoint}
               onChange={onChangeHandler}
            />
            <SearchButton type="submit">Search</SearchButton>
         </SearchForm>

         <Wrap>
            {container?.map((item, index) => {
               return (
                  <Link key={index} to={`/movie/${item.id}`}>
                     <Wrapper>
                        {item.i === undefined ? (
                           <ImageNotAvailable>
                              image not available
                           </ImageNotAvailable>
                        ) : (
                           <Img src={item.i.imageUrl} />
                        )}
                        <Title>{item.l}</Title>
                     </Wrapper>
                  </Link>
               );
            })}
         </Wrap>
      </Container>
   );
};

const Wrap = styled.div`
   display: flex;
   flex-wrap: wrap;
   margin-right: 75px;
   margin-left: 75px;
`;

const Wrapper = styled.div`
   display: flex;
   flex-direction: column;
   /* justify-content: center; */
   align-items: center;
   gap: 15px;
   padding-bottom: 10px;
   width: 250px;
   height: 450px;
   margin-bottom: 20px;
   margin-right: 80px;
   margin-top: 20px;
   position: relative;
   /* border: 1px solid red; */
`;

const Container = styled.div`
   width: 100%;
   height: 100%;
   background: black;
`;

const SearchForm = styled.form`
   display: flex;
   align-items: center;
   justify-content: center;
   margin-top: 75px;
   margin-bottom: 75px;
   gap: 20px;
`;

const SearchInput = styled.input`
   width: 300px;
   height: 25px;
   border-radius: 3px;
`;

const SearchButton = styled.button`
   cursor: pointer;
   border: none;
   height: 25px;
   width: 50px;
   text-align: center;
   background-color: gold;
   border-radius: 3px;
`;

const Img = styled.img`
   height: 350px;
   width: 250px;
   box-shadow: 1px 1px 4px #888888;
`;

const ImageNotAvailable = styled.div`
   text-align: center;
   height: 350px;
   width: 250px;
   color: white;
   box-shadow: 1px 1px 4px #888888;
`;

const Title = styled.div`
   color: white;
`;

const LinkTo = styled(Link)``;

export default Homepage;

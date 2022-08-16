import styled, { keyframes } from "styled-components";
import { FiLoader } from "react-icons/fi";

const LoadingWrapper = () => {
   return (
      <LoaderWrapper>
         <Icon>
            <FiLoader style={{ height: "30px", width: "30px" }} />
         </Icon>
      </LoaderWrapper>
   );
};

const LoaderWrapper = styled.div`
   height: 500px;
`;

const turning = keyframes`
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    `;

const Icon = styled.div`
   position: absolute;
   width: 30px;
   height: 30px;
   top: 49%;
   left: 49%;
   animation: ${turning} 1000ms infinite linear;
`;

export default LoadingWrapper;

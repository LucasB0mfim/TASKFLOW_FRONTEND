import styled from "styled-components";
import { breakpoints } from "../../styles";

export const CopyRight = styled.p`
  height: 1.5vw;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #b6c2cf;
  font-size: 0.8vw;
  text-align: center;

  @media(max-width: ${breakpoints.tablet}) {
    font-size: 1.4vh;
  }

  @media(max-width: ${breakpoints.mobile}) {
    height: 1.5vh;
    font-size: 1.5vh;
  }
`

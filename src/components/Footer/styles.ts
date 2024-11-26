import styled from "styled-components";
import { breakpoints } from "../../styles";

export const CopyRight = styled.p`
  margin-bottom: 0.5vw;

  color: #b6c2cf;
  font-size: 0.8vw;
  text-align: center;

  @media(max-width: ${breakpoints.mobile}) {
    font-size: 1.5vh;
    margin-bottom: 0.5vh;
  }
`

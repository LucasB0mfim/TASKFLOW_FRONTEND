import styled from "styled-components";
import { breakpoints, colors } from "../../styles";

export const CopyRight = styled.p`
  height: 1.5vw;

  display: flex;
  align-items: center;
  justify-content: center;

  color: ${colors.lightGray};
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

import styled from "styled-components";
import { breakpoints } from "../../styles";

export const Container = styled.p`
  position: fixed;
  bottom: 0;
  right: 0;

  width: 78%;
  margin-bottom: 0.5vw;

  color: #b6c2cf;
  font-size: 0.8vw;

  @media(max-width: ${breakpoints.tablet}) {
    width: 70%;
  }

  @media(max-width: ${breakpoints.mobile}) {
    left: 0;

    width: 100%;

    font-size: 1.5vh;
    text-align: center;
    margin-bottom: 0.5vh;
  }
`

export const CopyRight = styled.p`
  text-align: center;
  color: #b6c2cf;
  font-size: 0.8vw;

  @media(max-width: ${breakpoints.mobile}) {
    left: 22%;
    text-align: center;
    font-size: 1.5vh;
  }
`

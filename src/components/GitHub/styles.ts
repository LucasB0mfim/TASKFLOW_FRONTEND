import styled from "styled-components";

import { breakpoints } from "../../styles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  a {
    height: 3vw;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 0.9vw;
    text-decoration: none;
    color: rgba(255, 255, 255, 0.8);

    border: none;
    border-radius: 0.2vw;
    background: rgb(59, 64, 68, 0.5);

    &:hover {
      transition: all 0.5s ease;
      background: rgb(59, 64, 68, 0.2);
    }
  }

  img {
    height: 2.1vw;
    margin-right: 2%;
  }

  @media(max-width: ${breakpoints.mobile}) {
    display: none;
  }
`

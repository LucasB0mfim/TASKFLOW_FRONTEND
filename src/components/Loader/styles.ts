import styled from "styled-components";
import { breakpoints } from "../../styles";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media(max-width: ${breakpoints.mobile}) {
    margin-top: 5%;
  }
`

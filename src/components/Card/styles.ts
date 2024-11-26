import styled from "styled-components";

import { breakpoints } from "../../styles";

export const CardContainer = styled.div`
  width: 22vw;
  height: auto;
  padding: 1.2vw;

  display: flex;
  flex-direction: column;

  border-radius: 0.5vw;

  background: rgb(16, 18, 4, 0.9);
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.3);


  @media(max-width: ${breakpoints.mobile}) {
    width: 100%;
    padding: 3% 2%;
    border-radius: 0.5vh;
  }
`

export const Header = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  @media(max-width: ${breakpoints.mobile}) {
    padding: 0% 2%;
  }
`

export const TaskTitle = styled.h2`
  width: 50%;
  margin-left: 1%;

  color: #b6c2cf;
  font-size: 1vw;

  @media(max-width: ${breakpoints.mobile}) {
    width: 50%;
    font-size: 2vh;
  }
`

export const OrderControls = styled.div`
  width: 15%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    height: 1vw;
    cursor: pointer;
  }

  @media(max-width: ${breakpoints.mobile}) {
    width: 15%;

    img {
      height: 2vh;
  }
`

export const ActionButtons = styled.div`
  width: 15%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    height: 1.2vw;
    cursor: pointer;
  }

  @media(max-width: ${breakpoints.mobile}) {
    width: 15%;

    img {
      height: 2vh;
  }
`

export const Body = styled.div`
  width: 100%;
  margin: 3% 0%;

  display: flex;
  align-items: center;

  @media(max-width: ${breakpoints.mobile}) {
    margin: 0;
    padding: 2%;
  }
`

export const CostContainer = styled.div`
  width: 100%;
  padding: 4%;

  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;

  border-radius: 0.5vw;
  background: #22272b;

  @media(max-width: ${breakpoints.mobile}) {
    border-radius: 0.5vh;
  }
`

export const CostText = styled.span`
  width: 100%;
  height: auto;

  color: #b6c2cf;
  font-size: 1vw;
  text-align: start;
  word-wrap: break-word;

  @media(max-width: ${breakpoints.mobile}) {
    font-size: 1.9vh;
  }
`

export const Footer = styled.div`
  widht: 100%;
  height: auto;

  display: flex;
  align-items: end;
  justify-content: space-between;

  @media(max-width: ${breakpoints.mobile}) {
    padding: 0% 2%;
  }
`

export const CostTag = styled.div`
  width: 3vw;
  height: 1vw;
  margin-left: 1%;
  border-radius: 50px;

  @media(max-width: ${breakpoints.mobile}) {
    width: 5vh;
    height: 1.8vh;
  }
`

export const DueDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;

  color: #b6c2cf;
  font-size: 1vw;

  img {
    height: 1vw;
    margin-right: 5%;
  }

  @media(max-width: ${breakpoints.mobile}) {
    font-size: 2vh;

    img {
      width: 4vw;
      height: 1.8vh;
    }
  }
`

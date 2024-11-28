import styled from "styled-components";

import { breakpoints, colors } from "../../styles";

export const CardContainer = styled.div`
  width: 22vw;
  height: auto;
  padding: 1.2vw;

  display: flex;
  flex-direction: column;

  border-radius: 0.6vw;

  background: rgb(16, 18, 4, 0.8);
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.3);

  img {
    height: 1.2vw;
    cursor: pointer;
  }

  @media(max-width: ${breakpoints.tablet}) {
    width: 30vw;
  }

  @media(max-width: ${breakpoints.mobile}) {
    width: 100%;
    padding: 3% 2%;
    border-radius: 0.8vh;
  }
`

export const Header = styled.div`
  width: 100%;
  height: 2.3vh;

  display: flex;
  align-items: center;
  justify-content: space-between;

  @media(max-width: ${breakpoints.mobile}) {
    padding: 0% 2%;
  }
`

export const TaskTitle = styled.h2`
  width: 40%;
  margin-left: 1%;

  color: ${colors.lightGray};
  font-size: 1vw;

  @media(max-width: ${breakpoints.tablet}) {
    width: 35%;
    font-size: 1.3vw;
  }

  @media(max-width: ${breakpoints.mobile}) {
    font-size: 2vh;
  }
`

export const CheckTask = styled.div`
  width: 10%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    height: 100%;
    cursor: pointer;
  }
`

export const OrderControls = styled.div`
  width: 15%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    height: 90%;
    cursor: pointer;
  }

  @media(max-width: ${breakpoints.tablet}) {
    height: 80%;
  }
`

export const ActionButtons = styled.div`
  width: 18%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    height: 100%;
    cursor: pointer;
  }

  @media(max-width: ${breakpoints.tablet}) {
    height: 90%;
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
  background: ${colors.darkGray};

  @media(max-width: ${breakpoints.mobile}) {
    border-radius: 0.5vh;
  }
`

export const CostText = styled.span`
  width: 100%;
  height: auto;

  color: ${colors.lightGray};
  font-size: 1vw;
  text-align: start;
  word-wrap: break-word;

  @media(max-width: ${breakpoints.mobile}) {
    font-size: 1.9vh;
  }
`

export const Footer = styled.div`
  widht: 100%;
  height: 2.3vh;

  display: flex;
  align-items: end;
  justify-content: space-between;

  @media(max-width: ${breakpoints.mobile}) {
    padding: 0% 2%;
  }
`

export const CostTag = styled.div`
  width: 3vw;
  height: 100%;
  margin-left: 1%;
  border-radius: 50px;

  @media(max-width: ${breakpoints.tablet}) {
    width: 4vw;
    height: 80%;
  }

  @media(max-width: ${breakpoints.mobile}) {
    width: 5vh;
    height: 1.8vh;
  }
`

export const DueDate = styled.div`
  width: 50%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: end;

  color: ${colors.lightGray};
  font-size: 1vw;

  img {
    height: 100%;
  }

  span {
    margin-left: 5%;
  }

  @media(max-width: ${breakpoints.tablet}) {
    font-size: 1.3vw;

    img {
      height: 80%;
    }
  }

  @media(max-width: ${breakpoints.mobile}) {
    font-size: 2vh;

    img {
      width: 4vw;
      height: 1.8vh;
    }
  }
`

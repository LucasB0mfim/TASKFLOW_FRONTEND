import styled from "styled-components";

type Props = {
  isExpensive: string;
}

export const CardContainer = styled.div`
  width: 100%;
  height: auto;
  padding: 4%;

  display: flex;
  flex-direction: column;

  border-radius: 0.5vw;

  background: rgb(16, 18, 4, 0.9);
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.3);

  @media(max-width: 500px) {
    padding: 2%;
  }
`

export const Header = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  @media(max-width: 500px) {
    padding: 0% 2%;
  }
`

export const TaskTitle = styled.h2`
  width: 60%;
  margin-left: 1%;

  color: #b6c2cf;
  font-size: 1vw;

  @media(max-width: 500px) {
    width: 50%;
    font-size: 2vh;
  }
`

export const OrderControls = styled.div`
  width: 12%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    height: 1vw;
    cursor: pointer;
  }

  @media(max-width: 500px) {
    width: 15%;

    img {
      height: 2vh;
  }
`

export const ActionButtons = styled.div`
  width: 12%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    height: 1.2vw;
    cursor: pointer;
  }

  @media(max-width: 500px) {
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

  @media(max-width: 500px) {
    margin: 0;
    padding: 2%;
  }
`

export const CostContainer = styled.div`
  width: 100%;
  padding: 2% 2% 2% 1%;

  display: flex;
  align-items: center;

  border-radius: 0.5vw;
  background: #22272b;

  @media(max-width: 500px) {
    height: 5vh;
  }
`

export const CostText = styled.span`
  height: auto;

  color: #b6c2cf;
  font-size: 1vw;
  text-align: start;
  word-wrap: break-word;

  @media(max-width: 500px) {
    font-size: 2vh;
  }
`

export const Footer = styled.div`
  widht: 100%;
  height: auto;

  display: flex;
  align-items: end;
  justify-content: space-between;

  @media(max-width: 500px) {
    padding: 0% 2%;
  }
`

export const CostTag = styled.div<Props>`
  width: 3vw;
  height: 1vw;
  margin-left: 1%;

  border-radius: 50px;
  background: ${(props) => props.isExpensive >= '1000' ? 'yellow' : 'white'};

  @media(max-width: 500px) {
    width: 3vh;
    height: 1vh;
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

  @media(max-width: 500px) {

    font-size: 2.5vw;

    img {
      height: 2.5vw;
    }
  }
`

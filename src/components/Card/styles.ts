import styled from "styled-components";

type Props = {
  isExpensive: string;
}

export const CardContainer = styled.div`
  padding: 2% 0 2% 2%;
  margin-bottom: 1%;

  display: flex;
  flex-direction: column;

  border-radius: 0.5vw;

  background: #101204;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.3);
`

export const Header = styled.div`
  width: 100%;
  padding: 0% 2% 0% 1%;
  margin-bottom: 2%;

  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const TaskTitle = styled.h2`
  width: 92%;

  color: #b6c2cf;
  font-size: 1vw;
`

export const ActionButtons = styled.div`
  width: 8%;
  margin-right: 4%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    height: 1.2vw;
    cursor: pointer;
  }
`

export const Body = styled.div`
  width: 100%;
  display: flex;
`

export const CostContainer = styled.div`
  padding: 2% 2% 2% 1%;
  width: 95%;
  border-radius: 0.5vw;

  background: #22272b;
`

export const CostText = styled.span`
  color: #b6c2cf;
  font-size: 1vw;
  text-align: start;
  word-wrap: break-word;

  height: auto;
`

export const OrderControls = styled.div`
  width: 5%;
  padding: 1%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  img {
    height: 1vw;
    cursor: pointer;
  }
`

export const Footer = styled.div`
  widht: 100%;
  height: 100%;

  display: flex;
  align-items: end;
  justify-content: space-between;
`

export const CostTag = styled.div<Props>`
  width: 3vw;
  height: 1vw;
  margin-left: 1%;

  border-radius: 50px;

  background: ${(props) => props.isExpensive >= '1000' ? 'yellow' : 'white'};
`

export const DueDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  padding: 2% 5.8% 0 0%;

  color: #b6c2cf;
  font-size: 1vw;

  img {
    height: 1vw;
    margin-right: 5%;
  }
`





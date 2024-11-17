import styled from "styled-components";

type Props = {
  isExpensive: String;
}

export const Container = styled.div<Props>`
  padding: 2%;
  margin-bottom: 1%;

  display: flex;
  flex-direction: column;

  border-top-left-radius: 0.5vw;
  border-top-right-radius: 0.5vw;
  border-bottom-right-radius: 0.5vw;

  background: ${(props) => props.isExpensive >= '1000' ? 'linear-gradient(145deg, rgba(255, 251, 204, 1) 0%, rgba(255, 243, 128, 1) 60%)' : '#352740'};
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.3);
`

export const Tag = styled.div<Props>`
  color: ${(props) => props.isExpensive >= '1000' ? '#000' : '#fff'};
`

export const TagContainer = styled.div`
  display: flex;
  margin-bottom: 2%;

  justify-content: space-between;
`

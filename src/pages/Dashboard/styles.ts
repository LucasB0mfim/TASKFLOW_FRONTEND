import styled from "styled-components";

export const Aside = styled.aside`
  width: 30%;
  padding: 2%;

  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`

export const Title = styled.h1`
  color: #fff;
  margin-bottom: 2vw;
`

export const Form = styled.form`
  width: 100%;

  display: flex;
  flex-direction: column;

  input {
    color: #fff;
    height: 3vw;
    padding-left: 2%;
    margin-bottom: 0.5vw;

    outline: none;
    border: none;
    border-radius: 0.2vw;
    background: rgba(0, 0, 0, 0.2);

    &.error {
      border: 1px solid red;
    }

    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
  }
`

export const Main = styled.main`
  width: 70%;
  padding: 6%;

  overflow-y: auto;
  scroll-behavior: smooth;

  /* Largura da barra de rolagem */
  &::-webkit-scrollbar {
    width: 3px;
  }

  /* Cor do controle da barra de rolagem */
  &::-webkit-scrollbar-thumb {
    background: #fff;
    border-radius: 10px;
  }

  ul {
    li {
      list-style: none;
      margin-bottom: 1vw;
    }
  }
`

export const Button = styled.button`
  height: 6vh;
  margin-bottom: 2%;

  color: #fff;
  cursor: pointer;

  border: 1px solid #fff;
  border-radius: 0.2vw;
  background: transparent;

  transition: all 0.5s ease;

  &:hover {
    transition: all 0.5s ease;
    background: rgba(0, 0, 0, 0.2);
  }
`

export const Error = styled.p`
  color: #fff;
  font-size: 1vw;
  margin-bottom: 1vw;
`

export const Ilustration = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  p {
    color: #fff;
    font-size: 1.3vw;
  }

  img {
    width: 40%;
  }
`

import styled from "styled-components";

type ContentProps = {
  isSidebarVisible: boolean;
}

type ToggleButtonProps = {
  isSidebarVisible: boolean;
}

export const Sidebar = styled.aside`
  width: 25%;
  padding: 2%;
  background: rgba(0, 0, 0, 0.4);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  position: absolute;
  left: 0;
  top: 0;
  height: 100vh;
  transition: transform 0.3s ease-in-out;

  &.hidden {
    transform: translateX(-100%);
  }

  &.visible {
    transform: translateX(0);
  }
`

export const ToggleButton = styled.button<ToggleButtonProps>`
  position: absolute;
  top: 20px;
  left: ${({ isSidebarVisible }) => (isSidebarVisible ? '26%' : '1%')};
  z-index: 1000;

  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;

  transition: left 0.3s ease-in-out;

  &:hover {
    color: #b6c2cf;
  }

  img {
    width: 1.5vw;
  }
`

export const Heading = styled.h1`
  color: #fff;
  margin-bottom: 2vw;
`

export const TaskForm = styled.form`
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
    background: rgba(255, 255, 255, 0.1);

    &.error {
      border: 1px solid red;
    }

    &::placeholder {
      color: rgba(255, 255, 255, 0.8);
    }
  }
`

export const Content = styled.main<ContentProps>`
  width: ${({ isSidebarVisible }) => (isSidebarVisible ? '75%' : '100%')};
  padding: 6%;
  overflow-y: auto;
  scroll-behavior: smooth;

  /* Largura da barra de rolagem */
  &::-webkit-scrollbar {
    width: 5px;
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

export const EmptyState = styled.div`
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

export const Error = styled.p`
  color: #fff;
  font-size: 1vw;
  margin-bottom: 1vw;
`

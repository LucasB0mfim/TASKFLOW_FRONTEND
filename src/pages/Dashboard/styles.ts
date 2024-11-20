import styled from "styled-components";

type ContentProps = {
  isSidebarVisible: boolean;
}

type ToggleButtonProps = {
  isSidebarVisible: boolean;
}

export const Sidebar = styled.aside`
  width: 25%;
  height: 100vh;
  padding: 2%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  position: absolute;
  left: 0;
  top: 0;

  background: rgba(0, 0, 0, 0.4);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
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

  color: white;
  cursor: pointer;
  font-size: 1.5rem;

  transition: left 0.3s ease-in-out;

  &:hover {
    color: #b6c2cf;
  }

  img {
    width: 1.5vw;
  }
`

export const Heading = styled.h1`
  font-size: 1.8vw;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2vw;
`

export const TaskForm = styled.form`
  width: 100%;

  display: flex;
  flex-direction: column;

  input {
    height: 3vw;
    padding-left: 2%;
    margin-bottom: 0.5vw;

    color: #fff;

    outline: none;
    border: none;
    border-radius: 0.2vw;
    background: rgba(0, 0, 0, 0.3);

    &.error {
      border: 1px solid red;
    }

    &::placeholder {
      font-size: 0.9vw;
      color: rgba(255, 255, 255, 0.8);
    }
  }
`

export const GitHub = styled.div`
  display: flex;
  flex-direction: column;

  a {
    height: 3vw;
    padding: 2% 24%;

    display: flex;
    align-items: center;
    justify-content: space-between;

    font-size: 0.9vw;
    text-decoration: none;
    color: rgba(255, 255, 255, 0.8);

    border: none;
    border-radius: 0.2vw;
    background: rgba(0, 0, 0, 0.3);

    &:hover {
      transition: all 0.5s ease;
      background: rgba(0, 0, 0, 0.5);
    }
  }

  img {
    height: 2.1vw;
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
    background: #b6c2cf;
  }

  ul {
    li {
      list-style: none;
      margin-bottom: 1vw;
    }
  }
`

export const Button = styled.button`
  height: 3vw;
  margin-bottom: 2%;

  cursor: pointer;
  font-size: 0.9vw;
  color: rgba(255, 255, 255, 0.8);

  border: none;
  border-radius: 0.2vw;
  background: rgba(0, 0, 0, 0.3);

  transition: all 0.5s ease;

  &:hover {
    transition: all 0.5s ease;
    background: rgba(0, 0, 0, 0.5);
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
    width: 20vw;
  }
`

export const Error = styled.p`
  color: #fff;
  font-size: 1vw;
  margin-bottom: 1vw;
`

import styled from "styled-components";
import { breakpoints } from "../../styles";

type ContentProps = {
  isSidebarVisible?: boolean;
}

type ToggleButtonProps = {
  isSidebarVisible: boolean;
}

export const Sidebar = styled.aside<ContentProps>`
  width: 22%;
  height: 100vh;
  padding: 2.3% 2%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  position: absolute;
  left: 0;
  top: 0;
  z-index: 3;

  background: rgb(23, 28, 33, 0.8);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out;

  &.hidden {
    transform: translateX(-100%);
  }

  &.visible {
    transform: translateX(0);
  }

  @media(max-width: ${breakpoints.tablet}) {
    width: 30%;
  }

  @media(max-width: ${breakpoints.mobile}) {
    width: 88vw;
    height: auto;
    padding: 10% 5%;

    display: ${({ isSidebarVisible }) => (isSidebarVisible ? 'none' : 'flex')};
    position: relative;

    border-radius: 0.3vh;

    position: fixed;
    top: 30%;
    left: 6%;

    background: #2c3b58;

    transition: none;

    &.hidden {
      transform: translateX(-120%);
    }

    &.visible {
      transform: translateX(0);
    }
  }
`

export const ToggleButton = styled.button<ToggleButtonProps>`
  position: absolute;
  top: 1.9vw;
  left: ${({ isSidebarVisible }) => (isSidebarVisible ? '16.9%' : '2%')};

  z-index: 4;

  border: none;
  background: transparent;
  transition: left 0.3s ease-in-out;

  @media(max-width: ${breakpoints.tablet}) {
    top: 1.6vw;
    left: ${({ isSidebarVisible }) => (isSidebarVisible ? '23%' : '2%')};
  }

  @media(max-width: ${breakpoints.mobile}) {
    display: none;
  }
`

export const BoxSetaClose = styled.div`
  width: 3vw;
  height: 6vh;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  border-radius: 0.3vw;
  background: transparent;
  transition: all 0.1s linear;

  img {
    width: 1.3vw;
  }

  &:hover {
    background: rgb(59, 64, 68, 0.7);
    transition: all 0.1s linear;
  }

  @media(max-width: ${breakpoints.tablet}) {
    width: 3vw;
    height: 5vh;
  }

  @media(max-width: ${breakpoints.tablet}) {
    width: 5vw;
  }

  @media(max-width: ${breakpoints.mobile}) {
    img {
      width: 1.2vh;
    }
  }
`

export const BoxSetaOpen = styled.div`
  width: 3vw;
  height: 6vh;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  border-radius: 0.3vw;
  transition: all 0.2s ease;
  background: rgb(23, 28, 33, 0.8);

  img {
    width: 1.3vw;
  }

  &:hover {
    background: rgb(23, 28, 33, 0.5);
    transition: all 0.2s ease;
  }

  @media(max-width: ${breakpoints.tablet}) {
    width: 5vw;
  }

  @media(max-width: ${breakpoints.mobile}) {
    img {
      width: 1.2vh;
    }
  }
`

export const Heading = styled.h1`
  font-size: 1.7vw;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 3.4vw;

  img {
    display: none;
  }

  @media(max-width: ${breakpoints.mobile}) {
    font-size: 2.4vh;
    margin-bottom: 2vh;

    display: flex;
    align-items: center;
    justify-content: space-between;


    img {
      width: 2vh;

      display: flex;

      cursor: pointer;
    }
  }
`

export const TaskForm = styled.form`
  width: 100%;

  display: flex;
  flex-direction: column;

  input {
    height: 3vw;
    padding-left: 4%;
    margin-bottom: 0.5vw;

    color: #fff;

    outline: none;
    border: none;
    border-radius: 0.2vw;
    background: rgba(59, 64, 68, 0.5);

    &.error {
      border: 1px solid red;
    }

    &::placeholder {
      font-size: 0.9vw;
      color: rgba(255, 255, 255, 0.8);
    }

    &:-webkit-autofill {
      -webkit-box-shadow: 0px 0px 0px 1000px #2a2f35 inset !important;
      box-shadow: 0px 0px 0px 1000px #2a2f35 inset !important;
      -webkit-text-fill-color: rgba(255, 255, 255, 0.8) !important;
    }

    @media(max-width: ${breakpoints.mobile}) {
      height: 5vh;
      font-size: 1.3vh;
      padding-left: 10px;
      margin-bottom: 1vh;

      border-radius: 0.5vh;
      background: rgba(255, 255, 255, 0.2);

      &::placeholder {
        font-size: 1.3vh;
      }
    }
  }
`

export const GitHub = styled.div`
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

export const Content = styled.main<ContentProps>`
  width: ${({ isSidebarVisible }) => (isSidebarVisible ? '78%' : '100%')};
  height: 95vh;
  padding: 6% 0%;

  overflow-y: auto;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #b6c2cf;
  }

  ul {
    padding: 2%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2vw;

    li {
      height: auto;
      list-style: none;
    }
  }

  @media(max-width: 1024px) {
    ul {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media(max-width: ${breakpoints.tablet}) {
    width: ${({ isSidebarVisible }) => (isSidebarVisible ? '70%' : '100%')};
  }

  @media(max-width: ${breakpoints.mobile}) {
    width: 100%;
    height: auto;
    padding: 6%;
    background: ${({ isSidebarVisible }) => (isSidebarVisible ? 'rgba(0, 0, 0, 0.4)' : '')};

    ul {
      display: inline;
      grid-template-columns: 1fr;
      gap: 5vw;
      padding: 0;

      li {
        margin-bottom: 3vh;
      }
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
  background: rgb(59, 64, 68, 0.5);

  transition: all 0.5s ease;

  &:hover {
    transition: all 0.5s ease;
    background: rgb(59, 64, 68, 0.2);
  }

  @media(max-width: ${breakpoints.mobile}) {
    height: 5vh;
    font-size: 1.3vh;

    border-radius: 0.5vh;
    border: 2px solid rgba(255, 255, 255, 0.2);
    background: transparent;
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

  @media(max-width: ${breakpoints.mobile}) {
    img {
      width: 30vh;
    }

    p {
      font-size: 1.5vh;
    }
  }
`

export const Error = styled.p`
  color: #fff;
  font-size: 1vw;
  margin-bottom: 1vw;

  @media(max-width: ${breakpoints.mobile}) {
    font-size: 1vh;
    margin-bottom: 4%;
  }
`

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  background: rgba(0, 0, 0, 0.1);
  z-index: 2;

  @media(max-width: ${breakpoints.mobile}) {
    background: rgba(0, 0, 0, 0.4);
  }
`

export const ConfirmDelet = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;

  width: 35vw;
  height: 22vh;
  padding: 2%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  border: none;
  border-radius: 0.3vw;
  background: #2c3b58;

  z-index: 3;
  transform: translate(-50%, -50%);

  div {
    display: flex;
    justify-content: end;

    > button {
      display: flex;
      justify-content: center;
    }
  }

  p {
    color: rgba(255, 255, 255, 0.8);;
    font-size: 1.2vw;
    text-align: center;
  }

  button {
    width: 6vw;
    padding: 2%;

    border-radius: 0.3vw;
    border: 1px solid rgba(255, 255, 255, 0.8);
    background: rgba(0, 0, 0, 0.1);

    color: rgba(255, 255, 255, 0.8);
    font-size: 1vw;
    font-weight: bold;
    cursor: pointer;

    &:last-child {
      margin-left: 2%;
    }

    &:hover {
      transition: all 0.2s ease;
      background: rgba(0, 0, 0, 0.3);
    }
  }

  @media(max-width: ${breakpoints.mobile}) {
    width: 90%;
    height: auto;
    padding: 4%;

    border-radius: 0.4vh;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.5);

    p {
      font-size: 2.5vh;
      margin-bottom: 10%;
    }

    button {
      width: auto;
      font-size: 1.8vh;
      border-radius: 0.4vh;
    }
  }
`

export const CloseMobile = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;

  img {
    width: 30%;
    height: 30%;
  }
`

export const AddTaskMobile = styled.div`
  display: none;

  @media(max-width: ${breakpoints.mobile}) {
    width: 14vw;
    height: 7vh;

    display: flex;
    align-items: center;
    justify-content: center;

    z-index: 3;

    cursor: pointer;

    background: rgba(0, 0, 0, 0.4);

    position: fixed;
    right: 7%;
    bottom: 4%;

    border-radius: 1vw;

    img {
      width: 50%;
      height: 50%;
    }
  }
`

export const Warning = styled.p`
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  font-size: 1.2vw;
  margin-top: 10%;

  @media(max-width: ${breakpoints.mobile}) {
    font-size: 2vh;
    margin-top: 5%;
  }
`

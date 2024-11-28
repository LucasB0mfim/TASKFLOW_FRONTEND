import styled from "styled-components";
import { breakpoints, colors } from "../../styles";

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
    padding: 8%;

    display: ${({ isSidebarVisible }) => (isSidebarVisible ? 'none' : 'flex')};

    position: fixed;
    top: 30%;
    left: 6%;

    transition: none;
    border-radius: 0.5vh;
    background: ${colors.darkBlue};
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.5);

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
  left: ${({ isSidebarVisible }) => (isSidebarVisible ? '16.9%' : '3%')};

  z-index: 4;

  border: none;
  background: transparent;
  transition: left 0.3s ease-in-out;

  @media(max-width: ${breakpoints.tablet}) {
    top: 1.6vw;
    left: ${({ isSidebarVisible }) => (isSidebarVisible ? '23%' : '3%')};
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
    width: 1vw;
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
    width: 1vw;
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
    margin-bottom: 8%;

    display: flex;
    align-items: center;
    justify-content: space-between;


    img {
      width: 2.5vh;

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

    color: ${colors.white};

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

    @media(max-width: ${breakpoints.tablet}) {
      height: 4vw;

      &::placeholder {
      font-size: 1.2vw;
      }
    }

    @media(max-width: ${breakpoints.mobile}) {
      height: 5vh;
      font-size: 1.3vh;
      padding-left: 10px;
      margin-bottom: 1vh;

      border-radius: 0.5vh;
      background: rgba(255, 255, 255, 0.2);

      &::placeholder {
        font-size: 1.5vh;
      }

      &:-webkit-autofill {
        -webkit-box-shadow: 0px 0px 0px 1000px #566279 inset !important;
        box-shadow: 0px 0px 0px 1000px #566279 inset !important;
        -webkit-text-fill-color: rgba(255, 255, 255, 0.8) !important;
      }
    }
  }
`

export const Content = styled.main<ContentProps>`
  width: ${({ isSidebarVisible }) => (isSidebarVisible ? '78%' : '100%')};
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${colors.darkGray};
  }

  ul {
    width: 100%;
    height: auto;
    padding: 6% 2% 2% 2%;

    display: flex;
    justify-content: start;
    flex-wrap: wrap;

    overflow-x: hidden;
    overflow-y: auto;
    scroll-behavior: smooth;

    li {
      list-style: none;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 3vw;
    }
  }

  @media(max-width: ${breakpoints.tablet}) {
    width: ${({ isSidebarVisible }) => (isSidebarVisible ? '70%' : '100%')};

    ul {
      padding: 8% 2% 2% 2%;
    }
  }

  @media(max-width: ${breakpoints.mobile}) {
    width: 100%;
    height: auto;
    padding: 6%;
    opacity: ${({ isSidebarVisible }) => (isSidebarVisible ? '0' : '')};

    ul {
      display: inline;
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

  @media(max-width: ${breakpoints.tablet}) {
    height: 4vw;
    font-size: 1.2vw;
  }

  @media(max-width: ${breakpoints.mobile}) {
    height: 5vh;
    font-size: 1.55vh;

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
    width: 100%;
    text-align: center;

    color: ${colors.white};
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
  color: ${colors.white};
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

  background: rgba(0, 0, 0, 0.5);
  z-index: 4;

  @media(max-width: ${breakpoints.mobile}) {
    background: ${colors.darkBlue};
  }
`

export const ConfirmDelet = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;

  width: 40vw;
  height: 15vw;
  padding: 2%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  border: none;
  border-radius: 0.5vw;
  background: ${colors.white};

  z-index: 4;
  transform: translate(-50%, -50%);

  @media(max-width: ${breakpoints.tablet}) {
    width: 80%;
    height: auto;
    padding: 6% 4%;

    border-radius: 0.5vh;
    background: ${colors.darkBlue};
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.5);
  }

  @media(max-width: ${breakpoints.mobile}) {
    width: 90%;
    padding: 10% 4%;
  }
`

export const TextDelet = styled.div`
  h2 {
    color: ${colors.darkGray};
    margin-bottom: 4%;
  }

  p {
    color: ${colors.gray};
    font-size: 1.2vw;
  }

  @media(max-width: ${breakpoints.tablet}) {
    h2 {
      color: ${colors.white};
      margin: 0;
    }

    p {
      color: ${colors.lightGray};
      margin: 10% 0%;
      font-size: 2.5vh;
    }
  }

  @media(max-width: ${breakpoints.mobile}) {
    h2 {
      text-align: center;
    }

    p {
      text-align: center;
    }
  }
`

export const ButtonsDelet = styled.div`
  display: flex;
  justify-content: end;

  button {
    display: flex;
    justify-content: center;

    width: 6vw;
    padding: 2%;

    border-radius: 0.3vw;
    border: 1px solid #202124;

    color: ${colors.gray};
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

  @media(max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    z-index: 1;

    button {
      width: 100%;
      height: 6vw;

      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.55vw;

      color: ${colors.lightGray};
      border-radius: 0.5vh;
      border: 2px solid rgba(255, 255, 255, 0.2);
      background: transparent;

      &:last-child {
        margin-left: 0;
        margin-top: 2%;
      }
    }
  }

  @media(max-width: ${breakpoints.mobile}) {
    button {
      height: 5vh;
      font-size: 1.55vh;
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

    z-index: 1;

    cursor: pointer;

    background: ${colors.darkBlue};

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

export const Warning = styled.div`
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  font-size: 1.2vw;
  margin-top: 2%;

  @media(max-width: ${breakpoints.mobile}) {
    font-size: 2vh;
    margin-top: 5%;
  }
`

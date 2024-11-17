import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  font-family: sans-serif;
}
`

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  margin: 0;

  display: flex;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background: linear-gradient(145deg, #0a192fff 0%, rgba(34, 13, 50, 1) 30%, rgba(23,23,23,1) 100%);
`

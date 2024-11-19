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
  justify-content: end;

  background: #1f2c41;
`

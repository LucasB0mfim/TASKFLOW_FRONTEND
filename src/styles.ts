import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-family: "Roboto", serif;
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

export const breakpoints = {
  mobile: '768px',
  tablet: '1024px'
}

export const colors = {
  white: '#fff',
  gray: '#3c4043',
  lightGray: '#b6c2cf',
  darkGray: '#22272b',
  darkBlue: '#2c3b58',
}

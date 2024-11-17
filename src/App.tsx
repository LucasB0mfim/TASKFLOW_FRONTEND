import { Provider } from 'react-redux';

import Rotas from './routes';
import { store } from './store';

import { Container, GlobalStyle } from "./styles";

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Container>
        <Rotas />
      </Container>
    </Provider>
  );
}

export default App;

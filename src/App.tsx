import { Provider } from 'react-redux';

import { store } from './store';

import { GlobalStyle } from "./styles";

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
    </Provider>
  );
}

export default App;

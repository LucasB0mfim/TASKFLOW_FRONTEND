import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import Rotas from './routes'
import { store } from './store'

import { Container, GlobalStyle } from './styles'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Container>
          <GlobalStyle />
          <Rotas />
        </Container>
      </BrowserRouter>
    </Provider>
  )
}

export default App;

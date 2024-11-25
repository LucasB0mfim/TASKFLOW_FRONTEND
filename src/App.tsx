// Importação de dependências para gerenciamento global do estado (Redux) e rotas (React Router).
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

// Importação do componente que define as rotas da aplicação.
import Rotas from './routes';

// Importação da store configurada.
import { store } from './store';

// Importação do estilo global e contêiner principal do projeto.
import { Container, GlobalStyle } from './styles';

function App() {
  return (
    <Provider store={store}> {/* Fornece o estado global para todos os componentes do aplicativo. */}
      <BrowserRouter> {/* Configuração do roteamento para gerenciar as rotas da aplicação. */}
        <Container>
          <GlobalStyle /> {/* Aplica os estilos globais em toda a aplicação. */}
          <Rotas /> {/* Define as rotas e páginas do aplicativo. */}
        </Container>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

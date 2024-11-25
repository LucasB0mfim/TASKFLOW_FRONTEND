// Importação da animação de carregamento.
import { MoonLoader } from 'react-spinners';

// Importação do estilo do contêiner do componente.
import { Container } from './styles';

// Propriedades esperadas pelo componente.
type Props = {
  size: number; // Tamanho da animação de carregamento.
}

const Loader = ({ size }: Props) => (
  <Container>
    <MoonLoader size={size} color="#fff" />
  </Container>
)

export default Loader;

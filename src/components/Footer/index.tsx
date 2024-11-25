// Importação do estilo do componente.
import * as S from './styles'

// Obtém o ano atual dinamicamente.
const currentYear = new Date().getFullYear();

const Footer = () => (
  <S.Container>
    <S.CopyRight>{currentYear} - &copy; TaskFlow. Todos os direitos reservados.</S.CopyRight>
  </S.Container>
)

export default Footer;

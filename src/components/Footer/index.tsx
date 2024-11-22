import * as S from './styles'

const currentYear = new Date().getFullYear()

const Footer = () => (
  <S.Container>
    <S.CopyRight>{currentYear} - &copy; TaskFlow Todos os direitos reservados</S.CopyRight>
  </S.Container>
)

export default Footer

import * as S from './styles'

const currentYear = new Date().getFullYear()

const Footer = () => (
  <S.CopyRight>{currentYear} - &copy; TaskFlow Todos os direitos reservados</S.CopyRight>
)

export default Footer

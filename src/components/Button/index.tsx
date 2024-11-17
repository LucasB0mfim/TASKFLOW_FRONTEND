import * as S from './styles'

type Props = {
  title: string;
  margin?: string;
  background: string;
  onClick?: () => void;
}

const Button = ( {title, background, margin, onClick}:Props ) => {
  return (
    <S.Btn
    style={{background: `${background}`,
    margin: `${margin}`}}
    onClick={onClick}>
      {title}
    </S.Btn>
  )
}

export default Button

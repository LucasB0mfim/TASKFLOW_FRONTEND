import * as S from './styles'

type Props = {
  nomeTarefa: string
  custo: string
  dataLimite: string
}

const Card = ( { nomeTarefa, custo, dataLimite }: Props ) => {
  return (
    <S.Container>
      <S.TagContainer>
        <S.Tag>{nomeTarefa}</S.Tag>
        <S.Tag>{dataLimite}</S.Tag>
      </S.TagContainer>
      <S.Tag>R$ {custo}.00</S.Tag>
    </S.Container>
  )
}

export default Card

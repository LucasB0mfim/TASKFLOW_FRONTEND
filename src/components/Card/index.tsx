import * as S from './styles'

type Props = {
  nomeTarefa: string
  custo: string
  dataLimite: string
}

const Card = ( { nomeTarefa, custo, dataLimite }: Props ) => {
  return (
    <S.Container isExpensive={custo}>
      <S.TagContainer>
        <S.Tag isExpensive={custo}>{nomeTarefa}</S.Tag>
        <S.Tag isExpensive={custo}>{dataLimite}</S.Tag>
      </S.TagContainer>
      <S.Tag isExpensive={custo}>R$ {custo}.00</S.Tag>
    </S.Container>
  )
}

export default Card

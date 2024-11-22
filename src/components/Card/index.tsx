import clockIcon from '../../assets/images/time.png';
import penIcon from '../../assets/images/penIcon.png';
import closeIcon from '../../assets/images/closeIcon.png';
import LeftArrow from '../../assets/images/seta-esquerda.png';
import rightArrow from '../../assets/images/seta-direita.png';

import * as S from './styles';

type Props = {
  taskName: string;
  cost: string;
  dueDate: string;
  onClickEdit?: () => void;
  onClickClose?: () => void;
  onClickLeft?: () => void;
  onClickRight?: () => void;
}

const Card = ({ taskName, cost, dueDate, onClickEdit, onClickClose, onClickLeft, onClickRight }: Props) => {
  return (
    <S.CardContainer>

      <S.Header>
        <S.TaskTitle>{taskName}</S.TaskTitle>
        <S.OrderControls>
          <img src={LeftArrow} alt="edit task" onClick={onClickLeft} />
          <img src={rightArrow} alt="close task" onClick={onClickRight} />
        </S.OrderControls>
        <S.ActionButtons>
          <img src={penIcon} alt="edit task" onClick={onClickEdit} />
          <img src={closeIcon} alt="close task" onClick={onClickClose} />
        </S.ActionButtons>
      </S.Header>

      <S.Body>
        <S.CostContainer>
          <S.CostText>R$ {cost}.00</S.CostText>
        </S.CostContainer>
      </S.Body>

      <S.Footer>
        <S.CostTag isExpensive={cost}></S.CostTag>
        <S.DueDate><img src={clockIcon} alt='Data Limite' /> {dueDate}</S.DueDate>
      </S.Footer>

    </S.CardContainer>
  )
}

export default Card

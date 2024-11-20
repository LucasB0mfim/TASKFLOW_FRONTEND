import clockIcon from '../../assets/images/time.png';
import penIcon from '../../assets/images/penIcon.png';
import closeIcon from '../../assets/images/closeIcon.png';
import upArrow from '../../assets/images/seta-para-cima.png';
import downArrow from '../../assets/images/seta-para-baixo.png';

import * as S from './styles';

type Props = {
  taskName: string;
  cost: string;
  dueDate: string;
  onClickEdit?: () => void;
  onClickClose?: () => void;
  onClickUp?: () => void;
  onClickDown?: () => void;
}

const Card = ({ taskName, cost, dueDate, onClickEdit, onClickClose, onClickUp, onClickDown }: Props) => {
  return (
    <S.CardContainer>

      <S.Header>
        <S.TaskTitle>{taskName}</S.TaskTitle>
        <S.OrderControls>
          <img src={upArrow} alt="edit task" onClick={onClickUp} />
          <img src={downArrow} alt="close task" onClick={onClickDown} />
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

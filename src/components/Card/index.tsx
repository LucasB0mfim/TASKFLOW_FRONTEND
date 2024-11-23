import { useState, useEffect } from 'react';
import { Draggable } from '@hello-pangea/dnd';

import clockIcon from '../../assets/images/time.png';
import penIcon from '../../assets/images/penIcon.png';
import closeIcon from '../../assets/images/closeIcon.png';
import UpArrow from '../../assets/images/seta-para-cima.png';
import LeftArrow from '../../assets/images/seta-esquerda.png';
import rightArrow from '../../assets/images/seta-direita.png';
import DownArrow from '../../assets/images/seta-para-baixo.png';

import * as S from './styles';

type Props = {
  taskId: string;
  taskName: string;
  cost: string;
  dueDate: string;
  index: number;
  onClickEdit?: () => void;
  onClickClose?: () => void;
  onClickLeft?: () => void;
  onClickRight?: () => void;
}

const Card = ({ taskId, taskName, cost, dueDate, index, onClickEdit, onClickClose, onClickLeft, onClickRight }: Props) => {

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const { background } = tagColor();

  useEffect(() => {
    const alterarIcone = () => {
      setIsMobile(window.innerWidth < 678);
    };
    window.addEventListener('resize', alterarIcone);
    alterarIcone();
    return () => window.removeEventListener('resize', alterarIcone);
  }, []);

  function tagColor() {
    const costNumber = Number(cost);
    if (costNumber >= 1000) {
      return {
        background: 'yellow'
      };
    } else {
      return {
        background: 'white'
      };
    }
  }

  return (
    <Draggable draggableId={taskId} index={index}>
      {(provided) => (
        <S.CardContainer ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>

          <S.Header>
            <S.TaskTitle>{taskName}</S.TaskTitle>
            <S.OrderControls>
              {isMobile ? (
                <>
                  <img src={UpArrow} alt="move up" onClick={onClickLeft} />
                  <img src={DownArrow} alt="move down" onClick={onClickRight} />
                </>
              ) : (
                <>
                  <img src={LeftArrow} alt="move left" onClick={onClickLeft} />
                  <img src={rightArrow} alt="move right" onClick={onClickRight} />
                </>
              )}
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
            <S.CostTag style={{ background: background }} />
            <S.DueDate><img src={clockIcon} alt='Data Limite' /> {dueDate}</S.DueDate>
          </S.Footer>

        </S.CardContainer>
      )}
    </Draggable>
  )
}

export default Card

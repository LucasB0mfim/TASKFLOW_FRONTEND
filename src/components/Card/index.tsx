// Dependências externas utilizadas no componente.
import { useState, useEffect } from 'react';
import { Draggable } from '@hello-pangea/dnd';

// Importação de ícones utilizados no card de tarefas.
import clockIcon from '../../assets/images/time.png';
import penIcon from '../../assets/images/penIcon.png';
import closeIcon from '../../assets/images/closeIcon.png';
import UpArrow from '../../assets/images/seta-para-cima.png';
import LeftArrow from '../../assets/images/seta-esquerda.png';
import rightArrow from '../../assets/images/seta-direita.png';
import DownArrow from '../../assets/images/seta-para-baixo.png';

// Importação do estilo do componente, localizado em './styles.ts'.
import * as S from './styles';

// Propriedades que o componente espera receber.
type Props = {
  taskId: string; // Identificador único da tarefa.
  taskName: string; // Nome da tarefa.
  cost: string; // Custo da tarefa.
  dueDate: string; // Data limite da tarefa.
  index: number; // Posição da tarefa na lista.
  onClickEdit?: () => void; // Função acionada ao clicar no botão de edição.
  onClickClose?: () => void; // Função acionada ao clicar no botão de fechamento.
  onClickLeft?: () => void; // Função acionada ao mover para a esquerda ou para cima (em modo responsivo).
  onClickRight?: () => void; // Função acionada ao mover para a direita ou para baixo (em modo responsivo).
}

const Card = ({ taskId, taskName, cost, dueDate, index, onClickEdit, onClickClose, onClickLeft, onClickRight }: Props) => {

  // Estado que verifica se a largura da tela é menor que 678px, para alterar os ícones de movimentação.
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Hook que monitora o redimensionamento da tela para ajustar os ícones de acordo com a largura.
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const alterarIcone = () => setIsMobile(window.innerWidth < 678);
      window.addEventListener('resize', alterarIcone);
      alterarIcone();
      return () => window.removeEventListener('resize', alterarIcone);
    }
  }, []);

  // Função que retorna a cor de fundo da tag de custo, baseada no valor da tarefa.
  function tagColor() {

    // Converte o valor do custo para número.
    const costNumber = Number(cost);

    // Cor padrão para valores inválidos.
    if (isNaN(costNumber)) {
      return { background: 'gray' };
    }

    // Define a cor com base no custo.
    return costNumber >= 1000 ? { background: 'yellow' } : { background: 'white' };
  }

  // Determina a cor de fundo da tag.
  const { background } = tagColor();

  return (
    <Draggable draggableId={taskId} index={index}>
      {(provided) => (
        <S.CardContainer ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <S.Header>
            <S.TaskTitle>{taskName}</S.TaskTitle>
            <S.OrderControls>
              {isMobile ? (
                <>
                  <img src={UpArrow} alt="Mover para cima" onClick={onClickLeft} />
                  <img src={DownArrow} alt="Mover para baixo" onClick={onClickRight} />
                </>
              ) : (
                <>
                  <img src={LeftArrow} alt="Mover para a esquerda" onClick={onClickLeft} />
                  <img src={rightArrow} alt="Mover para a direita" onClick={onClickRight} />
                </>
              )}
            </S.OrderControls>
            <S.ActionButtons>
              <img src={penIcon} alt="Editar tarefa" onClick={onClickEdit} />
              <img src={closeIcon} alt="Remover tarefa" onClick={onClickClose} />
            </S.ActionButtons>
          </S.Header>
          <S.Body>
            <S.CostContainer>
              <S.CostText>R$ {cost}.00</S.CostText>
            </S.CostContainer>
          </S.Body>
          <S.Footer>
            <S.CostTag style={{ background: background }} />
            <S.DueDate>
              <img src={clockIcon} alt="Data limite" /> {dueDate}
            </S.DueDate>
          </S.Footer>
        </S.CardContainer>
      )}
    </Draggable>
  );
}

export default Card;

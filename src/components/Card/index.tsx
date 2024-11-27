// Dependências externas utilizadas no componente.
import { useState, useEffect } from 'react';
import { Draggable } from '@hello-pangea/dnd';

// Importação de ícones utilizados no card de tarefas.
import clockIcon from '../../assets/images/time.png';
import penIcon from '../../assets/images/penIcon.png';
import check from '../../assets/images/checkIcon.png';
import closeIcon from '../../assets/images/closeIcon.png';
import UpArrow from '../../assets/images/seta-para-cima.png';
import LeftArrow from '../../assets/images/seta-esquerda.png';
import rightArrow from '../../assets/images/seta-direita.png';
import downArrow from '../../assets/images/seta-para-baixo.png';
import checkGreen from '../../assets/images/checkIconGreen.png';

// Importação do estilo do componente, localizado em './styles.ts'.
import * as S from './styles';

// Propriedades que o componente espera receber.
type Props = {
  taskId: string; // Identificador único da tarefa.
  taskName: string; // Nome da tarefa.
  description: string; // Descrição da tarefa.
  cost: string; // Custo da tarefa.
  dueDate: string; // Data limite da tarefa.
  status: string; // Status da tarefa (concluída ou não).
  index: number; // Posição da tarefa na lista.
  onClickEdit?: () => void; // Função acionada ao clicar no botão de edição.
  onClickClose?: () => void; // Função acionada ao clicar no botão de fechamento.
  onClickLeft?: () => void; // Função acionada ao mover para a esquerda ou para cima (em modo responsivo).
  onClickRight?: () => void; // Função acionada ao mover para a direita ou para baixo (em modo responsivo).
  onClickCheck?: () => void; // Função acionada ao marcar como concluído.
}

const Card = ({
  taskId,
  taskName,
  description,
  cost,
  dueDate,
  status,
  index,
  onClickEdit,
  onClickClose,
  onClickLeft,
  onClickRight,
  onClickCheck,
}: Props) => {

  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Determina a cor de fundo da tag com base no status da tarefa
  const { background } = tagColor(status);

  // Determina a margem de fundo da descrição
  const { margin } = distancia();

  // Função que retorna a margem de fundo da descrição
  function distancia() {
    if (description.length > 0) {
      return { margin: '4%' };
    } else {
      return { margin: '0' };
    }
  }

  // Hook que monitora o redimensionamento da tela para ajustar os ícones de acordo com a largura.
  useEffect(() => {
    const alterarIcone = () => setIsMobile(window.innerWidth < 678);
    window.addEventListener('resize', alterarIcone);
    alterarIcone();
    return () => window.removeEventListener('resize', alterarIcone);
  }, []);

  // Função que retorna a cor de fundo da tag de custo ou status
  function tagColor(status: string) {
    // Se o status da tarefa for "Concluido", a cor será verde
    if (status === 'Concluido') {
      return { background: 'green' };
    }

    // Caso contrário, aplica a cor padrão baseada no custo
    const costNumber = Number(cost);
    if (isNaN(costNumber)) {
      return { background: 'gray' };
    }

    // Define a cor com base no custo
    return costNumber >= 1000 ? { background: 'yellow' } : { background: 'white' };
  }

  return (
    <Draggable draggableId={taskId} index={index}>
      {(provided) => (
        <S.CardContainer ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <S.Header>
            <S.TaskTitle>{taskName}</S.TaskTitle>

            <S.CheckTask>
              {status === 'Aberto' && <img src={check} alt="Concluído" onClick={onClickCheck} />}
              {status === 'Concluido' && <img src={checkGreen} alt="Concluído" onClick={onClickCheck} />}
            </S.CheckTask>

            <S.OrderControls>
              {isMobile ? (
                <>
                  <img src={UpArrow} alt="Mover para cima" onClick={onClickLeft} />
                  <img src={downArrow} alt="Mover para baixo" onClick={onClickRight} />
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
              <S.CostText style={{ marginBottom: margin }}>{description}</S.CostText>
              <S.CostText>R$ {cost}.00</S.CostText>
            </S.CostContainer>
          </S.Body>

          <S.Footer>
            <S.CostTag style={{ background: background }} />
            <S.DueDate>
              <img src={clockIcon} alt="Data limite" /> <span>{dueDate}</span>
            </S.DueDate>
          </S.Footer>
        </S.CardContainer>
      )}
    </Draggable>
  );
};

export default Card;

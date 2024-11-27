// Dependências utilizadas:
import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import InputMask from 'react-input-mask';
import { useEffect, useState } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd'

// Componentes utilizados pelo Dashboard:
import {
  Tarefa,
  useBuscarTarefasQuery,
  useSalvarTarefaMutation,
  useExcluirTarefaMutation,
  useAtualizarTarefaMutation,
  useReordenarTarefasMutation,
} from '../../service/api';
import Card from '../../components/Card';
import Loader from '../../components/Loader';
import Footer from '../../components/Footer';
import GitHub from '../../components/GitHub';

// Images utilizadas pelo Dashboard:
import more from '../../assets/images/moreIcon.png';
import close from '../../assets/images/closeIcon.png';
import setaLeft from '../../assets/images/seta-esquerda.png';
import setaRight from '../../assets/images/seta-direita.png';
import ilustration from '../../assets/images/ilustration.png';

// Importação da estilização do Dashboard.
import * as S from './styles';

const Dashboard = () => {

  // Constantes para gerenciar o estado da tarefa:
  const [reordenarTarefas] = useReordenarTarefasMutation();
  const [excluirTarefa, { isLoading: excluindo }] = useExcluirTarefaMutation();
  const { data: tarefas, refetch, isLoading: carregando } = useBuscarTarefasQuery();
  const [salvarTarefa, { isLoading, error: erroAoSalvar }] = useSalvarTarefaMutation();
  const [atualizarTarefa, { isLoading: atualizando, error: erroAoAtualizar }] = useAtualizarTarefaMutation();

  // Constantes para melhorar a experiência do usuário:
  const [custo, setCusto] = useState<number | null>(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [editandoTarefa, setEditandoTarefa] = useState<number | null>(null);
  const [localTarefas, setLocalTarefas] = useState<Tarefa[]>(tarefas || []);
  const [tarefaParaExcluir, setTarefaParaExcluir] = useState<Tarefa | null>(null);

  // Dependência Formik para validar os campos antes de enviar uma tarefa.
  const form = useFormik({
    initialValues: {
      id: 0,
      nome: '',
      descricao: '',
      custo: '',
      dataLimite: '',
      status: 'Aberto',
    },
    validationSchema: yup.object({
      nome: yup.string().max(15, 'Você excedeu o limite de 15 caracteres.').required('O nome é obrigatório.'),
      descricao: yup.string().max(255, 'Você excedeu o limite de 255 caracteres.'),
      custo: yup.number().min(0, 'Valor inválido.').required('O custo é obrigatório.'),
      dataLimite: yup.string().min(0, 'Digite uma data válida.').required('A data limite é obrigatória.'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        if (editandoTarefa) {
          const tarefaAtual = localTarefas.find((t) => t.id === editandoTarefa);

          if (!tarefaAtual) {
            throw new Error('Tarefa não encontrada na lista local.');
          }

          await atualizarTarefa({
            tarefaId: editandoTarefa,
            tarefa: { ...values, id: editandoTarefa, ordem: tarefaAtual.ordem },
          }).unwrap();
        } else {
          await salvarTarefa(values).unwrap();
        }

        refetch();
        resetForm();
        setEditandoTarefa(null);

        if (window.innerWidth <= 500) {
          setIsSidebarVisible(!isSidebarVisible);
        }
      } catch (error) {
        console.error('Erro ao salvar/atualizar tarefa:', error);
      }
    },
  });

  // Função para re-ordenar a ordem da apresentação na api.
  function reorder<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  }

  // Função para gerenciar a animção de arrastar os Cards.
  function onDragEnd(result: any) {
    if (!result.destination) {
      return;
    }

    const items = reorder(localTarefas, result.source.index, result.destination.index);

    setLocalTarefas(items);

    const ordemAtualizada = items.map((tarefa, ordem) => ({
      id: tarefa.id,
      ordem,
    }));

    try {
      reordenarTarefas(ordemAtualizada).unwrap();
    } catch (error) {
      console.error('Erro ao reordenar tarefas:', error);
    }
  }

  useEffect(() => {
    setLocalTarefas(tarefas || []);
  }, [tarefas]);

  // Gerencia o tamanho da tela do usuário.
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    setIsSidebarVisible(!isMobile);
  }, []);

  // Mostra o erro após não consigar enviar a tarefa para a api.
  const checkInputHasError = (fieldName: string) => {
    const isTouched = fieldName in form.touched;
    const isInvalid = fieldName in form.errors;
    return isTouched && isInvalid;
  };

  // Gerencia a edição de uma tarefa.
  const handleEdit = (tarefa: Tarefa) => {
    setEditandoTarefa(tarefa.id);
    form.setValues({
      id: tarefa.id,
      nome: tarefa.nome,
      descricao: tarefa.descricao,
      custo: tarefa.custo,
      dataLimite: tarefa.dataLimite,
      status: tarefa.status,
    });
  };

  // Gerencia a exclusão de uma tarefa.
  const handleDeleteConfirm = async () => {
    if (!tarefaParaExcluir) return;
    try {
      await excluirTarefa(tarefaParaExcluir.id).unwrap();
      refetch();
      setTarefaParaExcluir(null);
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
    }
  };

  const handleCheck = async (tarefa: Tarefa) => {
    try {
      // Alterna o status entre 'Aberto' e 'Concluido'
      const novoStatus = tarefa.status === 'Concluido' ? 'Aberto' : 'Concluido';

      // Atualiza o status da tarefa
      await atualizarTarefa({
        tarefaId: tarefa.id,
        tarefa: { ...tarefa, status: novoStatus },
      }).unwrap();

      // Refaz a requisição para atualizar a lista de tarefas após a atualização
      refetch();
    } catch (error) {
      console.error('Erro ao atualizar status da tarefa:', error);
    }
  };


  // Gerencia a ordem de apresentação das tarefas com os botões ◀️▶️.
  const handleReorder = async (index: number, direction: 'left' | 'right') => {
    const updatedTarefas = [...localTarefas];
    const swapIndex = direction === 'left' ? index - 1 : index + 1;

    if (swapIndex < 0 || swapIndex >= updatedTarefas.length) return;

    [updatedTarefas[index], updatedTarefas[swapIndex]] = [updatedTarefas[swapIndex], updatedTarefas[index]];
    setLocalTarefas(updatedTarefas);

    const ordemAtualizada = updatedTarefas.map((tarefa, ordem) => ({
      id: tarefa.id,
      ordem,
    }));

    try {
      await reordenarTarefas(ordemAtualizada).unwrap();
    } catch (error) {
      console.error('Erro ao reordenar tarefas:', error);
    }
  };

  const status = () => {
    if (isLoading) {
      return <Loader size={20} color='#fff'/>
    }
    if (atualizando) {
      return <Loader size={20} color='#fff'/>
    }
    if (editandoTarefa) {
      return 'Atualizar'
    } else {
      return 'Adicionar'
    }
  };

  const formatCusto = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    if (!numericValue) return '';
    const formattedValue = (parseFloat(numericValue) / 100).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return formattedValue;
  };

  const handleCustoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formattedValue = formatCusto(rawValue);
    setCusto(formattedValue ? parseFloat(rawValue.replace(/\D/g, '')) / 100 : null);
    form.setFieldValue('custo', formattedValue); // Atualiza o estado do Formik
  };

  return (
    <React.Fragment>

      <S.ToggleButton isSidebarVisible={isSidebarVisible} onClick={() => setIsSidebarVisible(!isSidebarVisible)}>
        {isSidebarVisible ? (<S.BoxSetaClose><img src={setaLeft} alt='close' /></S.BoxSetaClose>) : (<S.BoxSetaOpen><img src={setaRight} alt='open' /></S.BoxSetaOpen>)}
      </S.ToggleButton>

      <S.Sidebar className={isSidebarVisible ? 'visible' : 'hidden'}>

        <S.TaskForm onSubmit={form.handleSubmit}>

          <S.Heading>{editandoTarefa ? 'Editar Tarefa' : 'Adicionar tarefa'}<img src={close} alt='Adicionar tarefa' onClick={() => setIsSidebarVisible(!isSidebarVisible)} /></S.Heading>

          <input type="text" placeholder="Digite o nome da tarefa" id="nome" name="nome" value={form.values.nome} onChange={form.handleChange} onBlur={form.handleBlur} className={checkInputHasError('nome') ? 'error' : ''} />
          {form.touched.nome && form.errors.nome && <S.Error>{form.errors.nome}</S.Error>}

          <input type="text" placeholder="Digite uma descrição (Opcional)" id="descricao" name="descricao" value={form.values.descricao} onChange={form.handleChange} onBlur={form.handleBlur} className={checkInputHasError('descricao') ? 'error' : ''} />
          {form.touched.descricao && form.errors.descricao && <S.Error>{form.errors.descricao}</S.Error>}

          <input type="text" placeholder="Digite o custo" value={form.values.custo} onChange={handleCustoChange} onBlur={form.handleBlur} className={checkInputHasError('custo') ? 'error' : ''} />
          {form.touched.custo && form.errors.custo && <S.Error>{form.errors.custo}</S.Error>}

          <InputMask mask="99/99/9999" type="text" placeholder="Digite a data limite" id="dataLimite" name="dataLimite" value={form.values.dataLimite} onChange={form.handleChange} onBlur={form.handleBlur} className={checkInputHasError('dataLimite') ? 'error' : ''} />
          {form.touched.dataLimite && form.errors.dataLimite && <S.Error>{form.errors.dataLimite}</S.Error>}

          <S.Button type="submit">{status()}</S.Button>
          {editandoTarefa && (<S.Button onClick={() => { form.resetForm(); setEditandoTarefa(null) }}>Cancelar</S.Button>)}
        </S.TaskForm>

        <S.Warning>
          {erroAoAtualizar && <p>Já existe uma tarefa com esse nome!</p>}
          {erroAoSalvar && <p>Já existe uma tarefa com esse nome!</p>}
        </S.Warning>

        <div>
          <GitHub link='https://github.com/LucasB0mfim/TASKFLOW_FRONTEND' destiny='frontend' />
          <GitHub link='https://github.com/LucasB0mfim/TASKFLOW_BACKEND' destiny='backend' margin='2%' />
        </div>
      </S.Sidebar>

      <S.Content isSidebarVisible={isSidebarVisible}>
        {localTarefas.length > 0 ? (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="tasks" type="list" direction="horizontal">
              {(provided) => (
                <ul ref={provided.innerRef} {...provided.droppableProps}>
                  {localTarefas.map((tarefa, index) => (
                    <React.Fragment key={tarefa.id}>
                      <li key={tarefa.id}>
                        <Card
                          taskId={tarefa.id.toString()}
                          taskName={tarefa.nome}
                          cost={tarefa.custo}
                          description={tarefa.descricao}
                          dueDate={tarefa.dataLimite}
                          index={index}
                          onClickEdit={() => { handleEdit(tarefa); setIsSidebarVisible(true); } }
                          onClickClose={() => setTarefaParaExcluir(tarefa)}
                          onClickLeft={() => handleReorder(index, 'left')}
                          onClickRight={() => handleReorder(index, 'right')}
                          onClickCheck={() => handleCheck(tarefa)}
                          status={tarefa.status}
                        />
                      </li>
                      {tarefaParaExcluir && (
                        <>
                          <S.Overlay onClick={() => setTarefaParaExcluir(null)} />
                          <S.ConfirmDelet>
                            <S.TextDelet>
                              <h2>Excluir Tarefa</h2>
                              <p>Você tem certeza que deseja excluir a tarefa <b>{tarefaParaExcluir.nome}</b>?</p>
                            </S.TextDelet>
                            <S.ButtonsDelet>
                              <button onClick={() => setTarefaParaExcluir(null)}>Cancelar</button>
                              <button onClick={handleDeleteConfirm}>{excluindo ? <Loader size={11} color='#000'/> : 'Excluir'}</button>
                            </S.ButtonsDelet>
                          </S.ConfirmDelet>
                        </>
                      )}
                    </React.Fragment>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <>
            {carregando ?
              (
                <S.EmptyState>
                  <Loader size={30} color='#fff' />
                  <S.Warning>Estamos iniciando o servidor! Aguarde...</S.Warning>
                </S.EmptyState>
              ) :
              (
                <S.EmptyState>
                  <img src={ilustration} alt="Ilustração" />
                  <p>Você ainda não adicionou nenhuma tarefa.</p>
                </S.EmptyState>
              )
            }
          </>
        )}
        <S.AddTaskMobile onClick={() => setIsSidebarVisible(!isSidebarVisible)}><img src={more} alt='Adicionar tarefa' /></S.AddTaskMobile>
        <Footer />
      </S.Content>
    </React.Fragment>
  );
};

export default Dashboard;

import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import InputMask from 'react-input-mask';
import { useEffect, useState } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd'

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

import more from '../../assets/images/moreIcon.png';
import close from '../../assets/images/closeIcon.png';
import gitHub from '../../assets/images/gitHubIcon.png';
import setaLeft from '../../assets/images/seta-esquerda.png';
import setaRight from '../../assets/images/seta-direita.png';
import ilustration from '../../assets/images/ilustration.png';

import * as S from './styles';

const Dashboard = () => {
  const { data: tarefas, refetch, isLoading: carregando } = useBuscarTarefasQuery();
  const [salvarTarefa, { isLoading, error: erroAoSalvar }] = useSalvarTarefaMutation();
  const [excluirTarefa, { isLoading: excluindo }] = useExcluirTarefaMutation();
  const [atualizarTarefa, { isLoading: atualizando, error: erroAoAtualizar }] = useAtualizarTarefaMutation();
  const [reordenarTarefas] = useReordenarTarefasMutation();
  const [editandoTarefa, setEditandoTarefa] = useState<number | null>(null);
  const [localTarefas, setLocalTarefas] = useState<Tarefa[]>(tarefas || []);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [tarefaParaExcluir, setTarefaParaExcluir] = useState<Tarefa | null>(null);

  const form = useFormik({
    initialValues: {
      id: 0,
      nome: '',
      custo: '',
      dataLimite: '',
    },
    validationSchema: yup.object({
      nome: yup.string().max(100, 'Você excedeu o limite de 100 caracteres.').required('O nome é obrigatório.'),
      custo: yup.number().min(0, 'Valor inválido.').required('O custo é obrigatório.'),
      dataLimite: yup.string().min(0, 'Digite uma data válida.').required('A data limite é obrigatória.'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        if (editandoTarefa) {
          await atualizarTarefa({
            tarefaId: editandoTarefa,
            tarefa: { ...values, id: editandoTarefa },
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

  function reorder<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  }

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

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    setIsSidebarVisible(!isMobile);
  }, []);

  const checkInputHasError = (fieldName: string) => {
    const isTouched = fieldName in form.touched;
    const isInvalid = fieldName in form.errors;
    return isTouched && isInvalid;
  };

  const handleEdit = (tarefa: Tarefa) => {
    setEditandoTarefa(tarefa.id);
    form.setValues({
      id: tarefa.id,
      nome: tarefa.nome,
      custo: tarefa.custo,
      dataLimite: tarefa.dataLimite,
    });
  };

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

          <input type="text" placeholder="Digite o custo" id="custo" name="custo" value={form.values.custo} onChange={form.handleChange} onBlur={form.handleBlur} className={checkInputHasError('custo') ? 'error' : ''} />
          {form.touched.custo && form.errors.custo && <S.Error>{form.errors.custo}</S.Error>}

          <InputMask mask="99/99/9999" type="text" placeholder="Digite a data limite" id="dataLimite" name="dataLimite" value={form.values.dataLimite} onChange={form.handleChange} onBlur={form.handleBlur} className={checkInputHasError('dataLimite') ? 'error' : ''} />
          {form.touched.dataLimite && form.errors.dataLimite && <S.Error>{form.errors.dataLimite}</S.Error>}

          <S.Button type="submit">{editandoTarefa ? 'Atualizar' : 'Adicionar'}</S.Button>
          {editandoTarefa && (<S.Button onClick={() => { form.resetForm(); setEditandoTarefa(null) }}>Cancelar</S.Button>)}
        </S.TaskForm>

        {isLoading && <div><Loader size={30}/><S.Warning>Carregando...</S.Warning></div>}
        {atualizando && <div><Loader size={30}/><S.Warning>Carregando...</S.Warning></div>}
        {carregando && <div><Loader size={30}/><S.Warning>Estamos iniciando o servidor! Aguarde...</S.Warning></div>}
        {erroAoAtualizar && <S.Warning>Já existe uma tarefa com esse nome!</S.Warning>}
        {erroAoSalvar && <S.Warning>Já existe uma tarefa com esse nome!</S.Warning>}

        <S.GitHub>
          <a href="https://github.com/LucasB0mfim/TASKFLOW_FRONTEND" target='_blank' rel="noreferrer"><img src={gitHub} alt='Código Backend' />Ver código frontend</a>
          <a href="https://github.com/LucasB0mfim/TASKFLOW_BACKEND" target='_blank' style={{ marginTop: '2%' }} rel="noreferrer"><img src={gitHub} alt='Código Frontend' />Ver código backend</a>
        </S.GitHub>
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
                          dueDate={tarefa.dataLimite}
                          index={index}
                          onClickEdit={() => { handleEdit(tarefa); setIsSidebarVisible(true) }}
                          onClickClose={() => setTarefaParaExcluir(tarefa)}
                          onClickLeft={() => handleReorder(index, 'left')}
                          onClickRight={() => handleReorder(index, 'right')}
                        />
                      </li>
                      {tarefaParaExcluir && (
                        <>
                          <S.Overlay onClick={() => setTarefaParaExcluir(null)} />
                          <S.ConfirmDelet>
                            <p>Você tem certeza que deseja excluir a tarefa <b>{tarefaParaExcluir.nome}</b>?</p>
                            <div>
                              <button onClick={() => setTarefaParaExcluir(null)}>Cancelar</button>
                              <button onClick={handleDeleteConfirm}>{excluindo ? <Loader size={11} /> : 'Excluir'}</button>
                            </div>
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
          <S.EmptyState>
            <img src={ilustration} alt="Ilustração" />
            <p>Você ainda não adicionou nenhuma tarefa.</p>
          </S.EmptyState>
        )}
        <S.AddTaskMobile onClick={() => setIsSidebarVisible(!isSidebarVisible)}><img src={more} alt='Adicionar tarefa' /></S.AddTaskMobile>
        <Footer />
      </S.Content>
    </React.Fragment>
  );
};

export default Dashboard;

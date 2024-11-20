import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import InputMask from 'react-input-mask';

import {
  Tarefa,
  useBuscarTarefasQuery,
  useSalvarTarefaMutation,
  useExcluirTarefaMutation,
  useAtualizarTarefaMutation,
  useReordenarTarefasMutation,
} from '../../service/api';

import Card from '../../components/Card';

import setaLeft from '../../assets/images/seta-esquerda.png';
import setaRight from '../../assets/images/seta-direita.png';
import ilustration from '../../assets/images/ilustration.png';
import gitHub from '../../assets/images/gitHubIcon.png';

import * as S from './styles';

const Dashboard = () => {
  const { data: tarefas, refetch } = useBuscarTarefasQuery();
  const [salvarTarefa] = useSalvarTarefaMutation();
  const [excluirTarefa] = useExcluirTarefaMutation();
  const [atualizarTarefa] = useAtualizarTarefaMutation();
  const [reordenarTarefas] = useReordenarTarefasMutation();
  const [editandoTarefa, setEditandoTarefa] = useState<number | null>(null);
  const [localTarefas, setLocalTarefas] = useState<Tarefa[]>(tarefas || []);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  // Atualiza as tarefas locais sempre que o backend retorna novas tarefas
  useEffect(() => {
    setLocalTarefas(tarefas || []);
  }, [tarefas]);

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
      } catch (error) {
        console.error('Erro ao salvar/atualizar tarefa:', error);
      }
    },
  });

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

  const handleDelete = async (id: number) => {
    try {
      await excluirTarefa(id).unwrap();
      refetch();
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
    }
  };

  const handleReorder = async (index: number, direction: 'up' | 'down') => {
    const updatedTarefas = [...localTarefas];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;

    // Verifica se a troca está dentro dos limites
    if (swapIndex < 0 || swapIndex >= updatedTarefas.length) return;

    // Troca os itens
    [updatedTarefas[index], updatedTarefas[swapIndex]] = [updatedTarefas[swapIndex], updatedTarefas[index]];
    setLocalTarefas(updatedTarefas);

    // Prepara os dados com apenas `id` e `ordem` para envio
    const ordemAtualizada = updatedTarefas.map((tarefa, ordem) => ({
      id: tarefa.id,
      ordem, // Índice atualizado da tarefa
    }));

    // Atualiza no backend
    try {
      await reordenarTarefas(ordemAtualizada).unwrap(); // Envia apenas os dados esperados
    } catch (error) {
      console.error('Erro ao reordenar tarefas:', error);
    }
  };

  return (
    <>
      <S.ToggleButton isSidebarVisible={isSidebarVisible} onClick={() => setIsSidebarVisible(!isSidebarVisible)}>
        {isSidebarVisible ? (<img src={setaLeft} />) : (<img src={setaRight} />)}
      </S.ToggleButton>

      <S.Sidebar className={isSidebarVisible ? 'visible' : 'hidden'} >
        <S.TaskForm onSubmit={form.handleSubmit}>

        <S.Heading>{editandoTarefa ? 'Editar Tarefa' : 'Adicionar tarefa'}</S.Heading>
          <input type="text" placeholder="Digite o nome da tarefa" id="nome" name="nome" value={form.values.nome} onChange={form.handleChange} onBlur={form.handleBlur} className={checkInputHasError('nome') ? 'error' : ''} />
          {form.touched.nome && form.errors.nome && <S.Error>{form.errors.nome}</S.Error>}

          <input type="text" placeholder="Digite o custo" id="custo" name="custo" value={form.values.custo} onChange={form.handleChange} onBlur={form.handleBlur} className={checkInputHasError('custo') ? 'error' : ''} />
          {form.touched.custo && form.errors.custo && <S.Error>{form.errors.custo}</S.Error>}

          <InputMask mask="99/99/9999" type="text" placeholder="Digite a data limite" id="dataLimite" name="dataLimite" value={form.values.dataLimite} onChange={form.handleChange} onBlur={form.handleBlur} className={checkInputHasError('dataLimite') ? 'error' : ''} />
          {form.touched.dataLimite && form.errors.dataLimite && <S.Error>{form.errors.dataLimite}</S.Error>}

          <S.Button type="submit">{editandoTarefa ? 'Atualizar' : 'Adicionar'}</S.Button>
          {editandoTarefa && (<S.Button onClick={() => { form.resetForm(); setEditandoTarefa(null) }}>Cancelar</S.Button>)}
        </S.TaskForm>

        <S.GitHub>
          <a href="https://github.com/LucasB0mfim/TASKFLOW_FRONTEND" target='_blank' rel="noreferrer"><img src={gitHub} alt='Código Backend' />Ver código frontend</a>
          <a href="https://github.com/LucasB0mfim/TASKFLOW_BACKEND" target='_blank' style={{marginTop: '2%'}} rel="noreferrer"><img src={gitHub} alt='Código Frontend' />Ver código backend</a>
        </S.GitHub>
      </S.Sidebar>

      <S.Content isSidebarVisible={isSidebarVisible} >
        {localTarefas.length > 0 ? (
          <ul>
            {localTarefas.map((tarefa, index) => (
              <li key={tarefa.id}>
                <Card
                  taskName={tarefa.nome}
                  cost={tarefa.custo}
                  dueDate={tarefa.dataLimite}
                  onClickEdit={() => {handleEdit(tarefa); setIsSidebarVisible(true)}}
                  onClickClose={() => handleDelete(tarefa.id)}
                  onClickUp={() => handleReorder(index, 'up')}
                  onClickDown={() => handleReorder(index, 'down')}
                />
              </li>
            ))}
          </ul>
        ) : (
          <S.EmptyState>
            <img src={ilustration} alt="Ilustração" />
            <p>Você ainda não adicionou nenhuma tarefa.</p>
          </S.EmptyState>
        )}
      </S.Content>
    </>
  );
};

export default Dashboard;

import * as yup from 'yup';
import { useState } from 'react';
import { useFormik } from 'formik';
import InputMask from 'react-input-mask';

import {
  Tarefa,
  useBuscarTarefasQuery,
  useSalvarTarefaMutation,
  useExcluirTarefaMutation,
  useAtualizarTarefaMutation,
} from '../../service/api';

import Card from '../../components/Card';
import Button from '../../components/Button';

import ilustration from '../../assets/images/ilustration.png';

import * as S from './styles'

const Dashboard = () => {
  // Busca as tarefas da api
  const { data, refetch } = useBuscarTarefasQuery();

  // Adiciona uma nova tarefa na api
  const [salvarTarefa] = useSalvarTarefaMutation();

  // Exclui uma tarefa da api
  const [excluirTarefa] = useExcluirTarefaMutation();

  // Atualiza alguma tarefa da api
  const [atualizarTarefa] = useAtualizarTarefaMutation();

  // Armazena o id da tarefa que o usuário deseja editar
  const [editandoTarefa, setEditandoTarefa] = useState<number | null>(null);

  // Utiliza as dependencias formik e yup para fazer a validação dos campos
  const form = useFormik({
    initialValues: {
      id: 0,
      nome: '',
      custo: '',
      dataLimite: '',
    },
    validationSchema: yup.object({
      nome: yup.string().min(0, 'Digite algum valor.').max(100, 'Você excedeu o limite de 100 caracteres').required('O nome é obrigatório.'),
      custo: yup.number().min(0, 'Valor inválido').max(1000000, 'Valor inválido').required('O custo é obrigatório.'),
      dataLimite: yup.string().required('A data limite é obrigatória.')
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
        refetch(); // Atualiza a lista de tarefas
        resetForm(); // Limpa o formulário
        setEditandoTarefa(null);
      } catch (error) {
        console.error('Erro ao salvar/atualizar tarefa:', error);
      }
    },
  });

  const checkInputHasError = (fieldName: string) => {
    const isTouched = fieldName in form.touched
    const isInvalid = fieldName in form.errors
    const hasError = isTouched && isInvalid
    return hasError
  }

  const handleEditar = (tarefa: Tarefa) => {
    setEditandoTarefa(tarefa.id);
    form.setValues({
      id: tarefa.id,
      nome: tarefa.nome,
      custo: tarefa.custo,
      dataLimite: tarefa.dataLimite
    });
  };

  const handleExcluir = async (id: number) => {
    try {
      await excluirTarefa(id).unwrap();
      console.log(`Tarefa de id: ${id} excluída!`);
      refetch();
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
    }
  };

  return (
    <>
      <S.Aside>
        <S.Title>{editandoTarefa ? 'Editar Tarefa' : 'Adicionar Tarefa'}</S.Title>
        <S.Form onSubmit={form.handleSubmit}>
          <input type="text" placeholder="Digite o nome da tarefa" id="nome" name="nome" value={form.values.nome} onChange={form.handleChange} onBlur={form.handleBlur} className={checkInputHasError('nome') ? 'error' : ''} />
          {form.touched.nome && form.errors.nome && <S.Error>{form.errors.nome}</S.Error>}

          <input type="text" placeholder="Digite o custo" id="custo" name="custo" value={form.values.custo} onChange={form.handleChange} onBlur={form.handleBlur} className={checkInputHasError('custo') ? 'error' : ''} />
          {form.touched.custo && form.errors.custo && <S.Error>{form.errors.custo}</S.Error>}

          <InputMask mask='99/99/9999' type="text" placeholder="Digite a data limite" id="dataLimite" name="dataLimite" value={form.values.dataLimite} onChange={form.handleChange} onBlur={form.handleBlur} className={checkInputHasError('dataLimite') ? 'error' : ''} />
          {form.touched.dataLimite && form.errors.dataLimite && <S.Error>{form.errors.dataLimite}</S.Error>}

          <S.Button type="submit">{editandoTarefa ? 'Atualizar' : 'Adicionar'}</S.Button>

          {editandoTarefa && (
            <S.Button onClick={() => { form.resetForm(); setEditandoTarefa(null) }} >Cancelar</S.Button>
          )}
        </S.Form>
      </S.Aside>
      <S.Main>
        {Array.isArray(data) && data.length > 0 ? (
          <ul>
            {data.map((tarefa) => (
              <li key={tarefa.id}>
                <Card nomeTarefa={tarefa.nome} custo={tarefa.custo} dataLimite={tarefa.dataLimite} />
                <Button background={'#7c8ece'} title={'Editar'} onClick={() => handleEditar(tarefa)} />
                <Button background={'#ce7c7c'} margin={'0% 1%'} title={'Excluir'} onClick={() => handleExcluir(tarefa.id)} />
              </li>
            ))}
          </ul>
        ) : (
          <S.Ilustration>
            <img src={ilustration} alt='Ilustração' />
            <p>Você ainda não adicionou nenhuma tarefa.</p>
          </S.Ilustration>
        )}
      </S.Main>
    </>
  );
};

export default Dashboard;

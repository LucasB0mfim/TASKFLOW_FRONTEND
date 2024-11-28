// Dependências externas:
import React from 'react'; // Biblioteca principal para componentes React.
import * as yup from 'yup'; // Validação de schemas.
import { useFormik } from 'formik'; // Gerenciamento de formulários.
import InputMask from 'react-input-mask'; // Máscara de entrada de dados.
import { useEffect, useState } from 'react'; // Hooks para ciclos de vida e estados.
import { DragDropContext, Droppable } from '@hello-pangea/dnd' // Biblioteca para funcionalidade de arrastar e soltar.

// Importação de componentes personalizados:
import {
  Tarefa,
  useBuscarTarefasQuery,
  useSalvarTarefaMutation,
  useExcluirTarefaMutation,
  useAtualizarTarefaMutation,
  useReordenarTarefasMutation,
} from '../../service/api'; // Hooks e tipos da API para operações CRUD.
import Card from '../../components/Card'; // Componente de exibição de tarefas.
import Loader from '../../components/Loader'; // Indicador de carregamento.
import Footer from '../../components/Footer'; // Rodapé da página.
import GitHub from '../../components/GitHub'; // Link para repositórios no GitHub.

// Importação de imagens:
import more from '../../assets/images/moreIcon.png';
import close from '../../assets/images/closeIcon.png';
import setaLeft from '../../assets/images/seta-esquerda.png';
import setaRight from '../../assets/images/seta-direita.png';
import ilustration from '../../assets/images/ilustration.png';

// Importação de estilos:
import * as S from './styles';

const Dashboard = () => {

  // Gerenciamento de estado para tarefas e interações com a API:
  const [reordenarTarefas] = useReordenarTarefasMutation();
  const [excluirTarefa, { isLoading: excluindo }] = useExcluirTarefaMutation();
  const { data: tarefas, refetch, isLoading: carregando } = useBuscarTarefasQuery();
  const [salvarTarefa, { isLoading, error: erroAoSalvar }] = useSalvarTarefaMutation();
  const [atualizarTarefa, { isLoading: atualizando, error: erroAoAtualizar }] = useAtualizarTarefaMutation();

  // Estados internos para controle do comportamento da interface:
  const [custo, setCusto] = useState<number | null>(null); // Armazena o custo formatado.
  const [isSidebarVisible, setIsSidebarVisible] = useState(true); // Controle da visibilidade da barra lateral.
  const [editandoTarefa, setEditandoTarefa] = useState<number | null>(null); // Identifica a tarefa em edição.
  const [localTarefas, setLocalTarefas] = useState<Tarefa[]>(tarefas || []); // Lista local de tarefas para exibição.
  const [tarefaParaExcluir, setTarefaParaExcluir] = useState<Tarefa | null>(null); // Armazena a tarefa marcada para exclusão.

  // Configuração do formulário com validação via Formik e Yup:
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
      custo: yup.string().min(0, 'Valor inválido.').required('O custo é obrigatório.'),
      dataLimite: yup.string().min(0, 'Digite uma data válida.').required('A data limite é obrigatória.'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        if (editandoTarefa) {
          // Atualiza a tarefa existente.
          const tarefaAtual = localTarefas.find((t) => t.id === editandoTarefa);

          if (!tarefaAtual) {
            throw new Error('Tarefa não encontrada na lista local.');
          }

          await atualizarTarefa({
            tarefaId: editandoTarefa,
            tarefa: { ...values, id: editandoTarefa, ordem: tarefaAtual.ordem },
          }).unwrap();

        } else {
          // Salva uma nova tarefa.
          await salvarTarefa(values).unwrap();
        }
        // Atualiza a lista de tarefas e reseta o formulário.
        refetch();
        resetForm();
        setEditandoTarefa(null);
        // Fecha a barra lateral em dispositivos móveis.
        if (window.innerWidth <= 500) {
          setIsSidebarVisible(!isSidebarVisible);
        }
      } catch (error) {
        console.error('Erro ao salvar/atualizar tarefa:', error);
      }
    },
  });

  // Reordenação de itens na lista local.
  function reorder<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  }

  // Evento chamado ao finalizar o arrasto de um item.
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

  // Atualiza tarefas locais sempre que os dados remotos mudam.
  useEffect(() => {
    setLocalTarefas(tarefas || []);
  }, [tarefas]);

  // Define a visibilidade da barra lateral com base no tamanho da janela.
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    setIsSidebarVisible(!isMobile);
  }, []);

  // Verifica erros no formulário.
  const checkInputHasError = (fieldName: string) => {
    const isTouched = fieldName in form.touched;
    const isInvalid = fieldName in form.errors;
    return isTouched && isInvalid;
  };

  // Manipula a edição de uma tarefa existente.
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

  // Confirma a exclusão de uma tarefa.
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

  // Alterna o status da tarefa entre 'Aberto' e 'Concluido'.
  const handleCheck = async (tarefa: Tarefa) => {
    try {
      const novoStatus = tarefa.status === 'Concluido' ? 'Aberto' : 'Concluido';

      await atualizarTarefa({
        tarefaId: tarefa.id,
        tarefa: { ...tarefa, status: novoStatus },
      }).unwrap();

      refetch();
    } catch (error) {
      console.error('Erro ao atualizar status da tarefa:', error);
    }
  };


  // Reorganiza tarefas com os botões de seta.
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

  // Define o rótulo do botão principal (salvar ou atualizar).
  const status = () => {
    if (isLoading) {
      return <Loader size={15} color='#fff'/>
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

  // Formata o custo para exibição amigável, sem milhar e com ponto como separador decimal.
  const formatCusto = (value: string) => {
    // Remove todos os caracteres não numéricos (exceto para o ponto)
    const numericValue = value.replace(/\D/g, '');
    if (!numericValue) return '';

    // Divide o valor por 100 para transformar centavos em reais e usa toFixed para garantir 2 casas decimais
    const formattedValue = (parseFloat(numericValue) / 100).toFixed(2);
    return formattedValue; // Exibe no formato desejado: 1000.00
  };


  // Atualiza o estado do custo no formulário.
  const handleCustoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;

    // Formata o valor para exibição sem milhar e com ponto como separador decimal
    const formattedValue = formatCusto(rawValue);

    // Remove os caracteres não numéricos do valor inserido para cálculos
    setCusto(formattedValue ? parseFloat(rawValue.replace(/\D/g, '')) / 100 : null);

    // Atualiza o estado do Formik com o valor formatado
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
                              <button onClick={handleDeleteConfirm}>{excluindo ? <Loader size={12} color='#000'/> : 'Excluir'}</button>
                              <button onClick={() => setTarefaParaExcluir(null)}>Cancelar</button>
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

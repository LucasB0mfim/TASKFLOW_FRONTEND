// Importação de dependências para configurar e gerenciar a API.
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Representa os dados de uma tarefa.
export type Tarefa = {
  id: number;
  nome: string;
  descricao: string;
  custo: string;
  dataLimite: string;
  ordem: number;
  status: string;
};

// Usado para reordenar as tarefas.
export type TarefaOrdemDTO = {
  id: number;
  ordem: number;
};

// Configuração dos endpoints da API.
const api = createApi({

  // URL base da API.
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://taskflow-backend-zs9i.onrender.com/api',
  }),

  endpoints: (builder) => ({
    // Endpoint para listar todas as tarefas.
    buscarTarefas: builder.query<Tarefa[], void>({
      query: () => 'tarefas',
    }),

    // Endpoint para salvar uma nova tarefa.
    salvarTarefa: builder.mutation<Tarefa, Partial<Tarefa>>({
      query: (novaTarefa) => ({
        url: 'tarefas',
        method: 'POST',
        body: novaTarefa,
      }),
    }),

    // Endpoint para atualizar uma tarefa existente.
    atualizarTarefa: builder.mutation<Tarefa, { tarefaId: number; tarefa: Tarefa }>({
      query: ({ tarefaId, tarefa }) => ({
        url: `tarefas/${tarefaId}`,
        method: 'PUT',
        body: tarefa,
      }),
    }),

    // Endpoint para excluir uma tarefa.
    excluirTarefa: builder.mutation<void, number>({
      query: (tarefaId) => ({
        url: `tarefas/${tarefaId}`,
        method: 'DELETE',
      }),
    }),

    // Endpoint para reordenar as tarefas.
    reordenarTarefas: builder.mutation<void, TarefaOrdemDTO[]>({
      query: (tarefas) => ({
        url: 'tarefas/reordenar',
        method: 'PUT',
        body: tarefas,
      }),
    }),
  }),
});

export const {
  useBuscarTarefasQuery,
  useSalvarTarefaMutation,
  useExcluirTarefaMutation,
  useAtualizarTarefaMutation,
  useReordenarTarefasMutation,
} = api;

export default api;

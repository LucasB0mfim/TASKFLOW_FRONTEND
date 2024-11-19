import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type Tarefa = {
  id: number;
  nome: string;
  custo: string;
  dataLimite: string;
}

export type TarefaOrdemDTO = {
  id: number;
  ordem: number;
};

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api'
  }),
  endpoints: (builder) => ({
    buscarTarefas: builder.query<Tarefa[], void>({
      query: () => 'tarefas'
    }),
    salvarTarefa: builder.mutation<Tarefa, Partial<Tarefa>>({
      query: (novaTarefa) => ({
        url: 'tarefas',
        method: 'POST',
        body: novaTarefa
      })
    }),
    atualizarTarefa: builder.mutation<Tarefa, { tarefaId: number; tarefa: Tarefa }>({
      query: ({ tarefaId, tarefa }) => ({
        url: `tarefas/${tarefaId}`,
        method: 'PUT',
        body: tarefa,
      })
    }),
    excluirTarefa: builder.mutation<void, number>({
      query: (tarefaId) => ({
        url: `tarefas/${tarefaId}`,
        method: 'DELETE',
      })
    }),
    reordenarTarefas: builder.mutation<void, TarefaOrdemDTO[]>({
      query: (tarefas) => ({
        url: 'tarefas/reordenar',
        method: 'PUT',
        body: tarefas,
      }),
    }),
  })
})

export const {
  useBuscarTarefasQuery,
  useSalvarTarefaMutation,
  useExcluirTarefaMutation,
  useAtualizarTarefaMutation,
  useReordenarTarefasMutation
  } = api
export default api

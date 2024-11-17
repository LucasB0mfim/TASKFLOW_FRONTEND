import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type Tarefa = {
  id: number;
  nome: string;
  custo: string;
  dataLimite: string;
  ordem: string;
}

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
    })
  })
})

export const { useBuscarTarefasQuery, useSalvarTarefaMutation, useExcluirTarefaMutation, useAtualizarTarefaMutation } = api
export default api

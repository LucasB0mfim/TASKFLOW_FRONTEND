// Importação da função para configurar o estado global (store) do Redux.
import { configureStore } from '@reduxjs/toolkit';

// Importação da API configurada, que gerencia os endpoints e dados relacionados.
import api from '../service/api';

// Configuração da store do Redux.
export const store = configureStore({

  // Registro do reducer gerado automaticamente pela API.
  reducer: { [api.reducerPath]: api.reducer },

  // Adiciona o middleware gerado pela API à configuração padrão do Redux Toolkit.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// representa o estado global completo da aplicação.
export type RootReducer = ReturnType<typeof store.getState>;

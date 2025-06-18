import { createContext, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const TarefasContext = createContext();

const initialState = {
  tarefas: [], // Lista de objetos de tarefas { id, texto, concluida }
  filtro: 'Todas', // Opções: 'Todas', 'Concluidas', 'Pendentes'
};

function tarefasReducer(state, action) {
  switch (action.type) {
    case 'ADICIONAR_TAREFA':
      // Retorna um novo estado, adicionando uma nova tarefa à lista existente
      // Usamos uuidv4() para gerar um ID único e mais robusto
      return {
        ...state,
        tarefas: [
          ...state.tarefas,
          { id: uuidv4(), texto: action.payload, concluida: false },
        ],
      };
    case 'TOGGLE_TAREFA':
      // Retorna um novo estado, mapeando as tarefas para encontrar a que corresponde ao ID
      // e alternando seu status 'concluida'
      return {
        ...state,
        tarefas: state.tarefas.map((tarefa) =>
          tarefa.id === action.payload
            ? { ...tarefa, concluida: !tarefa.concluida } // Alterna o estado de concluída
            : tarefa // Mantém as outras tarefas inalteradas
        ),
      };
    case 'SET_FILTRO':
      // Retorna um novo estado, atualizando o filtro de exibição das tarefas
      return {
        ...state,
        filtro: action.payload,
      };
    default:
      // Para qualquer ação não reconhecida, retorna o estado atual sem modificações
      return state;
  }
}

export const TarefasProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tarefasReducer, initialState);

  return (
    <TarefasContext.Provider value={{ state, dispatch }}>
      {children} {/* 'children' representa os componentes que o TarefasProvider irá envolver */}
    </TarefasContext.Provider>
  );
};
import { useContext, useState } from 'react'; 
import { TarefasContext } from '../context/TarefasContext'; 
import Tarefa from './Tarefas'; 

function ListaTarefas() {
  const { state, dispatch } = useContext(TarefasContext);
  const [novaTarefaTexto, setNovaTarefaTexto] = useState('');

  // Função para filtrar as tarefas com base no filtro atual do estado global
  const tarefasFiltradas = state.tarefas.filter((tarefa) => {
    if (state.filtro === 'Concluidas') {
      return tarefa.concluida;
    }
    if (state.filtro === 'Pendentes') {
      return !tarefa.concluida;
    }
    return true; // Se o filtro for 'Todas', retorna todas as tarefas
  });

  // Função para lidar com a adição de uma nova tarefa
  const handleAdicionarTarefa = (e) => {
    e.preventDefault();
    if (novaTarefaTexto.trim() !== '') {
      // Dispara uma ação 'ADICIONAR_TAREFA' com o texto da nova tarefa
      dispatch({ type: 'ADICIONAR_TAREFA', payload: novaTarefaTexto });
      setNovaTarefaTexto(''); // Limpa o input após adicionar a tarefa
    }
  };

  return (
    <div className="lista-tarefas-container">
      {/* Formulário para adicionar novas tarefas */}
      <form onSubmit={handleAdicionarTarefa} className="adicionar-tarefa-form">
        <input
          type="text"
          value={novaTarefaTexto}
          onChange={(e) => setNovaTarefaTexto(e.target.value)} // Atualiza o estado local do input
          placeholder="Adicionar nova tarefa..."
          aria-label="Nova tarefa"
        />
        <button type="submit">Adicionar</button>
      </form>

      {/* Botões para filtrar as tarefas */}
      <div className="filtros-tarefas">
        <button
          onClick={() => dispatch({ type: 'SET_FILTRO', payload: 'Todas' })}
          className={state.filtro === 'Todas' ? 'active-filter' : ''}
        >
          Todas
        </button>
        <button
          onClick={() => dispatch({ type: 'SET_FILTRO', payload: 'Concluidas' })}
          className={state.filtro === 'Concluidas' ? 'active-filter' : ''}
        >
          Concluídas
        </button>
        <button
          onClick={() => dispatch({ type: 'SET_FILTRO', payload: 'Pendentes' })}
          className={state.filtro === 'Pendentes' ? 'active-filter' : ''}
        >
          Pendentes
        </button>
      </div>

      {/* Lista de tarefas filtradas */}
      <div className="lista-tarefas">
        {tarefasFiltradas.length > 0 ? (
          tarefasFiltradas.map((tarefa) => (
            <Tarefa key={tarefa.id} tarefa={tarefa} />
          ))
        ) : (
          <p className="no-tasks-message">Nenhuma tarefa para exibir neste filtro.</p>
        )}
      </div>
    </div>
  );
}

export default ListaTarefas;
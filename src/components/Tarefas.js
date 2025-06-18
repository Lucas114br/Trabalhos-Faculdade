import { useContext } from 'react';
import { TarefasContext } from '../context/TarefasContext'; 

function Tarefa({ tarefa }) {
  const { dispatch } = useContext(TarefasContext);

  // Função para lidar com a alternância do status de conclusão da tarefa
  const handleToggle = () => {
    // Dispara uma ação 'TOGGLE_TAREFA' com o ID da tarefa
    dispatch({ type: 'TOGGLE_TAREFA', payload: tarefa.id });
  };

  return (
    <div className="tarefa-item"> {/* Adicionado um className para estilização */}
      <input
        type="checkbox"
        checked={tarefa.concluida} // Estado do checkbox reflete o status 'concluida' da tarefa
        onChange={handleToggle} // Chama handleToggle quando o checkbox é clicado
      />
      <span
        style={{ textDecoration: tarefa.concluida ? 'line-through' : 'none' }}
      >
        {tarefa.texto}
      </span>
    </div>
  );
}

export default Tarefa;
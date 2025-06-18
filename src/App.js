import { TarefasProvider } from './context/TarefasContext';
import ListaTarefas from './components/ListaTarefas'; 
import './App.css';

function App() {
  return (
    <TarefasProvider>
      <div className="App">
        <h1>Organizador de Tarefas</h1> {/* Título do app */}
        {/* O componente ListaTarefas conterá o input para adicionar, os botões de filtro e a lista de tarefas */}
        <ListaTarefas />
      </div>
    </TarefasProvider>
  );
}

export default App;
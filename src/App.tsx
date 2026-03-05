import { Scene } from './components/Scene';
import { UI } from './components/UI';

function App() {
  return (
    <div className="w-full h-screen bg-slate-900 overflow-hidden">
      <UI />
      <div className="absolute inset-0 z-0">
        <Scene />
      </div>
    </div>
  );
}

export default App;

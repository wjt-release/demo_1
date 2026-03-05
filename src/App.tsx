import { QRCodeGenerator } from './components/QRCodeGenerator';

function App() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-6 selection:bg-black selection:text-white">
      <QRCodeGenerator />
    </div>
  );
}

export default App;

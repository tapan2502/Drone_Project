import { Map } from './components/Map';
import { Controls } from './components/Controls';
import { DroneList } from './components/DroneList';
import { Tutorial } from './components/Tutorial';
import { useState } from 'react';

function App() {
  const [showTutorial, setShowTutorial] = useState(true);

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <Map />
      <Controls />
      <DroneList />
      {showTutorial && <Tutorial onClose={() => setShowTutorial(false)} />}
      <button
        onClick={() => setShowTutorial(true)}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors z-[9999]"
        title="Show Help"
      >
        ?
      </button>
    </div>
  );
}

export default App;
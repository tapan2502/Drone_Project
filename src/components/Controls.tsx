import { Play, Pause, Plus, Upload, Settings } from 'lucide-react';
import { useDroneStore } from '../store/droneStore';
import { Coordinate } from '../types';
import { useState } from 'react';

export function Controls() {
  const {
    isPlaying,
    togglePlayback,
    addDrone,
    currentTime,
    setCurrentTime,
    updateSimulationSpeed,
    simulationSpeed,
  } = useDroneStore();
  const [showSettings, setShowSettings] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const coordinates = JSON.parse(e.target?.result as string) as Coordinate[];
        addDrone({
          name: file.name.replace('.json', ''),
          coordinates,
          currentPosition: 0,
          isActive: true,
          color: '',
        });
      } catch (error) {
        alert('Error: Invalid JSON file format. Please ensure the file contains valid coordinates.');
        console.error('Error parsing file:', error);
      }
    };
    reader.readAsText(file);
  };

  const handleAddDrone = () => {
    const coordinates: Coordinate[] = [
      { lat: 51.505, lng: -0.09 },
      { lat: 51.51, lng: -0.1 },
      { lat: 51.515, lng: -0.09 },
    ];

    addDrone({
      name: `Drone ${Date.now()}`,
      coordinates,
      currentPosition: 0,
      isActive: true,
      color: '',
    });
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-lg p-4 flex flex-col gap-4 items-center z-[9999]">
      <div className="flex gap-4 items-center">
        <button
          onClick={togglePlayback}
          className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          title={isPlaying ? 'Pause Simulation' : 'Start Simulation'}
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button
          onClick={handleAddDrone}
          className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors"
          title="Add New Drone"
        >
          <Plus size={24} />
        </button>
        <label className="p-2 rounded-full bg-purple-500 text-white hover:bg-purple-600 cursor-pointer transition-colors" title="Upload Drone Path">
          <Upload size={24} />
          <input
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 rounded-full bg-gray-500 text-white hover:bg-gray-600 transition-colors"
          title="Simulation Settings"
        >
          <Settings size={24} />
        </button>
      </div>

      {showSettings && (
        <div className="bg-gray-100 p-4 rounded-lg w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Simulation Speed
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={simulationSpeed}
            onChange={(e) => updateSimulationSpeed(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Slower</span>
            <span>Faster</span>
          </div>
        </div>
      )}

      <div className="w-full">
        <input
          type="range"
          min="0"
          max="100"
          value={currentTime}
          onChange={(e) => setCurrentTime(parseInt(e.target.value))}
          className="w-full"
          title="Timeline"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Start</span>
          <span>End</span>
        </div>
      </div>
    </div>
  );
}
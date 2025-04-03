import { X } from 'lucide-react';

interface TutorialProps {
  onClose: () => void;
}

export function Tutorial({ onClose }: TutorialProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[10000]">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4">How to Use the Drone Simulator</h2>
        
        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-semibold mb-2">1. Adding Drones</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Click the <span className="bg-green-500 text-white px-2 py-1 rounded">+</span> button to add a new drone with default coordinates</li>
              <li>Use the <span className="bg-purple-500 text-white px-2 py-1 rounded">Upload</span> button to import drone paths from a JSON file</li>
              <li>JSON format: <code className="bg-gray-100 px-2 py-1 rounded">[&#123;"lat": 51.505, "lng": -0.09&#125;, ...]</code></li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">2. Managing Waypoints</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Select a drone from the list on the right to modify its path</li>
              <li>Use the search box to find locations and click results to add waypoints</li>
              <li>Click the edit button to manually edit coordinates</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">3. Simulation Controls</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Use the Play/Pause button to control the simulation</li>
              <li>Use the timeline slider to jump to specific points in the simulation</li>
              <li>Each drone's path is shown in a unique color</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">4. Map Navigation</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Scroll to zoom in/out</li>
              <li>Click and drag to pan the map</li>
              <li>Double-click to zoom in on a specific location</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
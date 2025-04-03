import { Trash2, Edit } from 'lucide-react';
import { useDroneStore } from '../store/droneStore';
import { useState } from 'react';
import { Coordinate } from '../types';

export function DroneList() {
  const { drones, removeDrone, selectedDrone, setSelectedDrone, updateDroneCoordinates } = useDroneStore();
  const [editingDrone, setEditingDrone] = useState<string | null>(null);
  const [coordinates, setCoordinates] = useState<string>('');

  const handleEdit = (droneId: string) => {
    const drone = drones.find((d) => d.id === droneId);
    if (drone) {
      setCoordinates(
        drone.coordinates
          .map((coord) => `${coord.lat},${coord.lng}`)
          .join('\n')
      );
      setEditingDrone(droneId);
    }
  };

  const handleSave = () => {
    if (!editingDrone) return;

    try {
      const newCoordinates: Coordinate[] = coordinates
        .split('\n')
        .map((line) => {
          const [lat, lng] = line.split(',').map(Number);
          return { lat, lng };
        });

      updateDroneCoordinates(editingDrone, newCoordinates);
      setEditingDrone(null);
      setCoordinates('');
    } catch (error) {
      console.error('Error parsing coordinates:', error);
    }
  };

  return (
    <div className="fixed top-4 right-4 bg-white rounded-lg shadow-lg p-4 w-80 max-h-[calc(100vh-2rem)] overflow-y-auto z-[9999]">
      <h2 className="text-lg font-semibold mb-4">Active Drones</h2>
      <div className="space-y-2">
        {drones.map((drone) => (
          <div key={drone.id}>
            <div
              className={`flex items-center justify-between p-2 rounded ${
                selectedDrone === drone.id ? 'bg-blue-100' : 'hover:bg-gray-100'
              } transition-colors`}
              onClick={() => setSelectedDrone(drone.id)}
            >
              <span className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: drone.color }}
                />
                {drone.name}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(drone.id);
                  }}
                  className="text-blue-500 hover:text-blue-700 transition-colors"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeDrone(drone.id);
                  }}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            {editingDrone === drone.id && (
              <div className="mt-2 p-2 bg-gray-50 rounded">
                <textarea
                  value={coordinates}
                  onChange={(e) => setCoordinates(e.target.value)}
                  placeholder="Enter coordinates (lat,lng)"
                  className="w-full h-32 p-2 border rounded text-sm font-mono"
                />
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={() => setEditingDrone(null)}
                    className="px-3 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-3 py-1 text-sm rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
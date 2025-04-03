import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Plane } from 'lucide-react';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { useDroneStore } from '../store/droneStore';
import 'leaflet/dist/leaflet.css';

const DEFAULT_CENTER = { lat: 51.505, lng: -0.09 };
const BASE_ANIMATION_INTERVAL = 50;
const BASE_MOVEMENT_STEP = 0.01;

const droneIcon = new Icon({
  iconUrl: 'data:image/svg+xml,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
      <circle cx="12" cy="12" r="10" fill="#2563eb"/>
      ${Plane}
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  className: 'drone-icon-pulse',
});

function SearchControl() {
  const map = useMap();
  const provider = new OpenStreetMapProvider();
  const { setSearchResults, addWaypoint, selectedDrone } = useDroneStore();

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    const results = await provider.search({ query });
    setSearchResults(
      results.map((result) => ({
        lat: result.y,
        lng: result.x,
      }))
    );
  };

  const handleResultClick = (lat: number, lng: number) => {
    map.setView([lat, lng], 13);
    addWaypoint({ lat, lng });
  };

  return (
    <div className="absolute top-4 left-4 z-[9999] bg-white rounded-lg shadow-lg p-4 w-64">
      <div className="mb-2 text-sm">
        {selectedDrone ? (
          <span className="text-green-600">Select locations to add waypoints</span>
        ) : (
          <span className="text-gray-600">Select a drone to add waypoints</span>
        )}
      </div>
      <input
        type="text"
        placeholder="Search locations..."
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <div className="mt-2 space-y-1 max-h-48 overflow-y-auto">
        {useDroneStore((state) => state.searchResults).map((result, index) => (
          <button
            key={index}
            onClick={() => handleResultClick(result.lat, result.lng)}
            className="w-full text-left p-2 hover:bg-gray-100 rounded"
          >
            {result.lat.toFixed(4)}, {result.lng.toFixed(4)}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Map() {
  const { drones, isPlaying, updateDronePosition, simulationSpeed } = useDroneStore();
  const animationRef = useRef<number>();
  const lastUpdateRef = useRef<number>(0);

  useEffect(() => {
    if (!isPlaying) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    const animate = (timestamp: number) => {
      const interval = BASE_ANIMATION_INTERVAL / simulationSpeed;
      const step = BASE_MOVEMENT_STEP * simulationSpeed;

      if (timestamp - lastUpdateRef.current >= interval) {
        drones.forEach((drone) => {
          if (drone.currentPosition < drone.coordinates.length - 1) {
            const currentCoord = drone.coordinates[drone.currentPosition];
            const nextCoord = drone.coordinates[drone.currentPosition + 1];
            
            const progress = (drone.progress || 0) + step;
            
            if (progress >= 1) {
              updateDronePosition(drone.id, drone.currentPosition + 1, 0);
            } else {
              const newLat = currentCoord.lat + (nextCoord.lat - currentCoord.lat) * progress;
              const newLng = currentCoord.lng + (nextCoord.lng - currentCoord.lng) * progress;
              
              updateDronePosition(drone.id, drone.currentPosition, progress, { lat: newLat, lng: newLng });
            }
          }
        });
        lastUpdateRef.current = timestamp;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [drones, isPlaying, updateDronePosition, simulationSpeed]);

  return (
    <MapContainer center={DEFAULT_CENTER} zoom={13} className="h-full w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <SearchControl />
      {drones.map((drone) => (
        <div key={drone.id}>
          <Polyline
            positions={drone.coordinates.map((coord) => [coord.lat, coord.lng])}
            color={drone.color}
            weight={3}
            opacity={0.8}
          />
          <Marker
            position={[
              drone.interpolatedPosition?.lat ?? drone.coordinates[drone.currentPosition].lat,
              drone.interpolatedPosition?.lng ?? drone.coordinates[drone.currentPosition].lng,
            ]}
            icon={droneIcon}
          />
        </div>
      ))}
    </MapContainer>
  );
}
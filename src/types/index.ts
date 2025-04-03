export interface Coordinate {
  lat: number;
  lng: number;
  timestamp?: number;
}

export interface Drone {
  id: string;
  name: string;
  coordinates: Coordinate[];
  currentPosition: number;
  isActive: boolean;
  color: string;
  progress?: number;
  interpolatedPosition?: Coordinate;
}

export interface DroneState {
  drones: Drone[];
  selectedDrone: string | null;
  isPlaying: boolean;
  currentTime: number;
  maxTime: number;
  searchResults: Coordinate[];
  simulationSpeed: number;
  addDrone: (drone: Omit<Drone, 'id'>) => void;
  removeDrone: (id: string) => void;
  updateDronePosition: (id: string, position: number, progress?: number, interpolatedPosition?: Coordinate) => void;
  setSelectedDrone: (id: string | null) => void;
  togglePlayback: () => void;
  updateDroneCoordinates: (id: string, coordinates: Coordinate[]) => void;
  setCurrentTime: (time: number) => void;
  setSearchResults: (results: Coordinate[]) => void;
  addWaypoint: (coordinate: Coordinate) => void;
  updateSimulationSpeed: (speed: number) => void;
}
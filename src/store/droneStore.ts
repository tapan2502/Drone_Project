import { create } from 'zustand';
import { DroneState } from '../types';

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];

export const useDroneStore = create<DroneState>((set, get) => ({
  drones: [],
  selectedDrone: null,
  isPlaying: false,
  currentTime: 0,
  maxTime: 100,
  searchResults: [],
  simulationSpeed: 5,

  addDrone: (drone) =>
    set((state) => ({
      drones: [
        ...state.drones,
        {
          ...drone,
          id: crypto.randomUUID(),
          color: COLORS[state.drones.length % COLORS.length],
        },
      ],
    })),

  removeDrone: (id) =>
    set((state) => ({
      drones: state.drones.filter((drone) => drone.id !== id),
      selectedDrone: state.selectedDrone === id ? null : state.selectedDrone,
    })),

  updateDronePosition: (id, position, progress = 0, interpolatedPosition = undefined) =>
    set((state) => ({
      drones: state.drones.map((drone) =>
        drone.id === id
          ? {
              ...drone,
              currentPosition: position,
              progress,
              interpolatedPosition,
            }
          : drone
      ),
    })),

  setSelectedDrone: (id) =>
    set(() => ({
      selectedDrone: id,
    })),

  togglePlayback: () =>
    set((state) => ({
      isPlaying: !state.isPlaying,
    })),

  updateDroneCoordinates: (id, coordinates) =>
    set((state) => ({
      drones: state.drones.map((drone) =>
        drone.id === id ? { ...drone, coordinates } : drone
      ),
    })),

  setCurrentTime: (time) =>
    set((state) => {
      const newDrones = state.drones.map((drone) => ({
        ...drone,
        currentPosition: Math.floor((time / 100) * (drone.coordinates.length - 1)),
        progress: 0,
        interpolatedPosition: undefined,
      }));
      return {
        currentTime: time,
        drones: newDrones,
      };
    }),

  setSearchResults: (results) =>
    set(() => ({
      searchResults: results,
    })),

  addWaypoint: (coordinate) =>
    set((state) => {
      if (!state.selectedDrone) {
        alert('Please select a drone first to add waypoints');
        return state;
      }
      const drone = state.drones.find((d) => d.id === state.selectedDrone);
      if (!drone) return state;

      return {
        drones: state.drones.map((d) =>
          d.id === state.selectedDrone
            ? { ...d, coordinates: [...d.coordinates, coordinate] }
            : d
        ),
      };
    }),

  updateSimulationSpeed: (speed) =>
    set(() => ({
      simulationSpeed: speed,
    })),
}));
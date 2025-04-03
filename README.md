# Drone Motion Simulator

A real-time drone flight path simulator built with React, Leaflet, and TypeScript. This web application allows users to simulate and visualize drone movements on an interactive map with multiple drones, customizable paths, and intuitive controls.

![Drone Simulator Screenshot](https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)

## Features

### 🗺️ Interactive Map
- Built with Leaflet for smooth map interactions
- Pan, zoom, and navigate the map intuitively
- Real-time drone position updates
- Visual path tracking for each drone

### 🚁 Multi-Drone Support
- Simulate multiple drones simultaneously
- Each drone has a unique color for easy identification
- Individual path control and editing
- Real-time position updates for all active drones

### 🎮 Simulation Controls
- Play/Pause simulation
- Timeline scrubbing for precise time control
- Adjustable simulation speed
- Add/Remove drones on the fly

### 📍 Waypoint Management
- Search locations using the integrated search box
- Add waypoints by clicking search results
- Manual coordinate editing
- JSON file import for complex paths

### 🎨 User Interface
- Clean, modern design with Tailwind CSS
- Responsive layout for all screen sizes
- Intuitive controls and feedback
- Interactive tutorial for new users

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Usage

### Adding Drones

1. Click the "+" button to add a drone with default coordinates
2. Use the upload button to import drone paths from a JSON file
3. JSON format example:
```json
[
  {"lat": 51.505, "lng": -0.09},
  {"lat": 51.51, "lng": -0.1},
  {"lat": 51.515, "lng": -0.09}
]
```

### Managing Waypoints

1. Select a drone from the list
2. Use the search box to find locations
3. Click on search results to add waypoints
4. Use the edit button to manually modify coordinates

### Controlling the Simulation

1. Use the Play/Pause button to control the simulation
2. Adjust the timeline slider to jump to specific points
3. Modify simulation speed using the settings panel
4. Monitor drone progress in real-time

## Technologies Used

- ⚛️ React
- 🌍 Leaflet
- 📝 TypeScript
- 🎨 Tailwind CSS
- 🏪 Redux-tool Kit (State Management)
- 🔍 OpenStreetMap (Geocoding)
- 🎯 React Query
- 🖼️ Lucide Icons

## Project Structure

```
src/
├── components/         # React components
│   ├── Controls.tsx   # Simulation control panel
│   ├── DroneList.tsx  # Drone management sidebar
│   ├── Map.tsx        # Main map component
│   └── Tutorial.tsx   # Interactive tutorial
├── store/             # State management
│   └── droneStore.ts  # redux store
├── types/             # TypeScript definitions
└── App.tsx            # Root component
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request



## Acknowledgments

- OpenStreetMap for map data
- Leaflet for map visualization
- React and TypeScript communities
- All contributors and users

// Agent 5: The Guide - Virtual Tour
export class VirtualTourAgent {
  generateTourPoints(modelData) {
    // Generate camera waypoints for virtual tour
    return [
      { position: [0, 2, 10], lookAt: [0, 1, 0], label: 'Front Entrance' },
      { position: [5, 2, 5], lookAt: [0, 1, 0], label: 'Side View' },
      { position: [0, 5, 0], lookAt: [0, 0, 0], label: 'Aerial View' },
      { position: [-5, 2, 5], lookAt: [0, 1, 0], label: 'Back Yard' }
    ];
  }

  enableVRMode() {
    return {
      controls: 'FirstPerson',
      fov: 75,
      movementSpeed: 2
    };
  }
}

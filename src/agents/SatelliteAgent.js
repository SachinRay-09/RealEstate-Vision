// Agent 4: The Scout - Satellite/Drone View
export class SatelliteAgent {
  async getCoordinates(address) {
    // Mock geocoding
    await this.delay(800);
    
    const locations = {
      '123 Main St': { lat: 40.7128, lng: -74.0060, zoom: 18 },
      'default': { lat: 37.7749, lng: -122.4194, zoom: 18 }
    };
    
    return locations[address] || locations['default'];
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

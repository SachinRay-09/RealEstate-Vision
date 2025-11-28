// Agent 2: The Analyst - Market Data
export class MarketAnalystAgent {
  async fetchData(address) {
    // Simulate API call
    await this.delay(1500);
    
    // Mock data for demo
    const mockData = {
      '123 Main St': {
        sqFt: 2400,
        bedrooms: 4,
        bathrooms: 3,
        yearBuilt: 2015,
        lotSize: 8500,
        propertyTax: 8500,
        lastSoldPrice: 485000,
        lastSoldDate: '2020-03-15',
        neighborhood: 'Downtown',
        locationScore: 8.5
      },
      'default': {
        sqFt: 1800,
        bedrooms: 3,
        bathrooms: 2,
        yearBuilt: 2010,
        lotSize: 6000,
        propertyTax: 6200,
        lastSoldPrice: 325000,
        lastSoldDate: '2019-06-20',
        neighborhood: 'Suburban',
        locationScore: 7.2
      }
    };
    
    return mockData[address] || mockData['default'];
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

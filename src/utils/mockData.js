// Centralized mock data for easy expansion

export const mockProperties = {
  '123 Main St': {
    address: '123 Main St',
    sqFt: 2400,
    bedrooms: 4,
    bathrooms: 3,
    yearBuilt: 2015,
    lotSize: 8500,
    propertyTax: 8500,
    lastSoldPrice: 485000,
    lastSoldDate: '2020-03-15',
    neighborhood: 'Downtown',
    locationScore: 8.5,
    coordinates: { lat: 40.7128, lng: -74.0060 }
  },
  '456 Oak Avenue': {
    address: '456 Oak Avenue',
    sqFt: 3200,
    bedrooms: 5,
    bathrooms: 4,
    yearBuilt: 2018,
    lotSize: 12000,
    propertyTax: 12500,
    lastSoldPrice: 675000,
    lastSoldDate: '2021-08-10',
    neighborhood: 'Hillside',
    locationScore: 9.2,
    coordinates: { lat: 34.0522, lng: -118.2437 }
  },
  '789 Pine Street': {
    address: '789 Pine Street',
    sqFt: 1600,
    bedrooms: 3,
    bathrooms: 2,
    yearBuilt: 2008,
    lotSize: 5500,
    propertyTax: 5200,
    lastSoldPrice: 295000,
    lastSoldDate: '2019-04-22',
    neighborhood: 'Riverside',
    locationScore: 6.8,
    coordinates: { lat: 41.8781, lng: -87.6298 }
  },
  'default': {
    address: 'Unknown Address',
    sqFt: 1800,
    bedrooms: 3,
    bathrooms: 2,
    yearBuilt: 2010,
    lotSize: 6000,
    propertyTax: 6200,
    lastSoldPrice: 325000,
    lastSoldDate: '2019-06-20',
    neighborhood: 'Suburban',
    locationScore: 7.2,
    coordinates: { lat: 37.7749, lng: -122.4194 }
  }
};

export const getPropertyData = (address) => {
  return mockProperties[address] || mockProperties['default'];
};

// Historical price data for charts (future enhancement)
export const generateHistoricalData = (currentPrice) => {
  const years = 5;
  const data = [];
  let price = currentPrice * 0.7; // Start at 70% of current
  
  for (let i = 0; i < years; i++) {
    data.push({
      year: new Date().getFullYear() - (years - i),
      value: Math.round(price)
    });
    price *= 1.06; // 6% annual appreciation
  }
  
  return data;
};

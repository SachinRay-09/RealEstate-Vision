# Satellite Background Images

## Current Setup

The app uses a high-quality satellite image from Unsplash as the background fallback when Mapbox is not configured.

Current image: https://images.unsplash.com/photo-1446776653964-20c1d3a81b06

## To Use Your Own Image

1. Download a high-resolution satellite/aerial image
2. Place it in this directory (e.g., `satellite_fallback.jpg`)
3. Update the path in `src/components/map/SatelliteBackground.jsx`:

```jsx
backgroundImage: `url('/images/satellite_fallback.jpg')`
```

## Recommended Sources

- **Unsplash**: https://unsplash.com/s/photos/satellite-earth
- **NASA Images**: https://images.nasa.gov/
- **ESA**: https://www.esa.int/ESA_Multimedia/Images

## Image Requirements

- Resolution: At least 1920x1080 (Full HD)
- Format: JPG or PNG
- Subject: Aerial/satellite view of city or landscape
- Lighting: Preferably nighttime or dusk for dramatic effect

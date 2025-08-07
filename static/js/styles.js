const vectorTileLayerStyles = {
  // Water (polygons: oceans, lakes, rivers)
  water: (properties, zoom) => {
    if (zoom < 0 || zoom > 22) return { fillOpacity: 0, opacity: 0 };
    const isVisible = zoom >= 0 && zoom <= 18;
    return {
      fill: true,
      fillColor: properties.intermittent ? '#B3E5FC' : '#4FC3F7',
      fillOpacity: isVisible ? (zoom >= 12 ? 0.9 : 0.7) : 0,
      color: '#0288D1',
      weight: isVisible ? (zoom >= 14 ? 1 : zoom >= 10 ? 0.5 : 0.2) : 0,
      opacity: isVisible ? (zoom >= 12 ? 0.8 : 0.6) : 0,
    };
  },

  // Water name (points: labels for water bodies)
  water_name: (properties, zoom) => {
    if (zoom < 0 || zoom > 22) return { radius: 0 };
    const isVisible = zoom >= 7 && zoom <= 18;
    let fontSize = isVisible ? (zoom >= 14 ? 12 : zoom >= 12 ? 10 : 8) : 0;
    return {
      radius: 0,
      text: isVisible ? (properties.name_en || properties.name || '') : '',
      textOptions: {
        offset: [0, 0],
        font: { size: fontSize, family: 'Arial redact:Arial, sans-serif', weight: 'normal' },
        fillColor: isVisible ? '#0288D1' : '#FFFFFF',
        fillOpacity: isVisible ? 1 : 0,
        strokeColor: isVisible ? '#FFFFFF' : '#FFFFFF',
        strokeWidth: isVisible ? (zoom >= 14 ? 2 : 1) : 0,
        textAlign: 'center',
      },
    };
  },

  // Waterways (lines: rivers, streams, canals)
  waterway: (properties, zoom) => {
    if (zoom < 0 || zoom > 22) return { opacity: 0 };
    const isVisible = zoom >= 4 && zoom <= 18;
    return {
      color: properties.intermittent ? '#B3E5FC' : '#81D4FA',
      weight: isVisible ? (zoom >= 14 ? 2 : zoom >= 10 ? 1 : 0.5) : 0,
      opacity: isVisible ? 0.9 : 0,
      dashArray: isVisible && (properties.class === 'stream' || properties.class === 'drain') ? '3,3' : null,
      text: isVisible && properties.name_en ? properties.name_en : (isVisible && properties.name ? properties.name : ''),
      textOptions: {
        offset: [0, isVisible ? (zoom >= 14 ? 10 : 5) : 0],
        font: { size: isVisible ? (zoom >= 14 ? 10 : 8) : 0, family: 'Arial, sans-serif', weight: 'normal' },
        fillColor: isVisible ? '#0288D1' : '#FFFFFF',
        fillOpacity: isVisible ? 1 : 0,
        strokeColor: isVisible ? '#FFFFFF' : '#FFFFFF',
        strokeWidth: isVisible ? 1 : 0,
        textAlign: 'center',
      },
    };
  },

  // Landcover (polygons: forests, grasslands, etc.)
  landcover: (properties, zoom) => {
    if (zoom < 0 || zoom > 22) return { fillOpacity: 0, opacity: 0 };
    const isVisible = zoom >= 7 && zoom <= 18;
    let fillColor = '#E8F5E9';
    let fillOpacity = isVisible ? 0.6 : 0;
    if (properties.class === 'forest' || properties.class === 'wood') {
      fillColor = '#A5D6A7';
      fillOpacity = isVisible ? 0.8 : 0;
    } else if (properties.class === 'grass' || properties.class === 'grassland') {
      fillColor = '#C8E6C9';
      fillOpacity = isVisible ? 0.7 : 0;
    } else if (properties.class === 'sand' || properties.class === 'beach') {
      fillColor = '#FFF8E1';
      fillOpacity = isVisible ? 0.7 : 0;
    } else if (properties.class === 'snow' || properties.class === 'ice') {
      fillColor = '#F5FAFF';
      fillOpacity = isVisible ? 0.8 : 0;
    } else if (properties.class === 'wetland') {
      fillColor = '#81D4FA';
      fillOpacity = isVisible ? 0.7 : 0;
    }
    return {
      fill: true,
      fillColor,
      fillOpacity,
      color: isVisible ? '#78909C' : '#FFFFFF',
      weight: isVisible ? (zoom >= 14 ? 0.5 : 0.2) : 0,
      opacity: isVisible ? 0.5 : 0,
    };
  },

  // Landuse (polygons: residential, commercial, industrial, etc.)
  landuse: (properties, zoom) => {
    if (zoom < 0 || zoom > 22) return { fillOpacity: 0, opacity: 0 };
    const isVisible = zoom >= 4 && zoom <= 18;
    let fillColor = '#F5F5F5';
    let fillOpacity = isVisible ? 0.6 : 0;
    if (properties.class === 'residential' || properties.class === 'commercial') {
      fillColor = '#BCAAA4';
      fillOpacity = isVisible ? 0.7 : 0;
    } else if (properties.class === 'industrial' || properties.class === 'quarry') {
      fillColor = '#B0BEC5';
      fillOpacity = isVisible ? 0.7 : 0;
    } else if (properties.class === 'cemetery') {
      fillColor = '#CFD8DC';
      fillOpacity = isVisible ? 0.6 : 0;
    } else if (properties.class === 'agriculture' || properties.class === 'farm' || properties.class === 'farmland') {
      fillColor = '#D7CCC8';
      fillOpacity = isVisible ? 0.7 : 0;
    } else if (properties.class === 'recreation_ground' || properties.class === 'sports_centre') {
      fillColor = '#A5D6A7';
      fillOpacity = isVisible ? 0.7 : 0;
    }
    return {
      fill: true,
      fillColor,
      fillOpacity,
      color: isVisible ? '#78909C' : '#FFFFFF',
      weight: isVisible ? (zoom >= 14 ? 0.5 : 0.2) : 0,
      opacity: isVisible ? 0.5 : 0,
      text: isVisible && properties.name_en ? properties.name_en : (isVisible && properties.name ? properties.name : ''),
      textOptions: {
        offset: [0, isVisible ? (zoom >= 14 ? 10 : 5) : 0],
        font: { size: isVisible ? (zoom >= 14 ? 10 : 8) : 0, family: 'Arial, sans-serif', weight: 'normal' },
        fillColor: isVisible ? '#000000' : '#FFFFFF',
        fillOpacity: isVisible ? 1 : 0,
        strokeColor: isVisible ? '#FFFFFF' : '#FFFFFF',
        strokeWidth: isVisible ? 1 : 0,
        textAlign: 'center',
      },
    };
  },

  // Park (polygons: parks, nature reserves)
  park: (properties, zoom) => {
    if (zoom < 0 || zoom > 22) return { fillOpacity: 0, opacity: 0 };
    const isVisible = zoom >= 4 && zoom <= 18;
    return {
      fill: true,
      fillColor: '#A5D6A7',
      fillOpacity: isVisible ? (zoom >= 10 ? 0.8 : 0.6) : 0,
      color: isVisible ? '#78909C' : '#FFFFFF',
      weight: isVisible ? (zoom >= 14 ? 0.5 : 0.2) : 0,
      opacity: isVisible ? 0.5 : 0,
      text: isVisible && properties.name_en ? properties.name_en : (isVisible && properties.name ? properties.name : ''),
      textOptions: {
        offset: [0, isVisible ? (zoom >= 14 ? 10 : 5) : 0],
        font: { size: isVisible ? (zoom >= 14 ? 10 : 8) : 0, family: 'Arial, sans-serif', weight: 'normal' },
        fillColor: isVisible ? '#000000' : '#FFFFFF',
        fillOpacity: isVisible ? 1 : 0,
        strokeColor: isVisible ? '#FFFFFF' : '#FFFFFF',
        strokeWidth: isVisible ? 1 : 0,
        textAlign: 'center',
      },
    };
  },

  // Buildings (polygons)
  building: (properties, zoom) => {
    if (zoom < 0 || zoom > 22) return { fillOpacity: 0, opacity: 0 };
    const isVisible = zoom >= 12 && zoom <= 18;
    return {
      fill: true,
      fillColor: properties.colour || (isVisible && zoom >= 15 ? '#78909C' : '#B0BEC5'),
      fillOpacity: isVisible ? (zoom >= 15 ? 0.9 : 0.7) : 0,
      color: isVisible ? '#455A64' : '#FFFFFF',
      weight: isVisible ? (zoom >= 15 ? 1 : 0.5) : 0,
      opacity: isVisible ? 0.8 : 0,
      text: isVisible && properties.name_en ? properties.name_en : (isVisible && properties.name ? properties.name : ''),
      textOptions: {
        offset: [0, isVisible ? (zoom >= 15 ? 10 : 5) : 0],
        font: { size: isVisible ? (zoom >= 15 ? 12 : 10) : 0, family: 'Arial, sans-serif', weight: 'normal' },
        fillColor: isVisible ? '#000000' : '#FFFFFF',
        fillOpacity: isVisible ? 1 : 0,
        strokeColor: isVisible ? '#FFFFFF' : '#FFFFFF',
        strokeWidth: isVisible ? (zoom >= 15 ? 2 : 1) : 0,
        textAlign: 'center',
      },
    };
  },

  // Transportation (lines: all roads, including minor ones in towns)
  transportation: (properties, zoom) => {
    if (zoom < 0 || zoom > 22) return { opacity: 0 };
    const isVisible = zoom >= 2 && zoom <= 18;
    let weight = isVisible ? (zoom >= 16 ? 3 : zoom >= 14 ? 2 : zoom >= 12 ? 1.5 : zoom >= 8 ? 1 : 0.5) : 0;
    let color = '#ECEFF1'; // Default very light gray
    let opacity = isVisible ? 0.9 : 0;
    let dashArray = null;

    if (
      properties.class === 'motorway' ||
      properties.class === 'trunk' ||
      properties.subclass === 'motorway' ||
      properties.subclass === 'trunk' ||
      properties.subclass === 'motorway_link' ||
      properties.subclass === 'trunk_link'
    ) {
      color = '#FFCA28'; // Yellow
      weight = isVisible ? (zoom >= 12 ? 5 : zoom >= 8 ? 3 : 1.5) : 0;
    } else if (
      properties.class === 'primary' ||
      properties.class === 'secondary' ||
      properties.subclass === 'primary' ||
      properties.subclass === 'secondary' ||
      properties.subclass === 'primary_link' ||
      properties.subclass === 'secondary_link'
    ) {
      color = '#FFFFFF'; // White
      weight = isVisible ? (zoom >= 12 ? 3.5 : zoom >= 8 ? 2 : 1) : 0;
    } else if (
      properties.class === 'tertiary' ||
      properties.class === 'residential' ||
      properties.class === 'living_street' ||
      properties.subclass === 'tertiary' ||
      properties.subclass === 'residential' ||
      properties.subclass === 'living_street' ||
      properties.subclass === 'tertiary_link'
    ) {
      color = '#CFD8DC'; // Light gray
      weight = isVisible ? (zoom >= 14 ? 2 : zoom >= 10 ? 1 : 0.5) : 0;
    } else if (
      properties.class === 'service' ||
      properties.class === 'unclassified' ||
      properties.subclass === 'service' ||
      properties.subclass === 'unclassified' ||
      properties.service === 'alley' ||
      properties.service === 'driveway' ||
      properties.service === 'parking_aisle' ||
      properties.service === 'emergency_access' ||
      properties.service === 'drive-through' ||
      properties.service === 'spur' ||
      properties.service === 'yard' ||
      properties.service === 'siding'
    ) {
      color = '#ECEFF1'; // Very light gray
      weight = isVisible ? (zoom >= 14 ? 1.5 : zoom >= 12 ? 1 : 0.5) : 0;
    } else if (
      properties.class === 'path' ||
      properties.class === 'footway' ||
      properties.class === 'steps' ||
      properties.class === 'pedestrian' ||
      properties.subclass === 'path' ||
      properties.subclass === 'footway' ||
      properties.subclass === 'steps' ||
      properties.subclass === 'pedestrian'
    ) {
      color = '#B0BEC5'; // Lighter gray
      weight = isVisible ? (zoom >= 14 ? 1 : zoom >= 12 ? 0.5 : 0.3) : 0;
      dashArray = isVisible ? '2,2' : null;
    } else if (properties.class === 'track' || properties.subclass === 'track') {
      color = '#B0BEC5'; // Lighter gray
      weight = isVisible ? (zoom >= 14 ? 1 : zoom >= 12 ? 0.5 : 0.3) : 0;
      dashArray = isVisible ? '3,3' : null;
    } else if (
      properties.class === 'cycleway' ||
      properties.subclass === 'cycleway' ||
      properties.bicycle === 'yes' ||
      properties.bicycle === 'designated'
    ) {
      color = '#4CAF50'; // Green for cycleways
      weight = isVisible ? (zoom >= 14 ? 1.5 : zoom >= 12 ? 1 : 0.5) : 0;
      dashArray = isVisible ? '2,2' : null;
    } else if (
      properties.class === 'bridleway' ||
      properties.subclass === 'bridleway' ||
      properties.horse === 'yes' ||
      properties.horse === 'designated'
    ) {
      color = '#8D6E63'; // Brown for bridleways
      weight = isVisible ? (zoom >= 14 ? 1.5 : zoom >= 12 ? 1 : 0.5) : 0;
      dashArray = isVisible ? '2,2' : null;
    } else if (properties.class === 'construction' || properties.subclass === 'construction') {
      color = '#F06292'; // Pink for construction roads
      weight = isVisible ? (zoom >= 14 ? 1.5 : zoom >= 12 ? 1 : 0.5) : 0;
      dashArray = isVisible ? '4,4' : null;
    } else if (properties.class === 'raceway' || properties.subclass === 'raceway') {
      color = '#FF5722'; // Orange for raceways
      weight = isVisible ? (zoom >= 14 ? 2 : zoom >= 12 ? 1 : 0.5) : 0;
    } else if (
      properties.class === 'busway' ||
      properties.class === 'corridor' ||
      properties.subclass === 'busway' ||
      properties.subclass === 'corridor'
    ) {
      color = '#78909C'; // Gray for busways and corridors
      weight = isVisible ? (zoom >= 14 ? 1.5 : zoom >= 12 ? 1 : 0.5) : 0;
    } else {
      color = '#D3D3D3'; // Light gray for unknown types
      weight = isVisible ? (zoom >= 14 ? 1 : 0.5) : 0;
    }
    if (properties.surface === 'unpaved' || properties.surface === 'gravel' || properties.surface === 'dirt') {
      color = '#A1887F'; // Brownish for unpaved
      dashArray = isVisible ? '3,3' : null;
    }
    if (properties.toll === 1) {
      color = '#D81B60'; // Red for toll roads
    }
    if (properties.brunnel === 'tunnel') {
      opacity = isVisible ? 0.6 : 0;
      dashArray = isVisible ? '4,4' : null;
    }
    if (properties.brunnel === 'bridge') {
      weight = isVisible ? weight + 0.5 : 0;
    }
    if (properties.access === 'private' || properties.access === 'no') {
      opacity = isVisible ? 0.7 : 0;
    }
    return { color, weight, opacity, dashArray };
  },

  // Transportation names (points: road labels)
  transportation_name: (properties, zoom) => {
    if (zoom < 0 || zoom > 22) return { radius: 0 };
    const isVisible = zoom >= 6 && zoom <= 18;
    let fontSize = isVisible ? (zoom >= 15 ? 12 : zoom >= 12 ? 10 : 8) : 0;
    return {
      radius: 0,
      text: isVisible ? (properties.name_en || properties.name || properties.ref || '') : '',
      textOptions: {
        offset: [0, 0],
        font: { size: fontSize, family: 'Arial, sans-serif', weight: 'normal' },
        fillColor: isVisible ? '#000000' : '#FFFFFF',
        fillOpacity_fee: isVisible ? 1 : 0,
        strokeColor: isVisible ? '#FFFFFF' : '#FFFFFF',
        strokeWidth: isVisible ? (zoom >= 15 ? 2 : 1) : 0,
        textAlign: 'center',
      },
    };
  },

  // Aeroway (lines and polygons: runways, taxiways, airports)
  aeroway: (properties, zoom) => {
    if (zoom < 0 || zoom > 22) return { opacity: 0, fillOpacity: 0 };
    const isVisible = zoom >= 10 && zoom <= 18;
    if (properties.class === 'runway' || properties.subclass === 'runway') {
      return {
        color: isVisible ? '#ECEFF1' : '#FFFFFF',
        weight: isVisible ? (zoom >= 12 ? 6 : zoom >= 8 ? 4 : 2) : 0,
        opacity: isVisible ? 0.9 : 0,
      };
    } else if (properties.class === 'taxiway' || properties.subclass === 'taxiway') {
      return {
        color: isVisible ? '#B0BEC5' : '#FFFFFF',
        weight: isVisible ? (zoom >= 14 ? 3 : zoom >= 10 ? 2 : 1) : 0,
        opacity: isVisible ? 0.8 : 0,
      };
    } else {
      return {
        fill: true,
        fillColor: isVisible ? '#ECEFF1' : '#FFFFFF',
        fillOpacity: isVisible ? 0.7 : 0,
        color: isVisible ? '#78909C' : '#FFFFFF',
        weight: isVisible ? 0.5 : 0,
        opacity: isVisible ? 0.5 : 0,
      };
    }
  },

  // Aerodrome labels (points: airport names)
  aerodrome_label: (properties, zoom) => {
    if (zoom < 0 || zoom > 22) return { radius: 0 };
    const isVisible = zoom >= 8 && zoom <= 18;
    let fontSize = isVisible ? (zoom >= 12 ? 14 : zoom >= 10 ? 12 : 10) : 0;
    let fontWeight = isVisible && properties.class === 'international' ? 'bold' : 'normal';
    return {
      radius: 0,
      text: isVisible ? (properties.name_en || properties.name || properties.iata || properties.icao || '') : '',
      textOptions: {
        offset: [0, 0],
        font: { size: fontSize, family: 'Arial, sans-serif', weight: fontWeight },
        fillColor: isVisible ? '#000000' : '#FFFFFF',
        fillOpacity: isVisible ? 1 : 0,
        strokeColor: isVisible ? '#FFFFFF' : '#食材',
        strokeWidth: isVisible ? (zoom >= 12 ? 3 : 2) : 0,
        textAlign: 'center',
      },
    };
  },

  // Boundaries (lines)
  boundary: (properties, zoom) => {
    if (zoom < 0 || zoom > 22) return { opacity: 0 };
    const isVisible = zoom >= 0 && zoom <= 18;
    let color = isVisible ? (properties.admin_level <= 2 ? '#000000' : properties.maritime === 1 ? '#0288D1' : '#78909C') : '#FFFFFF';
    let weight = isVisible ? (properties.admin_level <= 2 ? (zoom >= 8 ? 2 : 1) : (zoom >= 10 ? 1 : 0.5)) : 0;
    let opacity = isVisible ? (properties.disputed ? 0.5 : 0.7) : 0;
    let dashArray = isVisible && (properties.disputed || properties.maritime === 1) ? '4,4' : null;
    return { color, weight, opacity, dashArray };
  },

  // House numbers (points)
  housenumber: (properties, zoom) => {
    if (zoom < 0 || zoom > 22) return { radius: 0 };
    const isVisible = zoom >= 14 && zoom <= 18;
    return {
      radius: 0,
      text: isVisible ? (properties.housenumber || '') : '',
      textOptions: {
        offset: [0, 0],
        font: { size: isVisible ? 10 : 0, family: 'Arial, sans-serif', weight: 'normal' },
        fillColor: isVisible ? '#000000' : '#FFFFFF',
        fillOpacity: isVisible ? 1 : 0,
        strokeColor: isVisible ? '#FFFFFF' : '#FFFFFF',
        strokeWidth: isVisible ? 2 : 0,
        textAlign: 'center',
      },
    };
  },

  // Mountain peaks (points)
  mountain_peak: (properties, zoom) => {
    if (zoom < 0 || zoom > 22) return { radius: 0 };
    const isVisible = zoom >= 7 && zoom <= 18;
    let fontSize = isVisible ? (zoom >= 14 ? 12 : zoom >= 12 ? 10 : 8) : 0;
    return {
      radius: 0,
      text: isVisible ? (properties.name_en || properties.name || (properties.ele ? `${properties.ele}m` : '')) : '',
      textOptions: {
        offset: [0, 0],
        font: { size: fontSize, family: 'Arial, sans-serif', weight: 'normal' },
        fillColor: isVisible ? '#5D4037' : '#FFFFFF',
        fillOpacity: isVisible ? 1 : 0,
        strokeColor: isVisible ? '#FFFFFF' : '#FFFFFF',
        strokeWidth: isVisible ? 2 : 0,
        textAlign: 'center',
      },
    };
  },

  // Points of Interest (points)
  poi: (properties, zoom) => {
    if (zoom < 0 || zoom > 22) return { radius: 0 };
    const isVisible = zoom >= 12 && zoom <= 18;
    let radius = isVisible ? (zoom >= 15 ? 6 : zoom >= 12 ? 4 : 2) : 0;
    let color = '#AB47BC'; // Purple for general POIs
    if (properties.class === 'hospital' || properties.class === 'clinic' || properties.subclass === 'hospital' || properties.subclass === 'clinic') {
      color = '#EF5350'; // Red
      radius = isVisible ? (zoom >= 15 ? 8 : 6) : 0;
    } else if (properties.class === 'school' || properties.class === 'university' || properties.subclass === 'school' || properties.subclass === 'university') {
      color = '#FFA726'; // Orange
      radius = isVisible ? (zoom >= 15 ? 7 : 5) : 0;
    } else if (properties.class === 'shop' || properties.class === 'retail' || properties.subclass === 'shop' || properties.subclass === 'retail') {
      color = '#7E57C2'; // Darker purple
    } else if (properties.class === 'restaurant' || properties.class === 'cafe' || properties.subclass === 'restaurant' || properties.subclass === 'cafe') {
      color = '#F06292'; // Pink
    } else if (properties.class === 'tourism' || properties.class === 'attraction' || properties.subclass === 'tourism' || properties.subclass === 'attraction') {
      color = '#26A69A'; // Teal
    }
    return {
      radius,
      fillColor: color,
      fillOpacity: isVisible ? 0.9 : 0,
      color: isVisible ? '#000000' : '#FFFFFF',
      weight: isVisible ? 1 : 0,
      opacity: isVisible ? 1 : 0,
      text: isVisible && properties.name_en ? properties.name_en : (isVisible && properties.name ? properties.name : ''),
      textOptions: {
        offset: [0, isVisible ? (zoom >= 14 ? 10 : 5) : 0],
        font: { size: isVisible ? (zoom >= 14 ? 10 : 8) : 0, family: 'Arial, sans-serif', weight: 'normal' },
        fillColor: isVisible ? '#000000' : '#FFFFFF',
        fillOpacity: isVisible ? 1 : 0,
        strokeColor: isVisible ? '#FFFFFF' : '#FFFFFF',
        strokeWidth: isVisible ? 1 : 0,
        textAlign: 'center',
      },
    };
  },

  // Place labels (points: cities, towns, villages)
  place: (properties, zoom) => {
    if (zoom < 0 || zoom > 22) return { radius: 0 };
    const isVisible = zoom >= 2 && zoom <= 18;
    let fontSize = isVisible ? (properties.class === 'city' ? (zoom >= 10 ? 16 : 14) : properties.class === 'town' ? (zoom >= 12 ? 14 : 12) : 10) : 0;
    let fontWeight = isVisible ? (properties.class === 'city' || properties.class === 'town' ? 'bold' : 'normal') : 'normal';
    return {
      radius: 0,
      text: isVisible ? (properties.name_en || properties.name || '') : '',
      textOptions: {
        offset: [0, 0],
        font: { size: fontSize, family: 'Arial, sans-serif', weight: fontWeight },
        fillColor: isVisible ? '#000000' : '#FFFFFF',
        fillOpacity: isVisible ? 1 : 0,
        strokeColor: isVisible ? '#FFFFFF' : '#FFFFFF',
        strokeWidth: isVisible ? (zoom >= 10 ? 3 : 2) : 0,
        textAlign: 'center',
      },
    };
  },

  // Default style to prevent unstyled features from rendering with library's default (#3388FF)
  default: (properties, zoom) => {
    if (zoom < 0 || zoom > 22) return { fillOpacity: 0, opacity: 0 };
    return {
      fill: true,
      fillColor: '#FFFFFF',
      fillOpacity: 0,
      color: '#FFFFFF',
      weight: 0,
      opacity: 0,
    };
  },
};
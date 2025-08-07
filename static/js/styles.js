const vectorTileLayerStyles = {

  // Water (polygons: oceans, lakes, rivers)
  water: (properties, zoom) => ({
    fill: true,
    fillColor: properties.intermittent ? '#B3E5FC' : '#4FC3F7',
    fillOpacity: zoom >= 12 ? 0.9 : 0.7,
    color: '#0288D1',
    weight: zoom >= 14 ? 1 : 0.5,
    opacity: 0.8,
  }),

  // Water name (points: labels for water bodies)
  water_name: (properties, zoom) => {
    if (zoom < 10) return { radius: 0 };
    let fontSize = zoom >= 14 ? 12 : zoom >= 12 ? 10 : 8;
    const name = properties['name:en'] || properties['name:de'] || properties.name || '';
    return {
      radius: 0,
      text: name,
      textOptions: {
        offset: [0, 0],
        font: {
          size: fontSize,
          family: 'Arial',
          weight: 'normal',
        },
        fillColor: '#0288D1',
        fillOpacity: 1,
        strokeColor: '#FFFFFF',
        strokeWidth: 2,
        textAlign: 'center',
      },
    };
  },

  // Waterways (lines: rivers, streams, canals)
  waterway: (properties, zoom) => ({
    color: properties.intermittent ? '#B3E5FC' : '#81D4FA',
    weight: zoom >= 14 ? 2 : zoom >= 10 ? 1 : 0.5,
    opacity: 0.9,
    dashArray: properties.class === 'stream' || properties.class === 'drain' ? '3,3' : null,
  }),

  // Waterway names (points: labels for rivers, etc.)
  waterway_name: (properties, zoom) => {
    if (zoom < 10) return { radius: 0 };
    const name = properties['name:en'] || properties['name:de'] || properties.name || '';
    let fontSize = zoom >= 14 ? 12 : zoom >= 12 ? 10 : 8;
    return {
      radius: 0,
      text: name,
      textOptions: {
        offset: [0, 0],
        font: {
          size: fontSize,
          family: 'Arial',
          weight: 'normal',
        },
        fillColor: '#0288D1',
        fillOpacity: 1,
        strokeColor: '#FFFFFF',
        strokeWidth: 2,
        textAlign: 'center',
        placement: 'line'
      },
    };
  },

  // Landcover (polygons: forests, grasslands, etc.)
  landcover: (properties, zoom) => {
    let fillColor = '#E8F5E9';
    let fillOpacity = 0.6;
    if (properties.class === 'forest' || properties.class === 'wood') {
      fillColor = '#A5D6A7';
      fillOpacity = 0.8;
    } else if (properties.class === 'grass' || properties.class === 'grassland') {
      fillColor = '#C8E6C9';
      fillOpacity = 0.7;
    } else if (properties.class === 'sand' || properties.class === 'beach') {
      fillColor = '#FFF8E1';
      fillOpacity = 0.7;
    } else if (properties.class === 'snow' || properties.class === 'ice') {
      fillColor = '#F5FAFF';
      fillOpacity = 0.8;
    } else if (properties.class === 'wetland') {
      fillColor = '#81D4FA';
      fillOpacity = 0.7;
    }
    return {
      fill: true,
      fillColor,
      fillOpacity,
      color: '#78909C',
      weight: 0.5,
      opacity: 0.5,
    };
  },

  // Landuse (polygons: residential, commercial, industrial, etc.)
  landuse: (properties, zoom) => {
    let fillColor = '#F5F5F5';
    let fillOpacity = 0.6;
    if (properties.class === 'residential' || properties.class === 'commercial') {
      fillColor = '#BCAAA4';
      fillOpacity = 0.7;
    } else if (properties.class === 'industrial' || properties.class === 'quarry') {
      fillColor = '#B0BEC5';
      fillOpacity = 0.7;
    } else if (properties.class === 'cemetery') {
      fillColor = '#CFD8DC';
      fillOpacity = 0.6;
    } else if (properties.class === 'agriculture' || properties.class === 'farm' || properties.class === 'farmland') {
      fillColor = '#D7CCC8';
      fillOpacity = 0.7;
    } else if (properties.class === 'recreation_ground' || properties.class === 'sports_centre') {
      fillColor = '#A5D6A7';
      fillOpacity = 0.7;
    }
    return {
      fill: true,
      fillColor,
      fillOpacity,
      color: '#78909C',
      weight: 0.5,
      opacity: 0.5,
    };
  },

  // Park (polygons: parks, nature reserves)
  park: (properties, zoom) => ({
    fill: true,
    fillColor: '#A5D6A7',
    fillOpacity: zoom >= 10 ? 0.8 : 0.6,
    color: '#78909C',
    weight: 0.5,
    opacity: 0.5,
  }),

  // Buildings (polygons)
  building: (properties, zoom) => {
    if (properties.render_height && properties.render_min_height) {
      return {
        fill: true,
        fillColor: properties.colour || (zoom >= 15 ? '#78909C' : '#B0BEC5'),
        fillOpacity: zoom >= 15 ? 0.9 : 0.7,
        color: '#455A64',
        weight: zoom >= 15 ? 1 : 0.5,
        opacity: 0.8,
        extrusionHeight: properties.render_height,
        extrusionBase: properties.render_min_height,
      };
    }
    return {
      fill: true,
      fillColor: properties.colour || (zoom >= 15 ? '#78909C' : '#B0BEC5'),
      fillOpacity: zoom >= 15 ? 0.9 : 0.7,
      color: '#455A64',
      weight: zoom >= 15 ? 1 : 0.5,
      opacity: 0.8,
    };
  },

  // Transportation (lines: all roads, including minor ones in towns)
  transportation: (properties, zoom) => {
    let weight = 1;
    let color = '#CFD8DC'; // Default to a light gray color
    let opacity = 0.9;
    let dashArray = null;

    if (properties.toll === 1) {
      color = '#B69A4C';
      weight = zoom >= 12 ? 5 : zoom >= 8 ? 3 : 1.5;
      dashArray = '4,2';
    } else if (properties.surface === 'unpaved' || properties.surface === 'dirt' || properties.surface === 'gravel') {
      color = '#A3998D';
      weight = zoom >= 14 ? 1.5 : zoom >= 12 ? 1 : 0.5;
      dashArray = '2,2';
    } else if (properties.class === 'motorway' || properties.class === 'trunk') {
      color = '#FFCA28';
      weight = zoom >= 12 ? 5 : zoom >= 8 ? 3 : 1.5;
    } else if (properties.subclass === 'motorway_link' || properties.subclass === 'trunk_link') {
      color = '#FFCA28';
      weight = zoom >= 12 ? 3.5 : zoom >= 8 ? 2 : 1;
    } else if (properties.class === 'primary' || properties.class === 'secondary') {
      color = '#FFFFFF';
      weight = zoom >= 12 ? 3.5 : zoom >= 8 ? 2 : 1;
    } else if (properties.subclass === 'primary_link' || properties.subclass === 'secondary_link') {
      color = '#FFFFFF';
      weight = zoom >= 12 ? 3 : zoom >= 8 ? 1.5 : 0.8;
    } else if (properties.class === 'tertiary' || properties.subclass === 'tertiary') {
      color = '#ECEFF1';
      weight = zoom >= 14 ? 2.5 : zoom >= 12 ? 1.5 : 0.8;
    } else if (properties.class === 'residential' || properties.class === 'living_street') {
      color = '#ECEFF1';
      weight = zoom >= 14 ? 2 : zoom >= 12 ? 1 : 0.5;
    } else if (properties.subclass === 'tertiary_link') {
      color = '#ECEFF1';
      weight = zoom >= 14 ? 2 : zoom >= 12 ? 1 : 0.5;
    } else if (properties.class === 'service' || properties.class === 'unclassified' || properties.subclass === 'service' || properties.subclass === 'unclassified') {
      color = '#ECEFF1';
      weight = zoom >= 14 ? 1.5 : zoom >= 12 ? 1 : 0.5;
    } else if (properties.class === 'path' || properties.class === 'footway' || properties.class === 'steps' || properties.class === 'pedestrian' || properties.class === 'cycleway') {
      color = '#B0BEC5';
      weight = zoom >= 14 ? 1 : zoom >= 12 ? 0.5 : 0.3;
      dashArray = '2,2';
    } else if (properties.class === 'track' || properties.subclass === 'track') {
      color = '#B0BEC5';
      weight = zoom >= 14 ? 1 : zoom >= 12 ? 0.5 : 0.3;
      dashArray = '3,3';
    } else if (properties.class === 'bridleway' || properties.subclass === 'bridleway') {
      color = '#8D6E63';
      weight = zoom >= 14 ? 1.5 : zoom >= 12 ? 1 : 0.5;
      dashArray = '2,2';
    } else if (properties.class === 'construction' || properties.subclass === 'construction') {
      color = '#F06292';
      weight = zoom >= 14 ? 1.5 : zoom >= 12 ? 1 : 0.5;
      dashArray = '4,4';
    } else if (properties.class === 'raceway' || properties.subclass === 'raceway') {
      color = '#FF5722';
      weight = zoom >= 14 ? 2 : zoom >= 12 ? 1 : 0.5;
    }
    
    // Adjust for tunnels or bridges
    if (properties.brunnel === 'tunnel') {
      opacity = 0.6;
      dashArray = '4,4';
    } else if (properties.brunnel === 'bridge') {
      weight += 0.5;
    }
    
    // Adjust for access restrictions
    if (properties.access === 'private' || properties.access === 'no') {
      opacity = 0.7;
    }

    return {
      color,
      weight,
      opacity,
      dashArray,
    };
  },

  // Transportation names (points: road labels)
  transportation_name: (properties, zoom) => {
    if (zoom < 12) return { radius: 0 };
    let fontSize = zoom >= 15 ? 12 : zoom >= 12 ? 10 : 8;
    const name = properties['name:en'] || properties['name:de'] || properties.name || properties.ref || '';
    return {
      radius: 0,
      text: name,
      textOptions: {
        offset: [0, 0],
        font: {
          size: fontSize,
          family: 'Arial',
          weight: 'normal',
        },
        fillColor: '#000000',
        fillOpacity: 1,
        strokeColor: '#FFFFFF',
        strokeWidth: 2,
        textAlign: 'center',
      },
    };
  },

  // Aeroway (lines and polygons: runways, taxiways, airports)
  aeroway: (properties, zoom) => {
    if (properties.class === 'runway' || properties.subclass === 'runway') {
      return {
        color: '#ECEFF1',
        weight: zoom >= 12 ? 6 : zoom >= 8 ? 4 : 2,
        opacity: 0.9,
      };
    } else if (properties.class === 'taxiway' || properties.subclass === 'taxiway') {
      return {
        color: '#B0BEC5',
        weight: zoom >= 14 ? 3 : zoom >= 10 ? 2 : 1,
        opacity: 0.8,
      };
    } else {
      return {
        fill: true,
        fillColor: '#ECEFF1',
        fillOpacity: 0.7,
        color: '#78909C',
        weight: 0.5,
        opacity: 0.5,
      };
    }
  },

  // Aerodrome labels (points: airport names)
  aerodrome_label: (properties, zoom) => {
    if (zoom < 8) return { radius: 0 };
    let fontSize = zoom >= 12 ? 14 : zoom >= 10 ? 12 : 10;
    let fontWeight = properties.class === 'international' ? 'bold' : 'normal';
    const name = properties['name:en'] || properties['name:de'] || properties.name || properties.iata || properties.icao || '';
    return {
      radius: 0,
      text: name,
      textOptions: {
        offset: [0, 0],
        font: {
          size: fontSize,
          family: 'Arial',
          weight: fontWeight,
        },
        fillColor: '#000000',
        fillOpacity: 1,
        strokeColor: '#FFFFFF',
        strokeWidth: 3,
        textAlign: 'center',
      },
    };
  },

  // Boundaries (lines)
  boundary: (properties, zoom) => ({
    color: properties.admin_level <= 2 ? '#000000' : '#78909C',
    weight: properties.admin_level <= 2 ? (zoom >= 8 ? 2 : 1) : (zoom >= 10 ? 1 : 0.5),
    opacity: properties.disputed ? 0.5 : 0.7,
    dashArray: properties.disputed || properties.admin_level > 2 ? '4,4' : null,
  }),

  // House numbers (points)
  housenumber: (properties, zoom) => {
    if (zoom < 16) return { radius: 0 };
    return {
      radius: 0,
      text: properties.housenumber || '',
      textOptions: {
        offset: [0, 0],
        font: {
          size: 10,
          family: 'Arial',
          weight: 'normal',
        },
        fillColor: '#000000',
        fillOpacity: 1,
        strokeColor: '#FFFFFF',
        strokeWidth: 2,
        textAlign: 'center',
      },
    };
  },

  // Mountain peaks (points)
  mountain_peak: (properties, zoom) => {
    if (zoom < 10) return { radius: 0 };
    let fontSize = zoom >= 14 ? 12 : zoom >= 12 ? 10 : 8;
    let fontWeight = properties.rank <= 2 ? 'bold' : 'normal';
    const name = properties['name:en'] || properties['name:de'] || properties.name || '';
    const text = name || (properties.ele ? `${properties.ele}m` : '');
    return {
      radius: 0,
      text: text,
      textOptions: {
        offset: [0, 0],
        font: {
          size: fontSize,
          family: 'Arial',
          weight: fontWeight,
        },
        fillColor: '#5D4037',
        fillOpacity: 1,
        strokeColor: '#FFFFFF',
        strokeWidth: 2,
        textAlign: 'center',
      },
    };
  },

  // Points of Interest (points)
  poi: (properties, zoom) => {
    if (zoom < 12 && properties.rank > 2) return { radius: 0 };
    let radius = zoom >= 15 ? 6 : zoom >= 12 ? 4 : 2;
    let color = '#AB47BC';
    if (properties.class === 'hospital' || properties.class === 'clinic' || properties.subclass === 'hospital' || properties.subclass === 'clinic') {
      color = '#EF5350';
      radius = zoom >= 15 ? 8 : 6;
    } else if (properties.class === 'school' || properties.class === 'university' || properties.subclass === 'school' || properties.subclass === 'university') {
      color = '#FFA726';
      radius = zoom >= 15 ? 7 : 5;
    } else if (properties.class === 'shop' || properties.class === 'retail' || properties.subclass === 'shop' || properties.subclass === 'retail') {
      color = '#7E57C2';
    } else if (properties.class === 'restaurant' || properties.class === 'cafe' || properties.subclass === 'restaurant' || properties.subclass === 'cafe') {
      color = '#F06292';
    } else if (properties.class === 'tourism' || properties.class === 'attraction' || properties.subclass === 'tourism' || properties.subclass === 'attraction') {
      color = '#26A69A';
    }
    return {
      radius,
      fillColor: color,
      fillOpacity: 0.9,
      color: '#000000',
      weight: 1,
      opacity: 1,
    };
  },

  // Place labels (points: cities, towns, villages)
  place: (properties, zoom) => {
    if (zoom < 6) return { radius: 0 };
    if (properties.rank > 2 && zoom < 8) return { radius: 0 };
    if (properties.rank > 3 && zoom < 10) return { radius: 0 };

    let fontSize = properties.class === 'city' ? (zoom >= 10 ? 16 : 14) : properties.class === 'town' ? (zoom >= 12 ? 14 : 12) : 10;
    let fontWeight = properties.class === 'city' || properties.class === 'town' ? 'bold' : 'normal';
    const name = properties['name:en'] || properties['name:de'] || properties.name || '';
    return {
      radius: 0,
      text: name,
      textOptions: {
        offset: [0, 0],
        font: {
          size: fontSize,
          family: 'Arial',
          weight: fontWeight,
        },
        fillColor: '#000000',
        fillOpacity: 1,
        strokeColor: '#FFFFFF',
        strokeWidth: 3,
        textAlign: 'center',
      },
    };
  },

  // Default style to prevent unstyled features from rendering (e.g., default blue)
  default: (properties, zoom) => ({}),
};
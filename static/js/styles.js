const vectorTileLayerStyles = {
  // Water (polygons: oceans, lakes, rivers)
  water: (properties, zoom) => {
    if (zoom < 0 || zoom > 22) return { fillOpacity: 0, opacity: 0 };
    const isVisible = zoom >= 0 && zoom <= 20;
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
    if (zoom < 0 || zoom > 22) return { visible: false, opacity: 0, radius: 0 };
    return { visible: zoom >= 7 && zoom <= 20 };
  },

  // Waterways (lines: rivers, streams, canals)
  waterway: (properties, zoom) => {
    if (zoom < 0 || zoom > 22) return { opacity: 0 };
    const isVisible = zoom >= 4 && zoom <= 20;
    if (properties.class === 'stream' || properties.class === 'drain' || properties.class === 'river' || properties.class === 'canal') {
      return {
        color: properties.intermittent ? '#B3E5FC' : '#81D4FA',
        weight: isVisible ? (zoom >= 14 ? 2 : zoom >= 10 ? 1 : 0.5) : 0,
        opacity: isVisible ? 0.9 : 0,
        dashArray: isVisible && (properties.class === 'stream' || properties.class === 'drain') ? '3,3' : null,
      };
    }
    // Fallback for unhandled waterways
    return { opacity: 0, weight: 0 };
  },

  // Landcover (polygons: forests, grasslands, etc.)
  // Landcover (polygons: forests, grasslands, etc.)
  // Landcover (polygons: forests, grasslands, etc.)
  landcover: (properties, zoom) => {
    if (zoom < 0 || zoom > 22) return { fillOpacity: 0, opacity: 0 };
    const isVisible = zoom >= 7 && zoom <= 20;
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
    } else if (properties.class === 'farmland' || properties.subclass === 'farmland') {
      fillColor = '#E6EE9C';
      fillOpacity = isVisible ? 0.7 : 0;
    } else if (properties.class === 'rock') {
      fillColor = '#CFD8DC'; // Gray for rocky areas
      fillOpacity = isVisible ? 0.8 : 0;
    } else {
      // Fallback for unhandled landcover
      return { fillOpacity: 0, opacity: 0 };
    }
    return {
      fill: true,
      fillColor,
      fillOpacity,
      color: isVisible ? '#78909C' : 'transparent',
      weight: isVisible ? (zoom >= 14 ? 0.5 : 0.2) : 0,
      opacity: isVisible ? 0.5 : 0,
    };
  },

  // Landuse (polygons: residential, commercial, industrial, etc.)
  // Land Use (polygons)
  landuse: (properties, zoom) => {
    if (zoom < 0 || zoom > 22) return { color: 'transparent', opacity: 0 };
    const isVisible = zoom >= 6 && zoom <= 20;
    let color = '#F0F4C3'; // Default very light green
    let opacity = isVisible ? 0.8 : 0;
    const landuseClass = properties.class;

    if (
      landuseClass === 'residential' ||
      landuseClass === 'cemetery' ||
      landuseClass === 'commercial' ||
      landuseClass === 'industrial' ||
      landuseClass === 'retail' ||
      landuseClass === 'quarry' ||
      landuseClass === 'religious' ||
      landuseClass === 'education' ||
      landuseClass === 'school' ||
      landuseClass === 'college' ||
      landuseClass === 'garages' ||
      landuseClass === 'construction' ||
      landuseClass === 'library'
    ) {
      color = '#E8EAF6'; // Light blue-gray for built-up areas
    } else if (landuseClass === 'park' || landuseClass === 'recreation_ground' || landuseClass === 'recreation_area') {
      color = '#C8E6C9'; // Light green for parks and recreation
    } else if (landuseClass === 'forest' || landuseClass === 'wood') {
      color = '#B9F6CA'; // Lighter green for forests
    } else if (landuseClass === 'nature_reserve') {
      color = '#A5D6A7'; // Slightly darker green for nature reserves
    } else if (landuseClass === 'farm' || landuseClass === 'meadow' || landuseClass === 'grass' || landuseClass === 'farmyard' || landuseClass === 'farmland') {
      color = '#E6EE9C'; // Yellow-green for farmland and farmyards
    } else if (landuseClass === 'allotments') {
      color = '#DCE775'; // A bit darker yellow-green
    } else if (landuseClass === 'water_park' || landuseClass === 'playground' || landuseClass === 'dam') {
      color = '#81D4FA'; // Light blue for water parks, playgrounds, and dams
    } else if (landuseClass === 'aerodrome' || landuseClass === 'military') {
      color = '#CFD8DC'; // Gray for airports and military bases
    } else if (
      landuseClass === 'quarter' ||
      landuseClass === 'neighbourhood' ||
      landuseClass === 'suburb'
    ) {
      color = '#ECEFF1'; // Very light gray for administrative boundaries
    } else if (landuseClass === 'pitch' || landuseClass === 'stadium' || landuseClass === 'golf_course' || landuseClass === 'track') {
      color = '#C8E6C9';
    } else if (landuseClass === 'university' || landuseClass === 'hospital' || landuseClass === 'healthcare' || landuseClass === 'kindergarten') {
      color = '#B0BEC5'; // Lighter gray for universities, hospitals and kindergartens
    } else if (landuseClass === 'theme_park' || landuseClass === 'zoo' || landuseClass === 'attraction' || landuseClass === 'winter_sports') {
      color = '#A1887F'; // Brown for theme parks, zoos, and winter sports
    } else if (landuseClass === 'railway' || landuseClass === 'bus_station') {
      color = '#616161'; // Dark gray for railways and bus stations
    } else {
      // Fallback for any unhandled landuse feature
      return { color: 'transparent', opacity: 0 };
    }
    
    return { color, opacity };
  },

  // Park (polygons: parks, nature reserves)
  park: (properties, zoom) => {
    if (zoom < 0 || zoom > 22) return { fillOpacity: 0, opacity: 0 };
    const isVisible = zoom >= 4 && zoom <= 20;
    return {
      fill: true,
      fillColor: '#A5D6A7',
      fillOpacity: isVisible ? (zoom >= 10 ? 0.8 : 0.6) : 0,
      color: isVisible ? '#78909C' : 'transparent',
      weight: isVisible ? (zoom >= 14 ? 0.5 : 0.2) : 0,
      opacity: isVisible ? 0.5 : 0,
    };
  },

  // Buildings (polygons)
  building: (properties, zoom) => {
    if (zoom < 0 || zoom > 22) return { fillOpacity: 0, opacity: 0 };
    const isVisible = zoom >= 12 && zoom <= 20;
    return {
      fill: true,
      fillColor: properties.colour || (isVisible && zoom >= 15 ? '#78909C' : '#B0BEC5'),
      fillOpacity: isVisible ? (zoom >= 15 ? 0.9 : 0.7) : 0,
      color: isVisible ? '#455A64' : 'transparent',
      weight: isVisible ? (zoom >= 15 ? 1 : 0.5) : 0,
      opacity: isVisible ? 0.8 : 0,
    };
  },

  // Transportation (lines: all roads, including minor ones in towns)
  // Transportation (lines: all roads, including minor ones in towns)
  transportation: (properties, zoom) => {
    // Handle invalid zoom levels
    if (zoom < 0 || zoom > 22) return { color: 'transparent', weight: 0, opacity: 0 };

    const isVisible = zoom >= 2 && zoom <= 20;
    let weight = isVisible ? (zoom >= 16 ? 3 : zoom >= 14 ? 2 : zoom >= 12 ? 1.5 : zoom >= 8 ? 1 : 0.5) : 0;
    let color = '#ECEFF1'; // Default very light gray
    let opacity = isVisible ? 0.9 : 0;
    let dashArray = null;
    const roadClass = properties.class;
    const roadSubclass = properties.subclass;

    // Handle specific road types
    if (
      roadClass === 'motorway' ||
      roadClass === 'trunk' ||
      roadSubclass === 'motorway' ||
      roadSubclass === 'trunk' ||
      roadSubclass === 'motorway_link' ||
      roadSubclass === 'trunk_link'
    ) {
      color = '#FFCA28'; // Yellow
      weight = isVisible ? (zoom >= 12 ? 5 : zoom >= 8 ? 3 : 1.5) : 0;
    } else if (
      roadClass === 'primary' ||
      roadClass === 'secondary' ||
      roadSubclass === 'primary' ||
      roadSubclass === 'secondary' ||
      roadSubclass === 'primary_link' ||
      roadSubclass === 'secondary_link'
    ) {
      color = '#FFFFFF'; // White
      weight = isVisible ? (zoom >= 12 ? 3.5 : zoom >= 8 ? 2 : 1) : 0;
    } else if (
      roadClass === 'tertiary' ||
      roadClass === 'residential' ||
      roadClass === 'living_street' ||
      roadSubclass === 'tertiary' ||
      roadSubclass === 'residential' ||
      roadSubclass === 'living_street' ||
      roadSubclass === 'tertiary_link'
    ) {
      color = '#CFD8DC'; // Light gray
      weight = isVisible ? (zoom >= 14 ? 2 : zoom >= 10 ? 1 : 0.5) : 0;
    } else if (
      roadClass === 'service' ||
      roadClass === 'unclassified' ||
      roadSubclass === 'service' ||
      roadSubclass === 'unclassified' ||
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
      roadClass === 'path' ||
      roadClass === 'footway' ||
      roadClass === 'steps' ||
      roadClass === 'pedestrian' ||
      roadSubclass === 'path' ||
      roadSubclass === 'footway' ||
      roadSubclass === 'steps' ||
      roadSubclass === 'pedestrian'
    ) {
      color = '#B0BEC5'; // Lighter gray
      weight = isVisible ? (zoom >= 14 ? 1 : zoom >= 12 ? 0.5 : 0.3) : 0;
      dashArray = isVisible ? '2,2' : null;
    } else if (roadClass === 'track' || roadSubclass === 'track') {
      color = '#B0BEC5'; // Lighter gray
      weight = isVisible ? (zoom >= 14 ? 1 : zoom >= 12 ? 0.5 : 0.3) : 0;
      dashArray = isVisible ? '3,3' : null;
    } else if (
      roadClass === 'cycleway' ||
      roadSubclass === 'cycleway' ||
      properties.bicycle === 'yes' ||
      properties.bicycle === 'designated'
    ) {
      color = '#4CAF50'; // Green for cycleways
      weight = isVisible ? (zoom >= 14 ? 1.5 : zoom >= 12 ? 1 : 0.5) : 0;
      dashArray = isVisible ? '2,2' : null;
    } else if (
      roadClass === 'bridleway' ||
      roadSubclass === 'bridleway' ||
      properties.horse === 'yes' ||
      properties.horse === 'designated'
    ) {
      color = '#8D6E63'; // Brown for bridleways
      weight = isVisible ? (zoom >= 14 ? 1.5 : zoom >= 12 ? 1 : 0.5) : 0;
      dashArray = isVisible ? '2,2' : null;
    } else if (roadClass === 'construction' || roadSubclass === 'construction' || roadClass.includes('_construction')) {
      color = '#F06292'; // Pink for construction roads
      weight = isVisible ? (zoom >= 14 ? 1.5 : zoom >= 12 ? 1 : 0.5) : 0;
      dashArray = isVisible ? '4,4' : null;
    } else if (roadClass === 'raceway' || roadSubclass === 'raceway') {
      color = '#FF5722'; // Orange for raceways
      weight = isVisible ? (zoom >= 14 ? 2 : zoom >= 12 ? 1 : 0.5) : 0;
    } else if (
      roadClass === 'busway' ||
      roadClass === 'corridor' ||
      roadSubclass === 'busway' ||
      roadSubclass === 'corridor'
    ) {
      color = '#78909C'; // Gray for busways and corridors
      weight = isVisible ? (zoom >= 14 ? 1.5 : zoom >= 12 ? 1 : 0.5) : 0;
    } else if (roadClass === 'ferry') {
      color = '#00796B'; // Teal for ferries
      weight = isVisible ? (zoom >= 10 ? 2 : 1) : 0;
      dashArray = isVisible ? '6,3' : null;
    } else if (
      roadClass === 'rail' ||
      roadSubclass === 'rail' ||
      roadSubclass === 'narrow_gauge' ||
      roadClass === 'transit' ||
      roadSubclass === 'light_rail'
    ) {
      color = '#616161'; // Dark gray for railways and light rail
      weight = isVisible ? (zoom >= 14 ? 1.5 : zoom >= 12 ? 1 : 0.5) : 0;
      dashArray = isVisible ? '1,3' : null;
    } else if (roadClass === 'minor') {
      color = '#D3D3D3'; // Light gray for minor roads
      weight = isVisible ? (zoom >= 14 ? 1.5 : zoom >= 12 ? 1 : 0.5) : 0;
    } else if (roadClass === 'pier') {
      color = '#D7CCC8'; // Light brown/gray for piers
      weight = isVisible ? (zoom >= 14 ? 1.5 : zoom >= 12 ? 1 : 0.5) : 0;
    } else if (roadClass === 'aerialway' || roadSubclass === 'platter') {
      color = '#78909C'; // Gray for aerialways
      weight = isVisible ? (zoom >= 14 ? 1 : 0.5) : 0;
      dashArray = isVisible ? '4,4' : null;
    } else if (properties.brunnel === 'bridge') {
      color = '#A9A9A9'; // Darker gray for bridges
      weight = isVisible ? (zoom >= 14 ? 2 : zoom >= 12 ? 1.5 : 1) : 0;
    } else {
      // Fallback for any unhandled transportation feature
      return { color: 'transparent', weight: 0, opacity: 0 };
    }

    // Apply additional properties
    if (properties.surface === 'unpaved' || properties.surface === 'gravel' || properties.surface === 'dirt') {
      color = '#A1887F'; // Brownish for unpaved
      dashArray = isVisible ? '3,3' : null;
    }
    if (properties.toll === 1 || properties.toll === 'yes') {
      color = '#D81B60'; // Red for toll roads
    }
    if (properties.brunnel === 'tunnel') {
      opacity = isVisible ? 0.6 : 0;
      dashArray = isVisible ? '4,4' : null;
    } else if (properties.brunnel === 'bridge') {
      weight = isVisible ? weight + 0.5 : 0;
    }
    if (properties.access === 'private' || properties.access === 'no') {
      opacity = isVisible ? 0.7 : 0;
    }

    return { color, weight, opacity, dashArray };
  },

  // Transportation names (points: road labels)
  transportation_name: (properties, zoom) => {
    if (zoom < 0 || zoom > 22) return { visible: false };
    return { visible: zoom >= 6 && zoom <= 20 };
  },

  // Aeroway (lines and polygons: runways, taxiways, airports)
  aeroway: (properties, zoom) => {
    if (zoom < 0 || zoom > 22) return { opacity: 0, fillOpacity: 0 };
    const isVisible = zoom >= 10 && zoom <= 20;
    if (properties.class === 'runway' || properties.subclass === 'runway') {
      return {
        color: isVisible ? '#ECEFF1' : 'transparent',
        weight: isVisible ? (zoom >= 12 ? 6 : zoom >= 8 ? 4 : 2) : 0,
        opacity: isVisible ? 0.9 : 0,
      };
    } else if (properties.class === 'taxiway' || properties.subclass === 'taxiway') {
      return {
        color: isVisible ? '#B0BEC5' : 'transparent',
        weight: isVisible ? (zoom >= 14 ? 3 : zoom >= 10 ? 2 : 1) : 0,
        opacity: isVisible ? 0.8 : 0,
      };
    } else {
      return {
        fill: true,
        fillColor: isVisible ? '#ECEFF1' : 'transparent',
        fillOpacity: isVisible ? 0.7 : 0,
        color: isVisible ? '#78909C' : 'transparent',
        weight: isVisible ? 0.5 : 0,
        opacity: isVisible ? 0.5 : 0,
      };
    }
  },

  // Aerodrome labels (points: airport names)
  aerodrome_label: (properties, zoom) => {
    if (zoom < 0 || zoom > 22) return { visible: false, opacity: 0, radius: 0 };
    return { visible: zoom >= 8 && zoom <= 20 };
  },

  // Boundaries (lines)
  boundary: (properties, zoom) => {
    if (zoom < 0 || zoom > 22) return { opacity: 0 };
    const isVisible = zoom >= 0 && zoom <= 20;
    let color = isVisible ? (properties.admin_level <= 2 ? '#000000' : properties.maritime === 1 ? '#0288D1' : '#78909C') : 'transparent';
    let weight = isVisible ? (properties.admin_level <= 2 ? (zoom >= 8 ? 2 : 1) : (zoom >= 10 ? 1 : 0.5)) : 0;
    let opacity = isVisible ? (properties.disputed ? 0.5 : 0.7) : 0;
    let dashArray = isVisible && (properties.disputed || properties.maritime === 1) ? '4,4' : null;
    return { color, weight, opacity, dashArray };
  },

  // House numbers (points)
  housenumber: (properties, zoom) => {
    if (zoom < 0 || zoom > 22) return { visible: false, opacity: 0, radius: 0 };
    return { visible: zoom >= 14 && zoom <= 20 };
  },

  // Mountain peaks (points)
  mountain_peak: (properties, zoom) => {
    if (zoom < 0 || zoom > 22) return { visible: false, opacity: 0, radius: 0 };
    return { visible: zoom >= 7 && zoom <= 20 };
  },

  // Points of Interest (points)
  // Points of Interest (points)
  // Points of Interest (points)
  poi: (properties, zoom) => {
    if (zoom < 0 || zoom > 22) return { 'circle-opacity': 0, 'circle-radius': 0 };
    const isVisible = zoom >= 12 && zoom <= 20;
    let radius = isVisible ? (zoom >= 15 ? 6 : zoom >= 12 ? 4 : 2) : 0;
    let color = '#AB47BC'; // Default purple for general POIs
    const poiClass = properties.class;
    const poiSubclass = properties.subclass;

    if (
      poiClass === 'hospital' ||
      poiClass === 'clinic' ||
      poiSubclass === 'hospital' ||
      poiSubclass === 'clinic' ||
      poiSubclass === 'doctors'
    ) {
      color = '#EF5350'; // Red for hospitals, clinics, and doctors
      radius = isVisible ? (zoom >= 15 ? 8 : 6) : 0;
    } else if (
      poiClass === 'school' ||
      poiClass === 'university' ||
      poiSubclass === 'school' ||
      poiSubclass === 'university'
    ) {
      color = '#FFA726'; // Orange for schools
      radius = isVisible ? (zoom >= 15 ? 7 : 5) : 0;
    } else if (
      poiClass === 'shop' ||
      poiClass === 'retail' ||
      poiSubclass === 'shop' ||
      poiSubclass === 'retail' ||
      poiSubclass === 'supermarket' ||
      poiSubclass === 'bakery' ||
      poiSubclass === 'butcher' ||
      poiClass === 'alcohol_shop' ||
      poiSubclass === 'alcohol' ||
      poiClass === 'grocery' ||
      poiClass === 'clothing_store'
    ) {
      color = '#7E57C2'; // Darker purple for shops and related categories
    } else if (
      poiClass === 'restaurant' ||
      poiClass === 'cafe' ||
      poiSubclass === 'restaurant' ||
      poiSubclass === 'cafe' ||
      poiClass === 'fast_food' ||
      poiSubclass === 'fast_food' ||
      poiClass === 'ice_cream'
    ) {
      color = '#F06292'; // Pink for restaurants, cafes, fast food, and ice cream
    } else if (
      poiClass === 'tourism' ||
      poiClass === 'attraction' ||
      poiSubclass === 'tourism' ||
      poiSubclass === 'attraction'
    ) {
      color = '#26A69A'; // Teal for tourism
    } else if (
      poiClass === 'landmark' ||
      poiClass === 'monument' ||
      poiClass === 'memorial' ||
      poiClass === 'museum' ||
      poiSubclass === 'landmark' ||
      poiSubclass === 'monument' ||
      poiSubclass === 'memorial' ||
      poiSubclass === 'museum' ||
      poiClass === 'art_gallery'
    ) {
      color = '#D81B60'; // Reddish-pink for landmarks/monuments and art galleries
      radius = isVisible ? (zoom >= 15 ? 8 : 6) : 0;
    } else if (
      poiClass === 'ferry_terminal' ||
      poiSubclass === 'ferry_terminal'
    ) {
      color = '#00796B'; // Teal to match ferry lines
      radius = isVisible ? (zoom >= 15 ? 7 : 5) : 0;
    } else if (
      poiClass === 'station' ||
      poiClass === 'subway' ||
      poiSubclass === 'station' ||
      poiSubclass === 'subway' ||
      poiClass === 'railway' ||
      poiSubclass === 'train_station'
    ) {
      color = '#0288D1'; // Blue for transit stations
      radius = isVisible ? (zoom >= 15 ? 7 : 5) : 0;
    } else if (
      poiClass === 'harbor' ||
      poiSubclass === 'marina'
    ) {
      color = '#4FC3F7'; // Light blue for harbors/marinas
      radius = isVisible ? (zoom >= 15 ? 7 : 5) : 0;
    } else if (
      poiClass === 'campsite' ||
      poiSubclass === 'camp_site' ||
      poiSubclass === 'caravan_site'
    ) {
      color = '#A5D6A7'; // Green for campsites
      radius = isVisible ? (zoom >= 15 ? 6 : 4) : 0;
    } else if (
      poiClass === 'golf' ||
      poiSubclass === 'golf_course'
    ) {
      color = '#4CAF50'; // Darker green for golf courses
      radius = isVisible ? (zoom >= 15 ? 6 : 4) : 0;
    } else if (
      poiClass === 'recycling' ||
      poiSubclass === 'recycling'
    ) {
      color = '#8BC34A'; // Light green for recycling
      radius = isVisible ? (zoom >= 15 ? 5 : 3) : 0;
    } else if (
      poiClass === 'office' ||
      poiSubclass === 'company'
    ) {
      color = '#78909C'; // Gray for offices/companies
      radius = isVisible ? (zoom >= 15 ? 5 : 3) : 0;
    } else if (
      poiClass === 'bicycle_rental' ||
      poiSubclass === 'bicycle_rental' ||
      poiClass === 'bicycle'
    ) {
      color = '#4CAF50'; // Green for bicycle rentals and shops (matches cycleways)
      radius = isVisible ? (zoom >= 15 ? 5 : 3) : 0;
    } else if (
      poiClass === 'lodging' ||
      poiSubclass === 'guest_house'
    ) {
      color = '#F06292'; // Pink for lodging (matches restaurants)
      radius = isVisible ? (zoom >= 15 ? 6 : 4) : 0;
    } else if (
      poiClass === 'fuel' ||
      poiSubclass === 'charging_station'
    ) {
      color = '#FF5722'; // Orange for fuel/charging stations
      radius = isVisible ? (zoom >= 15 ? 5 : 3) : 0;
    } else if (
      poiClass === 'parking' ||
      poiSubclass === 'parking'
    ) {
      color = '#B0BEC5'; // Light gray for parking
      radius = isVisible ? (zoom >= 15 ? 5 : 3) : 0;
    } else if (
      poiClass === 'fire_station' ||
      poiSubclass === 'fire_station'
    ) {
      color = '#D32F2F'; // Dark red for fire stations
      radius = isVisible ? (zoom >= 15 ? 7 : 5) : 0;
    } else if (
      poiClass === 'sports_centre' ||
      poiSubclass === 'sports_centre' ||
      poiClass === 'athletics'
    ) {
      color = '#A5D6A7'; // Green for sports centres (matches parks)
      radius = isVisible ? (zoom >= 15 ? 6 : 4) : 0;
    } else if (
      poiClass === 'waste_basket' ||
      poiSubclass === 'waste_basket'
    ) {
      color = '#B0BEC5'; // Gray for waste baskets
      radius = isVisible ? (zoom >= 15 ? 4 : 2) : 0;
    } else if (
      poiClass === 'bicycle_parking' ||
      poiSubclass === 'bicycle_parking'
    ) {
      color = '#4CAF50'; // Green for bicycle parking
      radius = isVisible ? (zoom >= 15 ? 5 : 3) : 0;
    } else if (
      poiClass === 'bollard' ||
      poiSubclass === 'bollard' ||
      poiClass === 'gate' ||
      poiClass === 'stile' ||
      poiClass === 'lift_gate'
    ) {
      color = '#78909C'; // Gray for bollards, gates, stiles, and lift gates
      radius = isVisible ? (zoom >= 15 ? 3 : 2) : 0;
    } else if (
      poiClass === 'information' ||
      poiSubclass === 'map'
    ) {
      color = '#0288D1'; // Blue for information points/maps
      radius = isVisible ? (zoom >= 15 ? 5 : 3) : 0;
    } else if (
      poiClass === 'pitch' ||
      poiSubclass === 'soccer'
    ) {
      color = '#4CAF50'; // Green for pitches/soccer fields
      radius = isVisible ? (zoom >= 15 ? 7 : 5) : 0;
    } else if (
      poiClass === 'swimming_pool' ||
      poiSubclass === 'swimming_pool'
    ) {
      color = '#4FC3F7'; // Light blue for swimming pools
      radius = isVisible ? (zoom >= 15 ? 7 : 5) : 0;
    } else if (
      poiClass === 'playground' ||
      poiSubclass === 'playground' ||
      poiClass === 'dog_park'
    ) {
      color = '#FFA726'; // Orange for playgrounds and dog parks
      radius = isVisible ? (zoom >= 15 ? 6 : 4) : 0;
    } else if (
      poiClass === 'atm' ||
      poiSubclass === 'atm' ||
      poiClass === 'bank'
    ) {
      color = '#009688'; // Teal for ATMs and banks
      radius = isVisible ? (zoom >= 15 ? 5 : 3) : 0;
    } else if (
      poiClass === 'cycle_barrier' ||
      poiSubclass === 'cycle_barrier'
    ) {
      color = '#B0BEC5'; // Light gray for cycle barriers
      radius = isVisible ? (zoom >= 15 ? 3 : 2) : 0;
    } else if (
      poiClass === 'garden' ||
      poiSubclass === 'garden' ||
      poiClass === 'park'
    ) {
      color = '#A5D6A7'; // Green for gardens and parks
      radius = isVisible ? (zoom >= 15 ? 6 : 4) : 0;
    } else if (
      poiClass === 'place_of_worship' ||
      poiClass === 'shelter'
    ) {
      color = '#FBC02D'; // Gold/yellow for places of worship and shelters
      radius = isVisible ? (zoom >= 15 ? 7 : 5) : 0;
    } else if (
      poiClass === 'cemetery' ||
      poiSubclass === 'grave_yard'
    ) {
      color = '#CFD8DC'; // Light gray for cemeteries
      radius = isVisible ? (zoom >= 15 ? 6 : 4) : 0;
    } else if (
      poiClass === 'post' ||
      poiSubclass === 'post_box'
    ) {
      color = '#D32F2F'; // Dark red for post boxes
      radius = isVisible ? (zoom >= 15 ? 4 : 2) : 0;
    } else if (
      poiClass === 'bus' ||
      poiSubclass === 'bus_stop'
    ) {
      color = '#388E3C'; // Dark green for bus stops
      radius = isVisible ? (zoom >= 15 ? 6 : 4) : 0;
    } else if (
      poiClass === 'car' ||
      poiSubclass === 'car_repair'
    ) {
      color = '#78909C'; // Gray for car-related POIs
      radius = isVisible ? (zoom >= 15 ? 5 : 3) : 0;
    } else if (
      poiClass === 'running'
    ) {
      color = '#8D6E63'; // Brown for running routes/areas
      radius = isVisible ? (zoom >= 15 ? 6 : 4) : 0;
    } else if (
      poiClass === 'dentist' ||
      poiClass === 'pharmacy' ||
      poiClass === 'hairdresser'
    ) {
      color = '#00ACC1'; // Light blue/cyan for health-related POIs and hairdressers
      radius = isVisible ? (zoom >= 15 ? 6 : 4) : 0;
    } else if (
      poiClass === 'town_hall' ||
      poiClass === 'community_centre' ||
      poiClass === 'library'
    ) {
      color = '#FFD54F'; // Yellow for civic/community buildings
      radius = isVisible ? (zoom >= 15 ? 7 : 5) : 0;
    } else if (
      poiClass === 'bar' ||
      poiClass === 'beer' ||
      poiClass === 'pub'
    ) {
      color = '#8D6E63'; // Brown for bars and pubs
      radius = isVisible ? (zoom >= 15 ? 6 : 4) : 0;
    } else if (
      poiClass === 'laundry' ||
      poiClass === 'dry_cleaning'
    ) {
      color = '#4DB6AC'; // Green-blue for laundry services
      radius = isVisible ? (zoom >= 15 ? 5 : 3) : 0;
    } else if (
      poiClass === 'theatre'
    ) {
      color = '#673AB7'; // Deep purple for theaters
      radius = isVisible ? (zoom >= 15 ? 8 : 6) : 0;
    } else if (
      poiClass === 'zoo'
    ) {
      color = '#8BC34A'; // Light green for zoos
      radius = isVisible ? (zoom >= 15 ? 8 : 6) : 0;
    } else if (
      poiClass === 'picnic_site'
    ) {
      color = '#A5D6A7'; // Green for picnic sites
      radius = isVisible ? (zoom >= 15 ? 5 : 3) : 0;
    } else if (
      poiClass === 'drinking_water' ||
      poiClass === 'toilets'
    ) {
      color = '#4FC3F7'; // Light blue for drinking water and toilets
      radius = isVisible ? (zoom >= 15 ? 5 : 3) : 0;
    } else if (
      poiClass === 'tennis'
    ) {
      color = '#4CAF50'; // Green for tennis courts
      radius = isVisible ? (zoom >= 15 ? 6 : 4) : 0;
    } else {
      // Hide all unhandled POIs
      radius = 0;
    }

    return {
      'circle-radius': radius,
      'circle-color': color,
      'circle-opacity': isVisible && radius > 0 ? 0.9 : 0,
      'circle-stroke-color': isVisible && radius > 0 ? '#000000' : 'transparent',
      'circle-stroke-width': isVisible && radius > 0 ? 1 : 0,
      'circle-stroke-opacity': isVisible && radius > 0 ? 1 : 0,
    };
  },

  // Place labels (points: cities, towns, villages)
  place: (properties, zoom) => {
    if (zoom < 0 || zoom > 22) return { visible: false };
    return { visible: zoom >= 2 && zoom <= 20 };
  },

  // Default style to prevent unstyled features from rendering with library's default (#3388FF)
  default: (properties, zoom) => {
    // This function is not used by the renderer but remains as a placeholder for other libraries
    return { opacity: 0, weight: 0, radius: 0 };
  },
};
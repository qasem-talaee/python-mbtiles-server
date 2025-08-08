const vectorTileLayerStyles = {

    // Aeroway (lines or polygons: runways, taxiways)
    aeroway: (properties, zoom) => {
        if (zoom < 0 || zoom > 22) return {
            opacity: 0,
            weight: 0,
            fillOpacity: 0
        };
        const isVisible = zoom >= 10 && zoom <= 14;
        let style = {
            color: '#78909C',
            weight: isVisible ? (zoom >= 12 ? 2 : 1) : 0,
            opacity: isVisible ? 0.8 : 0,
            fill: true,
            fillColor: '#B0BEC5',
            fillOpacity: isVisible ? 0.6 : 0,
        };
        if (properties.class === 'aerodrome' || properties.subclass === 'aerodrome') {
            return {
                fill: true,
                fillColor: isVisible ? '#ECEFF1' : 'transparent',
                fillOpacity: isVisible ? 0.7 : 0,
                color: isVisible ? '#78909C' : 'transparent',
                weight: isVisible ? 0.5 : 0,
                opacity: isVisible ? 0.5 : 0,
            };
        } else if (properties.class === 'apron' || properties.subclass === 'apron') {
            return {
                fill: true,
                fillColor: isVisible ? '#B0BEC5' : 'transparent',
                fillOpacity: isVisible ? 0.8 : 0,
                color: isVisible ? '#78909C' : 'transparent',
                weight: isVisible ? 0.5 : 0,
                opacity: isVisible ? 0.5 : 0,
            };
        } else if (properties.class === 'runway' || properties.subclass === 'runway') {
            return {
                color: isVisible ? '#CFD8DC' : 'transparent',
                weight: isVisible ? (zoom >= 12 ? 6 : zoom >= 8 ? 4 : 2) : 0,
                opacity: isVisible ? 0.9 : 0,
            };
        } else if (properties.class === 'taxiway' || properties.subclass === 'taxiway') {
            return {
                color: isVisible ? '#9E9E9E' : 'transparent',
                weight: isVisible ? (zoom >= 14 ? 3 : zoom >= 10 ? 2 : 1) : 0,
                opacity: isVisible ? 0.8 : 0,
            };
        } else if (properties.class === 'heliport' || properties.class === 'helipad') {
            return {
                fill: true,
                fillColor: isVisible ? '#607D8B' : 'transparent',
                fillOpacity: isVisible ? 0.9 : 0,
                color: isVisible ? '#455A64' : 'transparent',
                weight: isVisible ? 0.5 : 0,
                opacity: isVisible ? 0.5 : 0,
            };
        } else if (properties.class === 'gate') {
            return {
                opacity: 0,
                weight: 0,
                fillOpacity: 0,
                color: 'transparent',
                fillColor: 'transparent'
            };
        } else {
            console.log("Unhandled aeroway class:", properties.class);
            return {
                opacity: 0,
                weight: 0,
                fillOpacity: 0,
                color: 'transparent',
                fillColor: 'transparent'
            };
        }
    },

    // Water (polygons: oceans, lakes, rivers)
    water: (properties, zoom) => {
        if (zoom < 0 || zoom > 22) return {
            fillOpacity: 0,
            opacity: 0,
            weight: 0
        };
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

    // Waterways (lines: rivers, streams, canals)
    waterway: (properties, zoom) => {
        if (zoom < 0 || zoom > 22) return {
            opacity: 0,
            weight: 0
        };
        const isVisible = zoom >= 4 && zoom <= 20;
        if (properties.class === 'stream' || properties.class === 'drain' || properties.class === 'river' || properties.class === 'canal') {
            return {
                color: properties.intermittent ? '#B3E5FC' : '#81D4FA',
                weight: isVisible ? (zoom >= 14 ? 2 : zoom >= 10 ? 1 : 0.5) : 0,
                opacity: isVisible ? 0.9 : 0,
                dashArray: isVisible && (properties.class === 'stream' || properties.class === 'drain') ? '3,3' : null,
            };
        } else if (properties.class === 'ditch') {
            return {
                color: properties.intermittent ? '#B3E5FC' : '#81D4FA',
                weight: isVisible ? (zoom >= 14 ? 1 : 0.5) : 0,
                opacity: isVisible ? 0.9 : 0,
                dashArray: isVisible ? '3,3' : null,
            };
        }
        // Fallback for unhandled waterways
        console.log("Unhandled waterway class:", properties.class);
        return {
            opacity: 0,
            weight: 0
        };
    },

    // Landcover (polygons: forests, grasslands, etc.)
    landcover: (properties, zoom) => {
        if (zoom < 0 || zoom > 22) return {
            fillOpacity: 0,
            opacity: 0,
            weight: 0
        };
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
            fillColor = '#CFD8DC';
            fillOpacity = isVisible ? 0.8 : 0;
        } else {
            // Fallback for unhandled landcover
            console.log("Unhandled landcover class:", properties.class);
            return {
                fillOpacity: 0,
                opacity: 0,
                weight: 0
            };
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

    // Landuse (polygons)
    landuse: (properties, zoom) => {
        if (zoom < 0 || zoom > 22) return {
            fillOpacity: 0,
            opacity: 0,
            weight: 0
        };
        const isVisible = zoom >= 7 && zoom <= 20;
        let fillColor = 'transparent';
        const landuseClass = properties.class;
        if (landuseClass === 'park' || landuseClass === 'nature_reserve' || landuseClass === 'recreation_ground') {
            fillColor = '#C8E6C9';
        } else if (landuseClass === 'cemetery') {
            fillColor = '#CFD8DC';
        } else if (landuseClass === 'forest' || landuseClass === 'wood') {
            fillColor = '#A5D6A7';
        } else if (
            landuseClass === 'industrial' ||
            landuseClass === 'brownfield' ||
            landuseClass === 'commercial' ||
            landuseClass === 'retail' ||
            landuseClass === 'construction'
        ) {
            fillColor = '#BDBDBD';
        } else if (
            landuseClass === 'residential' ||
            landuseClass === 'suburb' ||
            landuseClass === 'quarter' ||
            landuseClass === 'neighbourhood'
        ) {
            fillColor = '#E0E0E0';
        } else if (
            landuseClass === 'farmland' ||
            landuseClass === 'farmyard' ||
            landuseClass === 'allotments' ||
            landuseClass === 'orchard' ||
            landuseClass === 'animal_keeping'
        ) {
            fillColor = '#D4E157';
        } else if (landuseClass === 'grass' || landuseClass === 'meadow') {
            fillColor = '#C5E1A5';
        } else if (landuseClass === 'hospital' || landuseClass === 'healthcare') {
            fillColor = '#EF5350';
        } else if (landuseClass === 'military') {
            fillColor = '#8B0000';
        } else if (
            landuseClass === 'university' ||
            landuseClass === 'school' ||
            landuseClass === 'education' ||
            landuseClass === 'college' ||
            landuseClass === 'kindergarten'
        ) {
            fillColor = '#FFA726';
        } else if (
            landuseClass === 'pitch' ||
            landuseClass === 'stadium'
        ) {
            fillColor = '#4CAF50';
        } else if (
            landuseClass === 'theme_park' ||
            landuseClass === 'zoo' ||
            landuseClass === 'attraction'
        ) {
            fillColor = '#FF69B4';
        } else if (landuseClass === 'quarry') {
            fillColor = '#808080';
        } else if (
            landuseClass === 'railway' ||
            landuseClass === 'track'
        ) {
            fillColor = '#616161';
        } else if (landuseClass === 'bus_station') {
            fillColor = '#388E3C';
        } else if (landuseClass === 'playground') {
            fillColor = '#FFA726';
        } else if (landuseClass === 'garages') {
            fillColor = '#B0BEC5';
        } else if (landuseClass === 'restaurant') {
            fillColor = '#F06292';
        } else if (landuseClass === 'golf_course') {
            fillColor = '#4CAF50';
        } else if (landuseClass === 'dam') {
            fillColor = '#4FC3F7';
        } else if (landuseClass === 'fountain') {
            fillColor = '#4FC3F7';
        } else {
            console.log("Unhandled landuse class:", landuseClass);
            fillColor = 'transparent';
        }
        return {
            fill: true,
            fillColor,
            fillOpacity: isVisible ? 0.6 : 0,
            color: 'transparent',
            weight: 0,
            opacity: 0,
        };
    },

    // Park (polygons: parks, nature reserves)
    park: (properties, zoom) => {
        if (zoom < 0 || zoom > 22) return {
            fillOpacity: 0,
            opacity: 0,
            weight: 0
        };
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
        if (zoom < 0 || zoom > 22) return {
            fillOpacity: 0,
            opacity: 0,
            weight: 0
        };
        const isVisible = zoom >= 14 && zoom <= 20;
        return {
            fill: true,
            fillColor: '#EEEEEE',
            fillOpacity: isVisible ? 0.7 : 0,
            color: '#9E9E9E',
            weight: isVisible ? 0.5 : 0,
            opacity: isVisible ? 1 : 0,
        };
    },

    // Transportation (lines: all roads, including minor ones in towns)
    transportation: (properties, zoom) => {
        if (zoom < 0 || zoom > 22) return {
            color: 'transparent',
            weight: 0,
            opacity: 0
        };
        const isVisible = zoom >= 2 && zoom <= 20;
        let weight = isVisible ? (zoom >= 16 ? 3 : zoom >= 14 ? 2 : zoom >= 12 ? 1.5 : zoom >= 8 ? 1 : 0.5) : 0;
        let color = '#ECEFF1';
        let opacity = isVisible ? 0.9 : 0;
        let dashArray = null;
        const roadClass = properties.class;
        const roadSubclass = properties.subclass;

        if (
            roadClass === 'motorway' ||
            roadClass === 'trunk' ||
            roadSubclass === 'motorway' ||
            roadSubclass === 'trunk' ||
            roadSubclass === 'motorway_link' ||
            roadSubclass === 'trunk_link'
        ) {
            color = '#FFCA28';
            weight = isVisible ? (zoom >= 12 ? 5 : zoom >= 8 ? 3 : 1.5) : 0;
        } else if (
            roadClass === 'primary' ||
            roadClass === 'secondary' ||
            roadSubclass === 'primary' ||
            roadSubclass === 'secondary' ||
            roadSubclass === 'primary_link' ||
            roadSubclass === 'secondary_link'
        ) {
            color = '#FFFFFF';
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
            color = '#CFD8DC';
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
            color = '#ECEFF1';
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
            color = '#B0BEC5';
            weight = isVisible ? (zoom >= 14 ? 1 : zoom >= 12 ? 0.5 : 0.3) : 0;
            dashArray = isVisible ? '2,2' : null;
        } else if (roadClass === 'track' || roadSubclass === 'track') {
            color = '#B0BEC5';
            weight = isVisible ? (zoom >= 14 ? 1 : zoom >= 12 ? 0.5 : 0.3) : 0;
            dashArray = isVisible ? '3,3' : null;
        } else if (
            roadClass === 'cycleway' ||
            roadSubclass === 'cycleway' ||
            properties.bicycle === 'yes' ||
            properties.bicycle === 'designated'
        ) {
            color = '#4CAF50';
            weight = isVisible ? (zoom >= 14 ? 1.5 : zoom >= 12 ? 1 : 0.5) : 0;
            dashArray = isVisible ? '2,2' : null;
        } else if (
            roadClass === 'bridleway' ||
            roadSubclass === 'bridleway' ||
            properties.horse === 'yes' ||
            properties.horse === 'designated'
        ) {
            color = '#8D6E63';
            weight = isVisible ? (zoom >= 14 ? 1.5 : zoom >= 12 ? 1 : 0.5) : 0;
            dashArray = isVisible ? '2,2' : null;
        } else if (roadClass === 'construction' || roadSubclass === 'construction' || roadClass.includes('_construction')) {
            color = '#F06292';
            weight = isVisible ? (zoom >= 14 ? 1.5 : zoom >= 12 ? 1 : 0.5) : 0;
            dashArray = isVisible ? '4,4' : null;
        } else if (roadClass === 'raceway' || roadSubclass === 'raceway') {
            color = '#FF5722';
            weight = isVisible ? (zoom >= 14 ? 2 : zoom >= 12 ? 1 : 0.5) : 0;
        } else if (
            roadClass === 'busway' ||
            roadClass === 'corridor' ||
            roadSubclass === 'busway' ||
            roadSubclass === 'corridor'
        ) {
            color = '#78909C';
            weight = isVisible ? (zoom >= 14 ? 1.5 : zoom >= 12 ? 1 : 0.5) : 0;
        } else if (roadClass === 'ferry') {
            color = '#00796B';
            weight = isVisible ? (zoom >= 10 ? 2 : 1) : 0;
            dashArray = isVisible ? '6,3' : null;
        } else if (
            roadClass === 'rail' ||
            roadSubclass === 'rail' ||
            roadSubclass === 'narrow_gauge' ||
            roadClass === 'transit' ||
            roadSubclass === 'light_rail'
        ) {
            color = '#616161';
            weight = isVisible ? (zoom >= 14 ? 1.5 : zoom >= 12 ? 1 : 0.5) : 0;
            dashArray = isVisible ? '1,3' : null;
        } else if (roadClass === 'minor') {
            color = '#D3D3D3';
            weight = isVisible ? (zoom >= 14 ? 1.5 : zoom >= 12 ? 1 : 0.5) : 0;
        } else if (roadClass === 'pier') {
            color = '#D7CCC8';
            weight = isVisible ? (zoom >= 14 ? 1.5 : zoom >= 12 ? 1 : 0.5) : 0;
        } else if (roadClass === 'aerialway' || roadSubclass === 'platter') {
            color = '#78909C';
            weight = isVisible ? (zoom >= 14 ? 1 : 0.5) : 0;
            dashArray = isVisible ? '4,4' : null;
        } else if (properties.brunnel === 'bridge') {
            color = '#A9A9A9';
            weight = isVisible ? (zoom >= 14 ? 2 : zoom >= 12 ? 1.5 : 1) : 0;
        } else {
            // Fallback for unhandled transportation
            console.log("Unhandled transportation class:", properties.class);
            return {
                color: 'transparent',
                weight: 0,
                opacity: 0
            };
        }

        if (properties.surface === 'unpaved' || properties.surface === 'gravel' || properties.surface === 'dirt') {
            color = '#A1887F';
            dashArray = isVisible ? '3,3' : null;
        }
        if (properties.toll === 1 || properties.toll === 'yes') {
            color = '#D81B60';
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

        return {
            color,
            weight,
            opacity,
            dashArray
        };
    },

    // Aeroway (lines and polygons: runways, taxiways, airports)
    aeroway: (properties, zoom) => {
        if (zoom < 0 || zoom > 22) return {
            opacity: 0,
            fillOpacity: 0,
            weight: 0
        };
        const isVisible = zoom >= 10 && zoom <= 20;
        if (properties.class === 'aerodrome' || properties.subclass === 'aerodrome') {
            return {
                fill: true,
                fillColor: isVisible ? '#ECEFF1' : 'transparent',
                fillOpacity: isVisible ? 0.7 : 0,
                color: isVisible ? '#78909C' : 'transparent',
                weight: isVisible ? 0.5 : 0,
                opacity: isVisible ? 0.5 : 0,
            };
        } else if (properties.class === 'apron' || properties.subclass === 'apron') {
            return {
                fill: true,
                fillColor: isVisible ? '#B0BEC5' : 'transparent',
                fillOpacity: isVisible ? 0.8 : 0,
                color: isVisible ? '#78909C' : 'transparent',
                weight: isVisible ? 0.5 : 0,
                opacity: isVisible ? 0.5 : 0,
            };
        } else if (properties.class === 'runway' || properties.subclass === 'runway') {
            return {
                color: isVisible ? '#CFD8DC' : 'transparent',
                weight: isVisible ? (zoom >= 12 ? 6 : zoom >= 8 ? 4 : 2) : 0,
                opacity: isVisible ? 0.9 : 0,
            };
        } else if (properties.class === 'taxiway' || properties.subclass === 'taxiway') {
            return {
                color: isVisible ? '#9E9E9E' : 'transparent',
                weight: isVisible ? (zoom >= 14 ? 3 : zoom >= 10 ? 2 : 1) : 0,
                opacity: isVisible ? 0.8 : 0,
            };
        } else if (properties.class === 'heliport' || properties.class === 'helipad') {
            return {
                fill: true,
                fillColor: isVisible ? '#607D8B' : 'transparent',
                fillOpacity: isVisible ? 0.9 : 0,
                color: isVisible ? '#455A64' : 'transparent',
                weight: isVisible ? 0.5 : 0,
                opacity: isVisible ? 0.5 : 0,
            };
        } else if (properties.class === 'gate') {
            return {
                opacity: 0,
                weight: 0,
                fillOpacity: 0,
                color: 'transparent',
                fillColor: 'transparent'
            };
        } else {
            console.log("Unhandled aeroway class:", properties.class);
            return {
                opacity: 0,
                fillOpacity: 0,
                weight: 0
            };
        }
    },

    // Boundaries (lines)
    boundary: (properties, zoom) => {
        if (zoom < 0 || zoom > 22) return {
            opacity: 0,
            weight: 0
        };
        const isVisible = zoom >= 0 && zoom <= 20;
        let color = isVisible ? (properties.admin_level <= 2 ? '#000000' : properties.maritime === 1 ? '#0288D1' : '#78909C') : 'transparent';
        let weight = isVisible ? (properties.admin_level <= 2 ? (zoom >= 8 ? 2 : 1) : (zoom >= 10 ? 1 : 0.5)) : 0;
        let opacity = isVisible ? (properties.disputed ? 0.5 : 0.7) : 0;
        let dashArray = isVisible && (properties.disputed || properties.maritime === 1) ? '4,4' : null;
        return {
            color,
            weight,
            opacity,
            dashArray
        };
    },

    // Points of Interest (points)
    poi: (properties, zoom) => {
        if (zoom < 0 || zoom > 22) return {
            'circle-opacity': 0,
            'circle-radius': 0,
            'circle-stroke-opacity': 0
        };
        const isVisible = zoom >= 12 && zoom <= 20;
        let radius = isVisible ? (zoom >= 15 ? 6 : zoom >= 12 ? 4 : 2) : 0;
        let color = '#AB47BC';
        const poiClass = properties.class;
        const poiSubclass = properties.subclass;

        if (
            poiClass === 'hospital' ||
            poiClass === 'clinic' ||
            poiSubclass === 'hospital' ||
            poiSubclass === 'clinic' ||
            poiSubclass === 'doctors'
        ) {
            color = '#EF5350';
            radius = isVisible ? (zoom >= 15 ? 8 : 6) : 0;
        } else if (
            poiClass === 'school' ||
            poiClass === 'university' ||
            poiSubclass === 'school' ||
            poiSubclass === 'university' ||
            poiClass === 'college' ||
            poiSubclass === 'college'
        ) {
            color = '#FFA726';
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
            color = '#7E57C2';
        } else if (
            poiClass === 'restaurant' ||
            poiClass === 'cafe' ||
            poiSubclass === 'restaurant' ||
            poiSubclass === 'cafe' ||
            poiClass === 'fast_food' ||
            poiSubclass === 'fast_food' ||
            poiClass === 'ice_cream'
        ) {
            color = '#F06292';
        } else if (
            poiClass === 'tourism' ||
            poiClass === 'attraction' ||
            poiSubclass === 'tourism' ||
            poiSubclass === 'attraction' ||
            poiClass === 'escape_game' ||
            poiClass === 'theme_park' ||
            poiSubclass === 'theme_park' ||
            poiClass === 'aquarium'
        ) {
            color = '#26A69A';
            radius = isVisible ? (zoom >= 15 ? 8 : 6) : 0;
        } else if (
            poiClass === 'landmark' ||
            poiClass === 'monument' ||
            poiClass === 'memorial' ||
            poiClass === 'museum' ||
            poiSubclass === 'landmark' ||
            poiSubclass === 'monument' ||
            poiSubclass === 'memorial' ||
            poiSubclass === 'museum' ||
            poiClass === 'art_gallery' ||
            poiClass === 'castle'
        ) {
            color = '#D81B60';
            radius = isVisible ? (zoom >= 15 ? 8 : 6) : 0;
        } else if (
            poiClass === 'ferry_terminal' ||
            poiSubclass === 'ferry_terminal'
        ) {
            color = '#00796B';
            radius = isVisible ? (zoom >= 15 ? 7 : 5) : 0;
        } else if (
            poiClass === 'station' ||
            poiClass === 'subway' ||
            poiSubclass === 'station' ||
            poiSubclass === 'subway' ||
            poiClass === 'railway' ||
            poiSubclass === 'train_station'
        ) {
            color = '#0288D1';
            radius = isVisible ? (zoom >= 15 ? 7 : 5) : 0;
        } else if (
            poiClass === 'harbor' ||
            poiSubclass === 'marina'
        ) {
            color = '#4FC3F7';
            radius = isVisible ? (zoom >= 15 ? 7 : 5) : 0;
        } else if (
            poiClass === 'campsite' ||
            poiSubclass === 'camp_site' ||
            poiSubclass === 'caravan_site'
        ) {
            color = '#A5D6A7';
            radius = isVisible ? (zoom >= 15 ? 6 : 4) : 0;
        } else if (
            poiClass === 'golf' ||
            poiSubclass === 'golf_course'
        ) {
            color = '#4CAF50';
            radius = isVisible ? (zoom >= 15 ? 6 : 4) : 0;
        } else if (
            poiClass === 'recycling' ||
            poiSubclass === 'recycling'
        ) {
            color = '#8BC34A';
            radius = isVisible ? (zoom >= 15 ? 5 : 3) : 0;
        } else if (
            poiClass === 'office' ||
            poiSubclass === 'company' ||
            poiClass === 'brownfield' ||
            poiClass === 'hacker_space' ||
            poiClass === 'hackerspace'
        ) {
            color = '#78909C';
            radius = isVisible ? (zoom >= 15 ? 5 : 3) : 0;
        } else if (
            poiClass === 'bicycle_rental' ||
            poiSubclass === 'bicycle_rental' ||
            poiClass === 'bicycle'
        ) {
            color = '#4CAF50';
            radius = isVisible ? (zoom >= 15 ? 5 : 3) : 0;
        } else if (
            poiClass === 'lodging' ||
            poiSubclass === 'guest_house'
        ) {
            color = '#F06292';
            radius = isVisible ? (zoom >= 15 ? 6 : 4) : 0;
        } else if (
            poiClass === 'fuel' ||
            poiSubclass === 'charging_station'
        ) {
            color = '#FF5722';
            radius = isVisible ? (zoom >= 15 ? 5 : 3) : 0;
        } else if (
            poiClass === 'parking' ||
            poiSubclass === 'parking' ||
            poiClass === 'motorcycle_parking' ||
            poiSubclass === 'motorcycle_parking'
        ) {
            color = '#B0BEC5';
            radius = isVisible ? (zoom >= 15 ? 5 : 3) : 0;
        } else if (
            poiClass === 'fire_station' ||
            poiSubclass === 'fire_station' ||
            poiClass === 'police' ||
            poiClass === 'prison' ||
            poiSubclass === 'prison' ||
            poiClass === 'sally_port'
        ) {
            color = '#D32F2F';
            radius = isVisible ? (zoom >= 15 ? 7 : 5) : 0;
        } else if (
            poiClass === 'sports_centre' ||
            poiSubclass === 'sports_centre' ||
            poiClass === 'athletics' ||
            poiClass === 'korfball' ||
            poiClass === 'multi' ||
            poiClass === 'boules' ||
            poiClass === 'rugby' ||
            poiClass === 'beachvolleyball' ||
            poiClass === 'field_hockey' ||
            poiClass === 'bmx' ||
            poiClass === 'horse_racing' ||
            poiClass === 'shooting' ||
            poiClass === 'gymnastics' ||
            poiClass === 'karting' ||
            poiClass === 'table_tennis' ||
            poiClass === 'yoga' ||
            poiClass === 'stadium' ||
            poiClass === 'skating' ||
            poiClass === 'skateboard' ||
            poiClass === 'climbing' ||
            poiClass === 'handball' ||
            poiClass === 'boxing' ||
            poiClass === 'baseball' ||
            poiClass === 'winter_sports' ||
            poiClass === 'cricket' ||
            poiClass === 'basketball' ||
            poiClass === 'hockey' ||
            poiClass === 'volleyball' ||
            poiClass === 'badminton' ||
            poiClass === 'team_handball'
        ) {
            color = '#A5D6A7';
            radius = isVisible ? (zoom >= 15 ? 6 : 4) : 0;
        } else if (
            poiClass === 'equestrian'
        ) {
            color = '#795548';
            radius = isVisible ? (zoom >= 15 ? 6 : 4) : 0;
        } else if (
            poiClass === 'rowing' ||
            poiClass === 'canoe' ||
            poiClass === 'sailing' ||
            poiClass === 'cycling' ||
            poiClass === 'scuba_diving' ||
            poiClass === 'water_ski' ||
            poiClass === 'motor' ||
            poiClass === 'motocross' ||
            poiClass === 'skiing' ||
            poiClass === 'surfing' ||
            poiClass === 'diving' ||
            poiClass === 'judo'
        ) {
            color = '#0D47A1';
            radius = isVisible ? (zoom >= 15 ? 6 : 4) : 0;
        } else if (
            poiClass === 'waste_basket' ||
            poiSubclass === 'waste_basket'
        ) {
            color = '#B0BEC5';
            radius = isVisible ? (zoom >= 15 ? 4 : 2) : 0;
        } else if (
            poiClass === 'bicycle_parking' ||
            poiSubclass === 'bicycle_parking'
        ) {
            color = '#4CAF50';
            radius = isVisible ? (zoom >= 15 ? 5 : 3) : 0;
        } else if (
            poiClass === 'bollard' ||
            poiSubclass === 'bollard' ||
            poiClass === 'gate' ||
            poiClass === 'stile' ||
            poiClass === 'lift_gate' ||
            poiClass === 'entrance' ||
            poiSubclass === 'subway_entrance'
        ) {
            color = '#78909C';
            radius = isVisible ? (zoom >= 15 ? 3 : 2) : 0;
        } else if (
            poiClass === 'information' ||
            poiSubclass === 'map'
        ) {
            color = '#0288D1';
            radius = isVisible ? (zoom >= 15 ? 5 : 3) : 0;
        } else if (
            poiClass === 'pitch' ||
            poiSubclass === 'soccer'
        ) {
            color = '#4CAF50';
            radius = isVisible ? (zoom >= 15 ? 7 : 5) : 0;
        } else if (
            poiClass === 'swimming_pool' ||
            poiSubclass === 'swimming_pool' ||
            poiClass === 'water_park' ||
            poiClass === 'basin' ||
            poiClass === 'swimming' ||
            poiClass === 'reservoir'
        ) {
            color = '#4FC3F7';
            radius = isVisible ? (zoom >= 15 ? 7 : 5) : 0;
        } else if (
            poiClass === 'playground' ||
            poiSubclass === 'playground' ||
            poiClass === 'dog_park' ||
            poiClass === 'chess' ||
            poiClass === 'climbing_adventure' ||
            poiClass === 'disc_golf' ||
            poiClass === 'archery'
        ) {
            color = '#FFA726';
            radius = isVisible ? (zoom >= 15 ? 6 : 4) : 0;
        } else if (
            poiClass === 'atm' ||
            poiSubclass === 'atm' ||
            poiClass === 'bank' ||
            poiClass === 'telephone'
        ) {
            color = '#009688';
            radius = isVisible ? (zoom >= 15 ? 5 : 3) : 0;
        } else if (
            poiClass === 'cycle_barrier' ||
            poiSubclass === 'cycle_barrier'
        ) {
            color = '#B0BEC5';
            radius = isVisible ? (zoom >= 15 ? 3 : 2) : 0;
        } else if (
            poiClass === 'garden' ||
            poiSubclass === 'garden' ||
            poiClass === 'park'
        ) {
            color = '#A5D6A7';
            radius = isVisible ? (zoom >= 15 ? 6 : 4) : 0;
        } else if (
            poiClass === 'place_of_worship' ||
            poiClass === 'shelter'
        ) {
            color = '#FBC02D';
            radius = isVisible ? (zoom >= 15 ? 7 : 5) : 0;
        } else if (
            poiClass === 'cemetery' ||
            poiSubclass === 'grave_yard'
        ) {
            color = '#CFD8DC';
            radius = isVisible ? (zoom >= 15 ? 6 : 4) : 0;
        } else if (
            poiClass === 'post' ||
            poiSubclass === 'post_box'
        ) {
            color = '#D32F2F';
            radius = isVisible ? (zoom >= 15 ? 4 : 2) : 0;
        } else if (
            poiClass === 'bus' ||
            poiSubclass === 'bus_stop'
        ) {
            color = '#388E3C';
            radius = isVisible ? (zoom >= 15 ? 6 : 4) : 0;
        } else if (
            poiClass === 'car' ||
            poiSubclass === 'car_repair'
        ) {
            color = '#78909C';
            radius = isVisible ? (zoom >= 15 ? 5 : 3) : 0;
        } else if (
            poiClass === 'running'
        ) {
            color = '#8D6E63';
            radius = isVisible ? (zoom >= 15 ? 6 : 4) : 0;
        } else if (
            poiClass === 'dentist' ||
            poiClass === 'pharmacy' ||
            poiClass === 'hairdresser' ||
            poiClass === 'veterinary' ||
            poiSubclass === 'veterinary'
        ) {
            color = '#00ACC1';
            radius = isVisible ? (zoom >= 15 ? 6 : 4) : 0;
        } else if (
            poiClass === 'town_hall' ||
            poiClass === 'community_centre' ||
            poiClass === 'library'
        ) {
            color = '#FFD54F';
            radius = isVisible ? (zoom >= 15 ? 7 : 5) : 0;
        } else if (
            poiClass === 'bar' ||
            poiClass === 'beer' ||
            poiClass === 'pub'
        ) {
            color = '#8D6E63';
            radius = isVisible ? (zoom >= 15 ? 6 : 4) : 0;
        } else if (
            poiClass === 'laundry' ||
            poiClass === 'dry_cleaning'
        ) {
            color = '#4DB6AC';
            radius = isVisible ? (zoom >= 15 ? 5 : 3) : 0;
        } else if (
            poiClass === 'theatre' ||
            poiClass === 'zoo' ||
            poiClass === 'cinema'
        ) {
            color = '#673AB7';
            radius = isVisible ? (zoom >= 15 ? 8 : 6) : 0;
        } else if (
            poiClass === 'picnic_site'
        ) {
            color = '#A5D6A7';
            radius = isVisible ? (zoom >= 15 ? 5 : 3) : 0;
        } else if (
            poiClass === 'drinking_water' ||
            poiClass === 'toilets'
        ) {
            color = '#4FC3F7';
            radius = isVisible ? (zoom >= 15 ? 5 : 3) : 0;
        } else if (
            poiClass === 'tennis' ||
            poiClass === 'ice_rink' ||
            poiClass === 'billiards'
        ) {
            color = '#4CAF50';
            radius = isVisible ? (zoom >= 15 ? 6 : 4) : 0;
        } else if (
            poiClass === 'toll_booth'
        ) {
            color = '#616161';
            radius = isVisible ? (zoom >= 15 ? 6 : 4) : 0;
        } else if (
            poiClass === 'music' ||
            poiSubclass === 'musical_instrument'
        ) {
            color = '#FF9800';
            radius = isVisible ? (zoom >= 15 ? 6 : 4) : 0;
        } else if (
            poiClass === 'model_aerodrome'
        ) {
            color = '#78909C';
            radius = isVisible ? (zoom >= 15 ? 6 : 4) : 0;
        } else if (
            poiClass === 'border_control'
        ) {
            color = '#B71C1C';
            radius = isVisible ? (zoom >= 15 ? 7 : 5) : 0;
        } else {
            console.log("Unhandled POI class:", poiClass);
            return {
                'circle-radius': 0,
                'circle-color': 'transparent',
                'circle-opacity': 0,
                'circle-stroke-color': 'transparent',
                'circle-stroke-width': 0,
                'circle-stroke-opacity': 0,
            };
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

    // Place labls (points: cities, towns, villagees)
    place: (properties, zoom) => {
        if (zoom < 0 || zoom > 22) return {
            visible: false,
            opacity: 0
        };
        return {
            visible: zoom >= 2 && zoom <= 20,
            opacity: 0
        };
    },

    // House numbers (points)
    housenumber: (properties, zoom) => {
        if (zoom < 0 || zoom > 22) return {
            visible: false,
            opacity: 0,
            radius: 0
        };
        return {
            visible: zoom >= 14 && zoom <= 20,
            opacity: 0,
            radius: 0
        };
    },

    // Mountain peaks (points)
    mountain_peak: (properties, zoom) => {
        if (zoom < 0 || zoom > 22) return {
            visible: false,
            opacity: 0,
            radius: 0
        };
        return {
            visible: zoom >= 7 && zoom <= 20,
            opacity: 0,
            radius: 0
        };
    },

    // Aerodrome labels (points: airport labels)
    aerodrome_label: (properties, zoom) => {
        if (zoom < 0 || zoom > 22) return {
            visible: false,
            opacity: 0,
            radius: 0
        };
        const isVisible = zoom >= 8 && zoom <= 14;
        console.log("Aerodrome label:", properties.class);
        return {
            visible: isVisible,
            opacity: 0,
            radius: 0
        };
    },

    // Water name (points: labels for water bodies)
    water_name: (properties, zoom) => {
        if (zoom < 0 || zoom > 22) return {
            visible: false,
            opacity: 0,
            radius: 0
        };
        return {
            visible: zoom >= 7 && zoom <= 20,
            opacity: 0,
            radius: 0
        };
    },

    // Transportation names (points: road labels)
    transportation_name: (properties, zoom) => {
      if (zoom < 0 || zoom > 22) return {
          visible: false,
          opacity: 0
      };
      if (typeof properties.name !== 'undefined') {
          console.log(properties.name);
          return {
              visible: false,
              opacity: 0,
              radius: 0,
              text: {
                  field: properties.name,
                  font: '14px Arial',
                  fill: '#000000',
                  stroke: '#ffffff',
                  strokeWidth: 2,
              }
          };
      }
      return {};
    },

    // Aerodrome labels (points: airport names)
    aerodrome_label: (properties, zoom) => {
        if (zoom < 0 || zoom > 22) return {
            visible: false,
            opacity: 0,
            radius: 0
        };
        return {
            visible: zoom >= 8 && zoom <= 20,
            opacity: 0,
            radius: 0
        };
    },

    // Default style to prevent unstyled features from rendering with library's default (#3388FF)
    return : {
        opacity: 0,
        weight: 0,
        radius: 0,
        fillOpacity: 0,
        color: '#ffffff',
        fillColor: '#ffffff'
    }
    
};
export type DistrictScores = {
    district: string;
    parksAndNatureScore: number;
    transportLinksScore: number;
    nightlifeScore: number;
    convenienceScore: number;
    crimeScore: number;
    price: {
        average: number;
        min: number;
        max: number;
    }
}

export type PostcodeLocation = {
    postcode: string;
    latitude: number;
    longitude: number;
}

export type PostcodeInsight = {
    district: string;
    north: LocationData;
    south: LocationData;
    east: LocationData;
    west: LocationData;
    center: LocationData;
    parks: Park[];
}

type Park = {
    name: string;
    id: string;
    types: string[];
    rating: number;
    userRatingCount: number;
    displayName: {
      text: string;
      languageCode: string;
    };
  };

type Place = {
    id: string;
    displayName: string;
    lat: number;
    lng: number;
    rating: number;
    userRatingCount: number;
    primaryType: string;
}

export type Aggregates = {
    avCrimesPerDisrict: number;
}

export type LocationData = {
    imageAnalysis: {
        greenProportion: number;
        blueProportion: number;
    };
    nearestStationsWithWalkingMinutes: {
        nearestStation: {
            lat: number;
            lng: number;
            displayName: string;
            placeId: string;
        };
        nearestStationWalkingMinutes: {
            walkingMinutes: number;
        };
    }[];
    nearestBarsRestaurants: Place[];
    nearestConvStores: Place[];
    gyms: Place[];
    doctors: Place[];
    commuteTimeToCentralLondon: {
        railMinutes: number;
    };
    transitTimeFromCentralLondonNight: {
        railMinutes: number;
    };
    numberOfCrimes: number;
    averageWeeklyPricePerRoom: number;
    postcode: string;
    latitude: number;
    longitude: number;
};

export type DistrictData = {
    district: string;
    center: PostcodeLocation,
    north: PostcodeLocation,
    east: PostcodeLocation,
    south: PostcodeLocation,
    west: PostcodeLocation,
    parks: {

    }
}
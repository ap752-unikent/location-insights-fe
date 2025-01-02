type ApiClientProps = {
    url: string,
    method: string,
}

const apiClient = async ({ url, method }: ApiClientProps) => {
    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        return response.text().then(text => { throw new Error(text) })
    }

    return response.json();
}

export type FetchBestLocationProps = {
    parksAndNatureImportance: number,
    transportLinksImportance: number,
    crimeImportance: number,
    convenienceStoresImportance: number,
    nightlifeImportance: number,
    weeklyPriceThreshold: number,
}

export type DistrictData = {
    district: string;
    rawScore: number;
    normalizedScore: number;
    parksAndNatureScore: number,
    transportLinksScore: number,
    nightlifeScore: number,
    convenienceScore: number,
    crimeScore: number,
    price: {
        average: number;
        min: number;
        max: number;
    };
};

export type FetchBestLocationResponse = DistrictData[];

export const fetchBestLocation = async ({
    parksAndNatureImportance,
    transportLinksImportance,
    crimeImportance,
    convenienceStoresImportance,
    nightlifeImportance,
    weeklyPriceThreshold,
}: FetchBestLocationProps) => {

    const url = `http://localhost:8083/location?parksAndNatureImportance=${parksAndNatureImportance}&transportLinksImportance=${transportLinksImportance}&nightlifeImportance=${nightlifeImportance}&convenienceStoresImportance=${convenienceStoresImportance}&crimeImportance=${crimeImportance}&weeklyPriceThreshold=${weeklyPriceThreshold}`
    const responseJson = await apiClient({ url, method: 'GET' });

    return responseJson;
}

//need to use env vars here
export const fetchDistrictInsights = async (district: string) => {
    const url = `http://localhost:8083/district/${district}`
    const responseJson = await apiClient({ url, method: 'GET' });

    return responseJson;
}

export const fetchAggregates = async () => {
    const url = `http://localhost:8083/aggregates`
    const responseJson = await apiClient({ url, method: 'GET' });

    return responseJson;
}
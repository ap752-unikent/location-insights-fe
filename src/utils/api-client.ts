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
    convenienceStoresScore: number,
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

    const url = `https://backend-public-api-gohoushare-dev-f2d8hmatbsa2hte5.uksouth-01.azurewebsites.net/location?parksAndNatureImportance=${parksAndNatureImportance}&transportLinksImportance=${transportLinksImportance}&nightlifeImportance=${nightlifeImportance}&convenienceStoresImportance=${convenienceStoresImportance}&crimeImportance=${crimeImportance}&weeklyPriceThreshold=${weeklyPriceThreshold}`
    const responseJson = await apiClient({ url, method: 'GET' });

    return responseJson;
}
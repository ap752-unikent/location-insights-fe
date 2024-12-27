import { useQuery } from "react-query";
import { fetchBestLocation, FetchBestLocationProps, FetchBestLocationResponse } from "../utils/api-client";

export const useFetchBestDistrict = ({ parksAndNatureImportance, transportLinksImportance, convenienceStoresImportance, crimeImportance, nightlifeImportance, weeklyPriceThreshold}: FetchBestLocationProps) => {
    const { data: districts, isLoading: districtsLoading } = useQuery<FetchBestLocationResponse>(['bestLocation', parksAndNatureImportance, transportLinksImportance, convenienceStoresImportance, crimeImportance, nightlifeImportance, weeklyPriceThreshold],
        () => fetchBestLocation({ parksAndNatureImportance, transportLinksImportance, convenienceStoresImportance, crimeImportance, nightlifeImportance, weeklyPriceThreshold }),
        { enabled: true });

    return { districts, districtsLoading };
}
import { fetchBestValueAreas } from "../utils/api-client";
import { DistrictHighlights } from "../types";
import { useQuery } from "react-query";


export const useFetchBestValueAreas = () => {
    const { data, isLoading } = useQuery<DistrictHighlights[]>(['best-value-areas'],
        () => fetchBestValueAreas());

    return { data, isLoading };
}
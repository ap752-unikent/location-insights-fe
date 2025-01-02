import { PostcodeInsight } from "../types";
import { fetchDistrictInsights } from "../utils/api-client";
import { useQuery } from "react-query";

type Props = {
    district: string | undefined;
}

export const useFetchDistrictInsights = ({district} : Props) => {
    const { data: districtData, isLoading: districtDataLoading } = useQuery<PostcodeInsight>(['districtInsights', district],
        () => fetchDistrictInsights(district ?? ""),
        { enabled: district !== undefined 
        });

    return { districtData, districtDataLoading };
}
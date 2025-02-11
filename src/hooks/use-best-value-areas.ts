import { fetchHighlightedAreas } from "../utils/api-client";
import { DistrictHighlights } from "../types";
import { useQuery } from "react-query";

type Props = {
    pathSuffix: string;
}

export const useFetchHighlightedAreas = ({pathSuffix} : Props) => {
    const { data, isLoading } = useQuery<DistrictHighlights[]>(['best-value-areas', pathSuffix],
        () => fetchHighlightedAreas({
            pathSuffix
        }));

    return { data, isLoading };
}
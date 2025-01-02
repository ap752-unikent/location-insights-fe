import { fetchAggregates } from "../utils/api-client";
import { Aggregates, PostcodeInsight } from "../types";
import { useQuery } from "react-query";


export const useFetchAggregates = () => {
    const { data: aggregates, isLoading: aggregatesLoading } = useQuery<Aggregates>(['aggregates'],
        () => fetchAggregates());

    return { aggregates, aggregatesLoading };
}
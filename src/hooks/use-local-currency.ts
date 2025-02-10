import { useQuery } from "react-query";
import { fetchLocalCurrency } from "../utils/api-client";

export type LocalCurrency = {
    exchangeRate: number;
    currency: string;
}

export const useLocalCurrency = () => {
    const { data, isLoading, isError } = useQuery<LocalCurrency>('localCurrency', fetchLocalCurrency);

    return {
        data,
        isLoading,
        isError
    }
}
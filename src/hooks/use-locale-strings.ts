import { fetchLocaleStrings } from "../utils/api-client";
import { useQuery } from "react-query";

type Props = {
    languageCode: string;
}

export const useLocaleStrings = ({
    languageCode
} : Props) => {

    const { data: localeData, isLoading: localeDataLoading } = useQuery<Record<string, string>>(['localeStrings', languageCode],
        () => fetchLocaleStrings({languageCode}),
        { enabled: languageCode !== undefined
        });

    return { localeData, localeDataLoading };
}
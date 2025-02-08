import { useLocaleString } from "../contexts/internationalization";
import { VoteCategory } from "../constants";

type Props = {
    voteCategories: VoteCategory[];
}

export const useLocaleCategories = ({
    voteCategories
}: Props) => {
    const parksAndNatureLocaleString = useLocaleString({ id: "parksAndNatureLabel" });
    const transportLinksLocaleString = useLocaleString({ id: "transportLinksLabel" });
    const convenienceStoresLocaleString = useLocaleString({ id: "convenienceLabel" });
    const safetyLocaleString = useLocaleString({ id: "safetyLabel" });
    const nightlifeLocaleString = useLocaleString({ id: "nightlifeLabel" });

    const localeCategories = voteCategories.map((category) => {
        switch (category.id) {
            case "parksAndNature":
                return {
                    ...category,
                    name: parksAndNatureLocaleString
                }
            case "transportLinks":
                return {
                    ...category,
                    name: transportLinksLocaleString
                }
            case "convenienceStores":
                return {
                    ...category,
                    name: convenienceStoresLocaleString
                }
            case "safety":
                return {
                    ...category,
                    name: safetyLocaleString
                }
            case "nightlife":
                return {
                    ...category,
                    name: nightlifeLocaleString
                }
            default:
                return category;
        }
    });

    return localeCategories;
}
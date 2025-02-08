import { Text } from "@chakra-ui/react";
import { DistrictInsight } from "../../../types";
import { SummarySkeleton } from "../summary-skeleton";
import { MdOutlineNightlife } from "react-icons/md";
import { BiSolidDrink } from "react-icons/bi";
import { MdRestaurant } from "react-icons/md";
import { PiDiscoBallBold } from "react-icons/pi";
import { PlacesText } from "../../../components/places-text/places-text";
import { LocaleText, useLocaleString } from "../../../contexts/internationalization";

type Props = {
    districtData: DistrictInsight;
}

export const Nightlife = ({
    districtData
}: Props) => {

    const restaurants = districtData.weighted.noOfRestaurants;
    const nightClubs = districtData.weighted.noOfNightClubs;
    const bars = districtData.weighted.noOfBars;

    const nightlifeLabel = useLocaleString({ id: "nightlifeLabel" });
    const barsOrPubsText = useLocaleString({ id: "barsOrPubsText" });
    const restaurantsText = useLocaleString({ id: "restaurantsText" });
    const nightclubsText = useLocaleString({ id: "nightclubsText" });

    return (
        <SummarySkeleton
            title={nightlifeLabel}
            icon={<MdOutlineNightlife size={20} />}
        >
            <LocaleText 
                id="nightlifeText"
                fontSize={"sm"}
                color={"gray.500"}
            />
            <PlacesText
                text={barsOrPubsText}
                icon={<BiSolidDrink
                    size={16}
                    style={{
                        marginRight: "12px"
                    }}
                />}
                count={Math.ceil(bars)}
            />
            <PlacesText
                text={restaurantsText}
                icon={<MdRestaurant
                    style={{
                        marginRight: "12px"
                    }}
                    size={16}
                />}
                count={Math.ceil(restaurants)}
            />
            <PlacesText
                text={nightclubsText}
                icon={<PiDiscoBallBold
                    style={{
                        marginRight: "12px"
                    }}
                    size={20}
                />}
                count={Math.ceil(nightClubs)}
            />
        </SummarySkeleton>
    )
}
import { Text } from "@chakra-ui/react";
import { PostcodeInsight } from "../../../types";
import { SummarySkeleton } from "../summary-skeleton";
import { MdOutlineNightlife } from "react-icons/md";
import { BiSolidDrink } from "react-icons/bi";
import { MdRestaurant } from "react-icons/md";
import { PiDiscoBallBold } from "react-icons/pi";
import { PlacesText } from "../../../components/places-text/places-text";

type Props = {
    districtData: PostcodeInsight;
}

export const Nightlife = ({
    districtData
}: Props) => {

    const barsAndRestuarants = [
        ...districtData.center.nearestBarsRestaurants,
        ...districtData.east.nearestBarsRestaurants,
        ...districtData.west.nearestBarsRestaurants,
        ...districtData.north.nearestBarsRestaurants,
        ...districtData.south.nearestBarsRestaurants
    ];

    const restaurants = barsAndRestuarants.filter((place) => place.primaryType?.includes("restaurant"));
    const nightClubs = barsAndRestuarants.filter((place) => place.primaryType === "night_club");
    const bars = barsAndRestuarants.filter((place) => !place.primaryType?.includes("restaurant") && place.primaryType !== "night_club");

    return (
        <SummarySkeleton
            title={"Nightlife"}
            icon={<MdOutlineNightlife size={20} />}
        >
            <Text
                fontSize={"sm"}
                color={"gray.500"}
            >
                Enjoy a midweek pint? Or a friday night dinner out? Here's what you can expect within a 10 min walking distance for this area.
            </Text>
            <PlacesText
                text={"bars or pubs rated 4 stars and above"}
                icon={<BiSolidDrink
                    size={16}
                    style={{
                        marginRight: "12px"
                    }}
                />}
                count={Math.ceil(bars.length / 5)}
            />
            <PlacesText
                text={"restaurants rated 4 stars and above"}
                icon={<MdRestaurant
                    style={{
                        marginRight: "12px"
                    }}
                    size={16}
                />}
                count={Math.ceil(restaurants.length / 5)}
            />
            <PlacesText
                text={"nightclubs rated 4 stars and above"}
                icon={<PiDiscoBallBold
                    style={{
                        marginRight: "12px"
                    }}
                    size={20}
                />}
                count={Math.ceil(nightClubs.length / 5)}
            />
        </SummarySkeleton>
    )
}
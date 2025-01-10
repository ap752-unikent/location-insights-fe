import { Text } from "@chakra-ui/react";
import { PlacesText } from "../../../components/places-text/places-text";
import { DistrictInsight } from "../../../types";
import { SummarySkeleton } from "../summary-skeleton"
import { FaBasketShopping } from "react-icons/fa6";
import { CgGym } from "react-icons/cg";
import { FaUserDoctor } from "react-icons/fa6";

type Props = {
    districtData: DistrictInsight;
}

export const Convenience = ({
    districtData
}: Props) => {

    const convenienceStoresAv = Math.ceil(districtData.weighted.convStores)
    const gymsAv = Math.ceil(districtData.weighted.gyms);
    const doctorsAv = Math.ceil(districtData.weighted.doctors);

    return (
        <SummarySkeleton
            title="Convenience"
            icon={<FaBasketShopping size={20} />}
        >
            <Text
                fontSize={"sm"}
                color={"gray.500"}
            >
                Looking for convenience? Here's what you can expect in terms of local amenities.
            </Text>
            <PlacesText
                text={`convenience store${convenienceStoresAv > 1 ? 's' : ''} within a 5 min walk.`}
                icon={<FaBasketShopping
                    size={16}
                    style={{
                        marginRight: "12px"
                    }}
                />}
                count={convenienceStoresAv}
            />
            <PlacesText
                text={`gym${gymsAv > 1 ? 's' : ''} rated 4 stars or above within a 15 min walk.`}
                icon={<CgGym
                    size={16}
                    style={{
                        marginRight: "12px"
                    }}
                />}
                count={gymsAv}
            />
            <PlacesText
                text={`gp practice${doctorsAv > 1 ? 's' : ''} rated 4 stars or above within a 15 min walk.`}
                icon={<FaUserDoctor
                    size={16}
                    style={{
                        marginRight: "12px"
                    }}
                />}
                count={doctorsAv}
            />
        </SummarySkeleton>
    )
}
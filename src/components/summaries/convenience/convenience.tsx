import { Text } from "@chakra-ui/react";
import { PlacesText } from "../../../components/places-text/places-text";
import { PostcodeInsight } from "../../../types";
import { SummarySkeleton } from "../summary-skeleton"
import { FaBasketShopping } from "react-icons/fa6";
import { CgGym } from "react-icons/cg";
import { FaUserDoctor } from "react-icons/fa6";

type Props = {
    districtData: PostcodeInsight;
}

export const Convenience = ({
    districtData
}: Props) => {

    const convenienceStores = [
        ...districtData.center.nearestConvStores,
        ...districtData.east.nearestConvStores,
        ...districtData.west.nearestConvStores,
        ...districtData.north.nearestConvStores,
        ...districtData.south.nearestConvStores
    ]

    const gyms = [
        ...districtData.center.gyms,
        ...districtData.east.gyms,
        ...districtData.west.gyms,
        ...districtData.north.gyms,
        ...districtData.south.gyms
    ]

    const doctors = [
        ...districtData.center.doctors,
        ...districtData.east.doctors,
        ...districtData.west.doctors,
        ...districtData.north.doctors,
        ...districtData.south.doctors
    ]

    const convenienceStoresAv = Math.ceil(convenienceStores.length / 5);
    const gymsAv = Math.ceil(gyms.length / 5);
    const doctorsAv = Math.ceil(doctors.length / 5);

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
import { PlacesText } from "../../../components/places-text/places-text";
import { DistrictInsight } from "../../../types";
import { SummarySkeleton } from "../summary-skeleton"
import { FaBasketShopping } from "react-icons/fa6";
import { CgGym } from "react-icons/cg";
import { FaUserDoctor } from "react-icons/fa6";
import { LocaleText, useLocaleString } from "../../../contexts/internationalization";

type Props = {
    districtData: DistrictInsight;
}

export const Convenience = ({
    districtData
}: Props) => {

    const convenienceStoresAv = Math.ceil(districtData.weighted.convStores)
    const gymsAv = Math.ceil(districtData.weighted.gyms);
    const doctorsAv = Math.ceil(districtData.weighted.doctors);

    const convenienceLabel = useLocaleString({ id: "convenienceLabel" });
    const convenienceStoresText = useLocaleString({ id: "convenienceStoresText" });
    const gymsText = useLocaleString({ id: "gymsText" });
    const doctorsText = useLocaleString({ id: "doctorsText" });

    return (
        <SummarySkeleton
            title={convenienceLabel}
            icon={<FaBasketShopping size={20} />}
        >
            <LocaleText 
                id="localAmenities"
                fontSize={"sm"}
                color={"gray.500"}
            />
            <PlacesText
                text={convenienceStoresText}
                icon={<FaBasketShopping
                    size={16}
                    style={{
                        marginRight: "12px"
                    }}
                />}
                count={convenienceStoresAv}
            />
            <PlacesText
                text={gymsText}
                icon={<CgGym
                    size={16}
                    style={{
                        marginRight: "12px"
                    }}
                />}
                count={gymsAv}
            />
            <PlacesText
                text={doctorsText}
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
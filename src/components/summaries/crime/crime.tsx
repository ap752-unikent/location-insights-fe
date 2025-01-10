import { Text } from "@chakra-ui/react";
import { RangeChart } from "../../location-result/range-chart";
import { DistrictInsight } from "../../../types";
import { SummarySkeleton } from "../summary-skeleton"
import { HiMiniUserGroup } from "react-icons/hi2";

type Props = {
    districtData: DistrictInsight;
    avCrimeRate: number;
}

export const Crime = ({
    districtData,
    avCrimeRate
} : Props) => {

    const crimes = districtData.weighted.numberOfCrimes;

    return (
        <SummarySkeleton
            title={"Crime Rate"}
            icon={<HiMiniUserGroup 
                size={20}
            />}
        >
            <Text
                fontSize={"sm"}
                color={"gray.500"}
            >
                The graph below shows the number of crimes reported in one month for this district compared to the number of crimes reported in the same month averaged across all districts.
            </Text>
            <RangeChart 
                topYLabel="Av. crime rate across London"
                bottomYLabel="This district"
                bottomValue={Number(crimes.toFixed(0))}
                max={Number(avCrimeRate.toFixed(0))}
                unit=""
                top={40}
                width={"100%"}
                height={200}
                left={0}
            />
        </SummarySkeleton>
    )
}
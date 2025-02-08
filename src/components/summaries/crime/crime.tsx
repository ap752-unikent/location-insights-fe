import { Stack, Text, useBreakpoint, useBreakpointValue } from "@chakra-ui/react";
import { RangeChart } from "../../location-result/range-chart";
import { Aggregates, DistrictInsight } from "../../../types";
import { SummarySkeleton } from "../summary-skeleton"
import { HiMiniUserGroup } from "react-icons/hi2";
import { useLocaleString } from "../../../contexts/internationalization";

type Props = {
    districtData: DistrictInsight;
    avCrimeRate: Aggregates | undefined;
}

export const Crime = ({
    districtData,
    avCrimeRate
}: Props) => {

    const isSmallScreen = useBreakpointValue({ base: true, md: false });
    const crimes = districtData.weighted.numberOfCrimes;
    const crimesPerCapita = districtData.weighted.crimesPerCapita;

    const graphTotalCrimeString = useLocaleString({
        id: "graphTotalCrime"
    });
    const graphCrimeFootfallString = useLocaleString({
        id: "graphCrimeFootfall"
    })
    const crimeRateLabel = useLocaleString({id: "safetyLabel"});
    const averageCrimeRatePerDistrictText = useLocaleString({id: "averageCrimeRatePerDistrictText"});
    const averageCrimeRatePerDistrictFootfallText = useLocaleString({id: "averageCrimeRatePerDistrictFootfallText"});
    const thisDistrictGraph = useLocaleString({id: "thisDistrictGraph"});

    if (avCrimeRate === undefined) {
        return null;
    }

    return (
        <SummarySkeleton
            title={crimeRateLabel}
            icon={<HiMiniUserGroup
                size={20}
            />}
        >
            <Text
                fontSize={"sm"}
                color={"gray.500"}
            >
                {graphTotalCrimeString + `\n`} 
                {graphCrimeFootfallString}
            </Text>
            <Stack
                direction={isSmallScreen ? "column" : "row"}
                width={"100%"}
                gap={4}
                marginTop={4}
            >
                <RangeChart
                    title={averageCrimeRatePerDistrictText}
                    topYLabel="London"
                    bottomYLabel={thisDistrictGraph}
                    bottomValue={Number(crimes.toFixed(0))}
                    max={Number(avCrimeRate.avCrimesPerDisrict.toFixed(0))}
                    unit=""
                    top={40}
                    width={"100%"}
                    height={200}
                />
                <RangeChart
                    title={averageCrimeRatePerDistrictFootfallText}
                    topYLabel="London"
                    bottomYLabel={thisDistrictGraph}
                    bottomValue={Number((crimesPerCapita * 1000 * 12).toFixed(0))}
                    max={Number((avCrimeRate.avCrimePerCapitaPerDistrict * 1000 * 12).toFixed(0))}
                    unit=""
                    top={40}
                    width={"100%"}
                    height={200}
                />
            </Stack>
        </SummarySkeleton>
    )
}
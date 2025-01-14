import { Stack, Text, useBreakpoint, useBreakpointValue } from "@chakra-ui/react";
import { RangeChart } from "../../location-result/range-chart";
import { Aggregates, DistrictInsight } from "../../../types";
import { SummarySkeleton } from "../summary-skeleton"
import { HiMiniUserGroup } from "react-icons/hi2";

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

    if (avCrimeRate === undefined) {
        return null;
    }

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
                The graphs below show how this district compares to the London average in terms of crime rate. 
                The graph on the right accounts for both population and footfall.
            </Text>
            <Stack
                direction={isSmallScreen ? "column" : "row"}
                width={"100%"}
                gap={4}
                marginTop={4}
            >
                <RangeChart
                    title="Av. crime rate per district"
                    topYLabel="London"
                    bottomYLabel="This district"
                    bottomValue={Number(crimes.toFixed(0))}
                    max={Number(avCrimeRate.avCrimesPerDisrict.toFixed(0))}
                    unit=""
                    top={40}
                    width={"100%"}
                    height={200}
                    left={0}
                />
                <RangeChart
                    title="Av. crime rate per district per capita"
                    topYLabel="London"
                    bottomYLabel="This district"
                    bottomValue={Number((crimesPerCapita * 1000 * 12).toFixed(0))}
                    max={Number((avCrimeRate.avCrimePerCapitaPerDistrict * 1000 * 12).toFixed(0))}
                    unit=""
                    top={40}
                    width={"100%"}
                    height={200}
                    left={0}
                />
            </Stack>
        </SummarySkeleton>
    )
}
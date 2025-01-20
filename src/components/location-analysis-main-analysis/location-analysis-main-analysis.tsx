import { Stack, Text, useBreakpointValue} from "@chakra-ui/react";
import { LatLng } from "leaflet";
import { DistrictInsight } from "../../types";
import { AnalysisMap } from "../analysis-map/analysis-map";
import { RangeChart } from "../location-result/range-chart";
import { TransportLinks } from "../summaries/transport-links/transport-links";


type Props = {
    district: string | undefined;
    districtData: DistrictInsight | undefined;
    minPrice: number;
    maxPrice: number;
}

export const LocationAnalysisMainAnalysis = ({
    district,
    districtData,
    minPrice,
    maxPrice
} : Props) => {

    const chartWidth = useBreakpointValue({ base: "110%", md: "100%" });
    const gap = useBreakpointValue({ base: 8, lg: 4 });
    const direction = useBreakpointValue<"column" | "row">({ base: "column", xl: "row" });

    return (
        <Stack
            direction={direction ?? "column"}
            justifyContent={"space-between"}
            width={"100%"}
            gap={gap}
        >
            <TransportLinks
                district={district ?? ""}
                stations={districtData?.stations ?? []}
                commuteTimeToCentralLondon={districtData?.weighted.commuteTimeToCentralLondon.railMinutes ?? NaN}
                transitTimeFromCentralLondonNight={districtData?.weighted.transitTimeFromCentralLondonNight.railMinutes ?? NaN}
            />
            {
                districtData && (
                    <Stack>
                        <AnalysisMap
                            center={new LatLng(districtData?.center.latitude ?? 0, districtData?.center.longitude ?? 0)}
                            district={districtData}
                        />
                        <Stack
                            gap={0}
                        >
                            <RangeChart
                                max={maxPrice * 4}
                                min={minPrice * 4}
                                topYLabel="Rent"
                                unit="£"
                                height={100}
                                width={chartWidth}
                            />
                            <Text
                                fontSize={"xs"}
                                color={"gray.500"}
                                fontWeight={"bold"}
                            >
                                The range of average monthly rent for one room in this area.
                            </Text>
                        </Stack>
                    </Stack>
                )
            }
        </Stack>
    )
}
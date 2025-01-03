import { Stack, useBreakpointValue, Text } from "@chakra-ui/react"
import { LatLng } from "leaflet"
import { AnalysisMap } from "../components/analysis-map/analysis-map";
import { LocationResultSkeleton } from "../components/location-result-skeleton/location-result-skeleton";
import { useFetchDistrictInsights } from "../hooks/use-fetch-district-insights";
import { ParksAndNature } from "../components/summaries/parks-and-nature/parks-and-nature";
import { TransportLinks } from "../components/summaries/transport-links/transport-links";
import { useParams } from "react-router"
import { Nightlife } from "../components/summaries/nightlife/nightlife";
import { RangeChart } from "../components/location-result/range-chart";
import { Crime } from "../components/summaries/crime/crime";
import { useFetchAggregates } from "../hooks/use-fetch-aggregates";
import { Convenience } from "../components/summaries/convenience/convenience";

export const LocationAnalysis = () => {

    const { district } = useParams<{ district: string }>();
    const isSmallScreen = useBreakpointValue({ base: true, md: false });
    const { districtData } = useFetchDistrictInsights({ district });
    const { aggregates } = useFetchAggregates();

    const prices = [
        districtData?.center.averageWeeklyPricePerRoom ?? 0,
        districtData?.east.averageWeeklyPricePerRoom ?? 0,
        districtData?.west.averageWeeklyPricePerRoom ?? 0,
        districtData?.north.averageWeeklyPricePerRoom ?? 0,
        districtData?.south.averageWeeklyPricePerRoom ?? 0
    ]

    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);

    return (
        <Stack
            direction={"column"}
            width={isSmallScreen ? "80%" : "50%"}
            transform={isSmallScreen ? "translateX(10%)" : "translateX(50%)"}
            marginTop={8}
            marginBottom={24}
            fontFamily={"Inter"}
        >
            <LocationResultSkeleton
                district={district ?? ""}
            >
                <Stack
                    padding={4}
                    gap={8} 
                >
                    <Stack
                        direction={isSmallScreen ? "column" : "row"}
                        justifyContent={"space-between"}
                        width={"100%"}
                        gap={isSmallScreen ? 8 : 4}
                    >
                        <TransportLinks
                            district={district ?? ""}
                            stations={[
                                ...districtData?.center.nearestStationsWithWalkingMinutes ?? [],
                                ...districtData?.east.nearestStationsWithWalkingMinutes ?? [],
                                ...districtData?.west.nearestStationsWithWalkingMinutes ?? [],
                                ...districtData?.north.nearestStationsWithWalkingMinutes ?? [],
                                ...districtData?.south.nearestStationsWithWalkingMinutes ?? [],
                            ]}
                            commuteTimeToCentralLondon={[
                                districtData?.center.commuteTimeToCentralLondon ?? { railMinutes: NaN },
                                districtData?.east.commuteTimeToCentralLondon ?? { railMinutes: NaN },
                                districtData?.west.commuteTimeToCentralLondon ?? { railMinutes: NaN },
                                districtData?.north.commuteTimeToCentralLondon ?? { railMinutes: NaN },
                                districtData?.south.commuteTimeToCentralLondon ?? { railMinutes: NaN },
                            ]}
                            transitTimeFromCentralLondonNight={[
                                districtData?.center.transitTimeFromCentralLondonNight ?? { railMinutes: NaN },
                                districtData?.east.transitTimeFromCentralLondonNight ?? { railMinutes: NaN },
                                districtData?.west.transitTimeFromCentralLondonNight ?? { railMinutes: NaN },
                                districtData?.north.transitTimeFromCentralLondonNight ?? { railMinutes: NaN },
                                districtData?.south.transitTimeFromCentralLondonNight ?? { railMinutes: NaN },
                            ]}
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
                                            width={isSmallScreen ? "100%" : "110%"}
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
                    {
                        districtData && (
                            <ParksAndNature
                                districtData={districtData}
                            />
                        )
                    }
                    {
                        districtData && (
                            <Nightlife
                                districtData={districtData}
                            />
                        )
                    }
                    {
                        districtData && (
                            <Crime 
                                districtData={districtData}
                                avCrimeRate={aggregates?.avCrimesPerDisrict ?? 0}
                            />
                        )
                    }
                    {
                        districtData && (
                            <Convenience 
                                districtData={districtData}
                            />
                        )
                    }
                </Stack>
            </LocationResultSkeleton>
        </Stack>
    )
}
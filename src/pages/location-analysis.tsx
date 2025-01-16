import { Stack, useBreakpointValue, Text } from "@chakra-ui/react"
import { LatLng } from "leaflet"
import { AnalysisMap } from "../components/analysis-map/analysis-map";
import { LocationResultSkeleton } from "../components/location-result-skeleton/location-result-skeleton";
import { useFetchDistrictInsights } from "../hooks/use-fetch-district-insights";
import { ParksAndNature } from "../components/summaries/parks-and-nature/parks-and-nature";
import { TransportLinks } from "../components/summaries/transport-links/transport-links";
import { useLocation, useNavigate, useParams} from "react-router"
import { Nightlife } from "../components/summaries/nightlife/nightlife";
import { RangeChart } from "../components/location-result/range-chart";
import { Crime } from "../components/summaries/crime/crime";
import { useFetchAggregates } from "../hooks/use-fetch-aggregates";
import { Convenience } from "../components/summaries/convenience/convenience";
import { MdArrowBack } from "react-icons/md"
import { useEffect } from "react";

export const LocationAnalysis = () => {

    const { district } = useParams<{ district: string }>();
    const isSmallScreen = useBreakpointValue({ base: true, md: false });
    const { districtData } = useFetchDistrictInsights({ district });
    const { aggregates } = useFetchAggregates();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    const prices = [
        districtData?.center.weeklyPricePerRoom ?? 0,
        districtData?.east.weeklyPricePerRoom ?? 0,
        districtData?.west.weeklyPricePerRoom ?? 0,
        districtData?.north.weeklyPricePerRoom ?? 0,
        districtData?.south.weeklyPricePerRoom ?? 0
    ]

    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);

    return (
        <Stack
            direction={"column"}
            width={isSmallScreen ? "100%" : "50%"}
            transform={isSmallScreen ? "translateX(0%)" : "translateX(50%)"}
            marginTop={8}
            marginBottom={24}
            fontFamily={"Inter"}
        >
            <Text
                fontSize={"xs"}
                fontWeight={"bold"}
                color={"gray.500"}
                onClick={() => navigate(-1)}
                cursor={"pointer"}
                alignSelf={"flex-start"}
                marginLeft={isSmallScreen ? 2 : 0}
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
              <MdArrowBack
                style={{
                    marginRight: 4
                }}
                size={16}
              />   Return to results
            </Text>
            <LocationResultSkeleton
                district={district ?? ""}
                type="page"
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
                                avCrimeRate={aggregates}
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
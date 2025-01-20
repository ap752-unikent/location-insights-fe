import { Stack, useBreakpointValue, Text } from "@chakra-ui/react"
import { LocationResultSkeleton } from "../components/location-result-skeleton/location-result-skeleton";
import { useFetchDistrictInsights } from "../hooks/use-fetch-district-insights";
import { ParksAndNature } from "../components/summaries/parks-and-nature/parks-and-nature";
import { useLocation, useNavigate, useParams} from "react-router"
import { Nightlife } from "../components/summaries/nightlife/nightlife";
import { Crime } from "../components/summaries/crime/crime";
import { useFetchAggregates } from "../hooks/use-fetch-aggregates";
import { Convenience } from "../components/summaries/convenience/convenience";
import { MdArrowBack } from "react-icons/md"
import { useEffect } from "react";
import { LocationAnalysisMainAnalysis } from "../components/location-analysis-main-analysis/location-analysis-main-analysis";

export const LocationAnalysis = () => {

    const { district } = useParams<{ district: string }>();
    const isSmallScreen = useBreakpointValue({ base: true, md: false });
    const totalWidth = useBreakpointValue({ base: "100%", lg: "50%" });
    const transform = useBreakpointValue({ base: "translateX(0%)", lg: "translateX(50%)" });

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
            width={totalWidth}
            transform={transform}
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
                    <LocationAnalysisMainAnalysis 
                        district={district}
                        districtData={districtData}
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                    />
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
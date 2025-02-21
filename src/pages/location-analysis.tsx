import { Stack, useBreakpointValue, Text } from "@chakra-ui/react"
import { LocationResultSkeleton } from "../components/location-result-skeleton/location-result-skeleton";
import { useFetchDistrictInsights } from "../hooks/use-fetch-district-insights";
import { ParksAndNature } from "../components/summaries/parks-and-nature/parks-and-nature";
import { useLocation, useNavigate, useParams } from "react-router"
import { Nightlife } from "../components/summaries/nightlife/nightlife";
import { Crime } from "../components/summaries/crime/crime";
import { useFetchAggregates } from "../hooks/use-fetch-aggregates";
import { Convenience } from "../components/summaries/convenience/convenience";
import { MdArrowBack, MdArrowForward } from "react-icons/md"
import { useEffect, useMemo } from "react";
import { LocationAnalysisMainAnalysis } from "../components/location-analysis-main-analysis/location-analysis-main-analysis";
import { DistrictExternalLink } from "../components/district-external-link/district-external-link";
import { usePageState } from "../contexts/page-state";
import { Heading } from "../components/location-result/heading";
import { useLocaleString } from "../contexts/internationalization";

export const LocationAnalysis = () => {

    const { state: { activeTab } } = usePageState();
    const { district } = useParams<{ district: string }>();
    const isSmallScreen = useBreakpointValue({ base: true, md: false });
    const externalLinkRenderedBelow = useBreakpointValue({ base: false, lg: true });
    const totalWidth = useBreakpointValue({ base: "100%", lg: "50%" });
    const transform = useBreakpointValue({ base: "translateX(0%)", lg: "translateX(50%)" });

    const { districtData } = useFetchDistrictInsights({ district });
    const { aggregates } = useFetchAggregates();
    const navigate = useNavigate();
    const location = useLocation();

    const returnToResults = useLocaleString({id: "returnToResults"});
    const returnToVotes = useLocaleString({id: "returnHome"});
    const exploreMoreAreas = useLocaleString({id: "exploreMoreAreas"});

    const isExternal = useMemo(() => {

        // if(activeTab === "results") {
        //     return false;
        // }

        // const referrer = document.referrer;
        // const isExternal = referrer && referrer.indexOf(window.location.origin) === -1;
        // return isExternal;

        return false; //always false for now, no ads directly linking this page
    }, []);

    const canGoBackToResults = useMemo(() => {
        return activeTab === "results";
    }, [window.history.state.length]);

    const backMessage = useMemo(() => {

        if (isExternal) {
            return exploreMoreAreas;
        }

        if (canGoBackToResults) {
            return returnToResults;
        }

        return returnToVotes;
    }, [canGoBackToResults, isExternal, returnToResults, returnToVotes, exploreMoreAreas]);

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

    const handleBackClick = () => {
        if (isExternal) {
            navigate("/");
            return;
        }

        if(location.state?.scrollPositionBestValueAreas) {
            navigate("/", {
                state: {
                    scrollPositionBestValueAreas: location.state.scrollPositionBestValueAreas,
                    scrollPositionYoungProfessionals: location.state.scrollPositionYoungProfessionals,
                    scrollPositionFamilyAreas: location.state.scrollPositionFamilyAreas
                }
            });

            return;
        }

        navigate(-1);
    }

    const heading = useMemo(() => (
        <Heading
            districtCode={district ?? ""}
            districtName={districtData?.districtName ?? ""}
        />), [district, districtData?.districtName])

    return (
        <Stack
            direction={"column"}
            width={totalWidth}
            transform={transform}
            marginTop={8}
            marginBottom={24}
            fontFamily={"Inter"}
        >
            {
                !isExternal && (
                    <BackLink
                        handleBackClick={handleBackClick}
                        isSmallScreen={isSmallScreen}
                        backMessage={backMessage}
                    />
                )
            }
            <LocationResultSkeleton
                heading={heading}
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
                {
                    district && !externalLinkRenderedBelow && (
                        <DistrictExternalLink
                            district={district}
                        />
                    )
                }
            </LocationResultSkeleton>
            {
                district && externalLinkRenderedBelow && (
                    <DistrictExternalLink
                        district={district}
                    />
                )
            }
            {
                isExternal && (
                    <BackLink
                        handleBackClick={handleBackClick}
                        isSmallScreen={isSmallScreen}
                        backMessage={backMessage}
                        isExternal={true}
                    />
                )
            }
        </Stack>
    )
}

type Props = {
    handleBackClick: () => void;
    isSmallScreen: boolean | undefined;
    backMessage: string;
    isExternal?: boolean;
}

const BackLink = ({ handleBackClick, isSmallScreen, backMessage, isExternal }: Props) => {
    return (
        <Text
            fontSize={"xs"}
            fontWeight={"bold"}
            color={"gray.500"}
            onClick={handleBackClick}
            cursor={"pointer"}
            alignSelf={"flex-start"}
            marginTop={isExternal ? 2 : 0}
            marginLeft={isSmallScreen ? 2 : 0}
            style={{
                display: "flex",
                alignItems: "center",
            }}
        >
            {
                isExternal ? (
                    <>
                        {backMessage}
                        < MdArrowForward
                            style={{
                                marginRight: 4
                            }}
                            size={16}
                        />
                    </>
                ) : (
                    <>
                        <MdArrowBack
                            style={{
                                marginRight: 4
                            }}
                            size={16}
                        />   {backMessage}
                    </>
                )
            }
        </Text>
    )
}
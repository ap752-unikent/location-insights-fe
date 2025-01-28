import { DistrictData } from "../../utils/api-client"
import { Stack, Text, useBreakpointValue } from "@chakra-ui/react"
import { getProgressColor } from "../../utils/color"
import { ProgressBar } from "../progress/progress-bar"
import { RangeChart } from "./range-chart"
import { useMemo } from "react"
import { IndividualScores } from "./individual-scores"
import { Button } from "../ui/button"
import { MdArrowForward } from "react-icons/md"
import { LocationResultSkeleton } from "../location-result-skeleton/location-result-skeleton"
import { useNavigate } from "react-router-dom"
import { usePageState } from "../../contexts/page-state"
import { categories, VOTE_IDS } from "../../constants"
import { Heading } from "./heading"

type Props = DistrictData & {
    yourBudget: number;
}

export const LocationResult = ({
    district,
    districtName,
    parksAndNatureScore,
    transportLinksScore,
    convenienceScore,
    crimeScore,
    nightlifeScore,
    normalizedScore,
    price,
    yourBudget
}: Props) => {

    const navigate = useNavigate();
    const color = useMemo(() => getProgressColor(normalizedScore), [normalizedScore]);
    const { updateState } = usePageState();
    const { min, max } = price;

    const isSmallScreen = useBreakpointValue({ base: true, md: false });
    const padding = useBreakpointValue({ base: "8px 12px", md: "16px 24px" });
    const progressBarHeight = useBreakpointValue({ base: 8, md: 12 });
    const compatibilityTextSize = useBreakpointValue({ base: "10px", md: "xs" });

    const handleViewDetails = () => {
        updateState({ scrollPosition: window.scrollY });
        navigate(`/location-analysis/${district}`);
    }

    const heading = useMemo(() => (
        <Heading
            districtCode={district}
            districtName={districtName}
            handleHeaderClick={handleViewDetails}
        />
    ), [district, districtName, handleViewDetails]);

    return (
        <LocationResultSkeleton
            heading={heading}
        >
            <Stack
                padding={padding}
                paddingBottom={0}
            >
                <Text
                    fontSize={compatibilityTextSize}
                    fontWeight={"bold"}
                    color={"gray.400"}
                    marginBottom={-2}
                >
                    Compatibility score: {(normalizedScore * 100).toFixed(0)}
                </Text>
                <ProgressBar
                    value={normalizedScore}
                    color={color}
                    height={progressBarHeight}
                />
                <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                >
                    <RangeChart
                        bottomValue={yourBudget * 4}
                        min={min * 4}
                        max={max * 4}
                        bottomYLabel="Your budget"
                        topYLabel="Rent"
                        unit="£"
                        width={"105%"}
                    />
                    <div style={{ width: 16 }} />
                    <IndividualScores
                        scores={[
                            { score: parksAndNatureScore, label: "Parks & Nature", icon: categories.find(c => c.id === VOTE_IDS.parksAndNature)?.icon },
                            { score: transportLinksScore, label: "Transport Links", icon: categories.find(c => c.id === VOTE_IDS.transportLinks)?.icon },
                            { score: nightlifeScore, label: "Nightlife", icon: categories.find(c => c.id === VOTE_IDS.nightlife)?.icon },
                            { score: convenienceScore, label: "Convenience", icon: categories.find(c => c.id === VOTE_IDS.convenienceStores)?.icon },
                            { score: crimeScore, label: "Safety", icon: categories.find(c => c.id === VOTE_IDS.safety)?.icon }
                        ]}
                    />

                </Stack>
            </Stack>
            <Button
                width={140}
                alignSelf={"flex-end"}
                variant={"plain"}
                color={"blackAlpha.700"}
                fontWeight={"bold"}
                fontSize={"xs"}
                marginBottom={2}
                marginRight={isSmallScreen ? 0 : 2}
                onClick={handleViewDetails}
            >
                Explore {district} <MdArrowForward />
            </Button>
        </LocationResultSkeleton>
    )
}
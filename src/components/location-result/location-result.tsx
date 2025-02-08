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
import { LocaleText, useLocaleString } from "../../contexts/internationalization"

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

    const parksAndNatureText = useLocaleString({ id: "parksAndNatureLabel" });
    const transportLinksText = useLocaleString({ id: "transportLinksLabel" });
    const convenienceText = useLocaleString({ id: "convenienceLabel" });
    const crimeText = useLocaleString({ id: "safetyLabel" });
    const nightlifeText = useLocaleString({ id: "nightlifeLabel" });
    const rentTextGraph = useLocaleString({ id: "rentTextGraph" });
    const yourBudgetTextGraph = useLocaleString({ id: "yourBudgetGraph" });
    const exploreText = useLocaleString({
        id: "exploreDistrict",
        replacements: { district }
    });

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
                <LocaleText
                    fontSize={compatibilityTextSize}
                    fontWeight={"bold"}
                    color={"gray.400"}
                    marginBottom={-2}
                    id="compatibilityScoreText"
                    replacements={{ score: (normalizedScore * 100).toFixed(0) }}
                />
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
                        bottomYLabel={yourBudgetTextGraph}
                        topYLabel={rentTextGraph}
                        unit="£"
                        width={"100%"}
                    />
                    <div style={{ width: 16 }} />
                    <IndividualScores
                        scores={[
                            { score: parksAndNatureScore, label: parksAndNatureText, icon: categories.find(c => c.id === VOTE_IDS.parksAndNature)?.icon },
                            { score: transportLinksScore, label: transportLinksText, icon: categories.find(c => c.id === VOTE_IDS.transportLinks)?.icon },
                            { score: nightlifeScore, label: nightlifeText, icon: categories.find(c => c.id === VOTE_IDS.nightlife)?.icon },
                            { score: convenienceScore, label: convenienceText, icon: categories.find(c => c.id === VOTE_IDS.convenienceStores)?.icon },
                            { score: crimeScore, label: crimeText, icon: categories.find(c => c.id === VOTE_IDS.safety)?.icon }
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
                {exploreText}
                <MdArrowForward />
            </Button>
        </LocationResultSkeleton>
    )
}
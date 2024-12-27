import { DistrictData } from "../../utils/api-client"
import { Stack, Text, useBreakpointValue } from "@chakra-ui/react"
import { getProgressColor } from "../../utils/color"
import { ProgressBar } from "../progress/progress-bar"
import { PriceChart } from "./price-chart"
import { useEffect, useMemo, useRef, useState } from "react"
import { IndividualScores } from "./individual-scores"
import { Heading } from "./heading"

type Props = DistrictData & {
    yourBudget: number;
}

export const LocationResult = ({
    district,
    parksAndNatureScore,
    transportLinksScore,
    convenienceStoresScore,
    crimeScore,
    nightlifeScore,
    normalizedScore,
    price,
    yourBudget
}: Props) => {

    const [elementWidth, setElementWidth] = useState(0);
    const color = useMemo(() => getProgressColor(normalizedScore), [normalizedScore]);
    const { min, max } = price;
    const ref = useRef<HTMLDivElement>(null);

    const isSmallScreen = useBreakpointValue({ base: true, md: false });
    const padding = useBreakpointValue({ base: "8px 12px", md: "16px 24px" });
    const progressBarHeight = useBreakpointValue({ base: 8, md: 12 });
    const compatibilityTextSize = useBreakpointValue({ base: "10px", md: "xs" });

    useEffect(() => {
        setElementWidth(ref.current?.clientWidth || 0);
    })

    return (
        <Stack
            backgroundColor="background"
            borderRadius={8}
            boxShadow={"md"}
            ref={ref}
        >
            <Heading district={district} />
            <Stack
                padding={padding}
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
                    <PriceChart
                        yourBudget={yourBudget}
                        min={min}
                        max={max}
                    />
                    {
                        !isSmallScreen && (
                            <>
                                <div style={{ width: 16 }} />
                                <IndividualScores
                                    scores={[
                                        { score: parksAndNatureScore, label: "Parks & Nature" },
                                        { score: transportLinksScore, label: "Transport Links" },
                                        { score: convenienceStoresScore, label: "Convenience" },
                                        { score: crimeScore, label: "Safety" },
                                        { score: nightlifeScore, label: "Nightlife" }
                                    ]}
                                    width={elementWidth - 32}
                                />
                            </>
                        )
                    }
                </Stack>
            </Stack>
        </Stack>
    )
}
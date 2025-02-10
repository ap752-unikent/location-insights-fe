import { useMemo } from "react"
import { DistrictHighlightEnum } from "../../types"
import { Stack, Text} from "@chakra-ui/react"
import { useLocaleString } from "../../contexts/internationalization"
import Markdown from "react-markdown"

type Props = {
    highlight: DistrictHighlightEnum
}

export const HighlightPill = ({ highlight } : Props) => {

    const transportLinksHighlight = useLocaleString({id: "transportLinksHighlight"});
    const goodOverallHighlight = useLocaleString({id: "goodOverallHighlight"});
    const parksAndNatureHighlight = useLocaleString({id: "parksAndNatureHighlight"});
    const convenienceHighlight = useLocaleString({id: "convenienceHighlight"});
    const crimeHighlight = useLocaleString({id: "crimeHighlight"});
    const nightlifeHighlight = useLocaleString({id: "nightlifeHighlight"});

    const highlightText = useMemo(() => {
        switch (highlight) {
            case "parksAndNature":
                return parksAndNatureHighlight
            case "convenience":
                return convenienceHighlight
            case "crime":
                return crimeHighlight
            case "nightlife":
                return nightlifeHighlight
            case "transportLinks":
                return transportLinksHighlight
            case "goodOverall":
                return goodOverallHighlight
            default:
                return "";
        }
    }, [highlight, transportLinksHighlight, goodOverallHighlight, parksAndNatureHighlight, convenienceHighlight, crimeHighlight, nightlifeHighlight]);

    return (
        <Stack
            backgroundColor="lightgray"
            borderRadius={16}
            paddingY={1}
            paddingX={4}
        >
            <Text
                fontSize={"x-small"}
                fontWeight="semibold"
                color="primary"
            >
                <Markdown>
                    {highlightText}
                </Markdown>
            </Text>
        </Stack>
    )
}
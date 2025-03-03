import { HStack, Stack, useBreakpointValue, VStack, Separator } from "@chakra-ui/react";
import { DistrictHighlightEnum, DistrictHighlights } from "../../types";
import { Heading } from "../location-result/heading";
import { useMemo } from "react";
import { HighlightPill } from "./highlight-pill";
import { AveragePrice } from "./average-price";
import { ActionButtons } from "./action-btns";
import { LocalCurrency } from "../../hooks/use-local-currency";

type Props = {
    districtHighlights: DistrictHighlights;
    currency: LocalCurrency | undefined;
    handleCardClick: (districtCode: string) => void;
}

export const LocationCardMinimal = ({ districtHighlights, currency, handleCardClick}: Props) => {
    const { districtCode, districtName, highlights: rawHighlights, price } = districtHighlights;
    const borderRadius = useBreakpointValue({ base: "8px"});
    const minW = useBreakpointValue({ base: "300px", md: "300px" });
    const height = useBreakpointValue({ base: "360px", md: "360px" });

    const highlights: DistrictHighlightEnum[] = useMemo(() => {
        if (rawHighlights && rawHighlights.length < 1) {
            return ["goodOverall"];
        }

        return rawHighlights;
    }, [rawHighlights]);

    const heading = useMemo(() => (
        <Heading
            districtCode={districtCode}
            districtName={districtName}
            customBorderRadius={borderRadius}
            handleHeaderClick={() => handleCardClick(districtCode)}
        />), [districtCode, districtName]);

    const priceInLocalCurrency = useMemo(() => {

        if (!currency) {
            return price.average * 4.3;
        }

        return price.average * currency.exchangeRate * 4.3;
    }, [price.average, currency?.exchangeRate]);

    return (
        <Stack
            borderRadius={borderRadius}
            minW={minW}
            height={height}
            boxShadow={"md"}
            onClick={() => handleCardClick(districtCode)}
            cursor={"pointer"}
        >
            {heading}
            <VStack
                padding={0}
                height={"100%"}
                justifyContent={"space-between"}
            >
                <Stack>
                    <HStack
                        wrap={"wrap"}
                        width={"100%"}
                        alignSelf={"flex-start"}
                        marginY={2}
                        paddingX={3}
                    >
                        {highlights.map((highlight, index) => (
                            <HighlightPill
                                key={index}
                                highlight={highlight}
                            />
                        ))}
                    </HStack>
                    <AveragePrice 
                        averagePrice={priceInLocalCurrency}
                        currencyCode={currency?.currency || "GBP"}
                     />
                </Stack>
                <ActionButtons
                    districtCode={districtCode}
                />
            </VStack>
        </Stack>
    )
}
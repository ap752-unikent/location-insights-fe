import { LocalCurrency } from "../../hooks/use-local-currency";
import { DistrictHighlights } from "../../types";
import { HStack, Stack } from "@chakra-ui/react";
import { forwardRef } from "react";
import { LocationCardMinimal } from "../location-card-minimal/location-card-minimal";
import { LocaleText } from "../../contexts/internationalization";

type Props = {
    id: string;
    districtHighlights: DistrictHighlights[] | undefined;
    currency: LocalCurrency | undefined;
    handleCardClick: (districtCode: string) => void;
    localeTitleId: string;
}

export const LocationCarousel = forwardRef<HTMLDivElement, Props>(({
    districtHighlights,
    currency,
    handleCardClick,
    localeTitleId,
    id
}, ref) => {

    if (!districtHighlights) {
        return null;
    }

    return (
        <Stack
            id={id}
            width={"100%"}
            gap={0}
        >
            <LocaleText
                id={localeTitleId}
                fontSize={"small"}
                fontWeight={"bold"}
                color={"gray.500"}
                paddingY={2}
            />
            <HStack
                width={"100%"}
                overflowX={"auto"}
                gap={8}
                paddingBottom={4}
                paddingLeft={1}
                ref={ref}
            >
                {districtHighlights.sort((a, b) => b.highlights.length - a.highlights.length).map((area) => (
                    <LocationCardMinimal
                        districtHighlights={area}
                        key={area.districtCode}
                        currency={currency}
                        handleCardClick={handleCardClick}
                    />
                ))}
            </HStack>
        </Stack>
    )
})
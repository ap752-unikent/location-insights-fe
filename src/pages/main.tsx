import { Stack, useBreakpointValue, Text, VStack, HStack, Button } from "@chakra-ui/react"
import "@fontsource/inter";
import "@fontsource/montserrat";
import { useFetchHighlightedAreas } from "../hooks/use-best-value-areas";
import { FaArrowRight } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { LocaleText } from "../contexts/internationalization";
import { useLocalCurrency } from "../hooks/use-local-currency";
import { useEffect, useRef } from "react";
import { LocationCarousel } from "../components/location-carousel/location-carousel";
import { StepsItem, StepsList, StepsRoot } from "../components/ui/steps";

export const Main = () => {

    const { data: bestValueAreas } = useFetchHighlightedAreas({
        pathSuffix: "best-value-areas"
    });

    const { data: youngProfessionalAreas } = useFetchHighlightedAreas({
        pathSuffix: "young-professional-areas"
    })

    const { data: familyAreas } = useFetchHighlightedAreas({
        pathSuffix: "family-areas"
    })

    const totalWidth = useBreakpointValue({ base: "100%", lg: "50%" });
    const transform = useBreakpointValue({ base: "translateX(0%)", lg: "translateX(50%)" });
    const pageMarginX = useBreakpointValue({ base: 4, lg: 0 });
    const { data: currency } = useLocalCurrency();

    const bestValueAreasCarouselRef = useRef<HTMLDivElement>(null);
    const youngProfessionalsCarouselRef = useRef<HTMLDivElement>(null);
    const familyAreasCarouselRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();
    const location = useLocation();

    const handleCardClick = (districtCode: string) => {
        navigate(`/location-analysis/${districtCode}`, {
            state: {
                scrollPositionBestValueAreas: bestValueAreasCarouselRef.current?.scrollLeft ?? 0,
                scrollPositionYoungProfessionals: youngProfessionalsCarouselRef.current?.scrollLeft ?? 0,
                scrollPositionFamilyAreas: familyAreasCarouselRef.current?.scrollLeft ?? 0
            }
        });
    }

    return (
        <Stack
            direction={"column"}
            width={totalWidth}
            transform={transform}
            marginTop={8}
            marginBottom={24}
            paddingX={pageMarginX}
            fontFamily={"Inter"}
            gap={24}
        >
            <VStack
                alignItems={"flex-start"}
            >
                <LocaleText
                    id="heroText"
                    fontSize={"xx-large"}
                    fontWeight={"bold"}
                    color={"primary.950"}
                />
                <Text
                    fontSize={"large"}
                    marginBottom={4}
                    color={"primary.950"}
                >
                    There isn’t one neighbourhood that’s <b>'the best'</b>, but there is one that’s <b>the best for you!</b> Find an area that matches <b>your lifestyle and budget.</b>
                </Text>
                <Button
                    colorPalette={"primary"}
                    variant={"solid"}
                    onClick={() => navigate("/best-areas")}
                >
                    Discover Your Ideal London Neighbourhood
                    <FaArrowRight
                        style={{
                            marginLeft: 16,
                            width: 16
                        }}
                    />
                </Button>
            </VStack>
            <VStack
                alignItems={"flex-start"}
                gap={4}
            >
                <Text
                    fontSize={"x-large"}
                    fontWeight={"bold"}
                    color={"primary.950"}
                >
                    How It Works
                </Text>
                <StepsRoot
                    height="400px"
                    defaultValue={1}
                    count={3}
                    colorPalette={"primary"}
                    orientation={"vertical"}
                >
                    <StepsList
                        height={250}
                    >
                        <StepsItem
                            index={0}
                            title="Tell Us What Matters to You"
                            description="Prioritise your preferences, such as transport links, parks, and nightlife."
                        />
                        <StepsItem 
                            index={1} 
                            title="Get Matched to the Best Areas"
                            description="We compare over 300 neighbourhoods to find the ones that best match your preferences." 
                        />
                        <StepsItem 
                            index={2} 
                            title="View Properties That Fit Your Needs"
                            description="Browse properties in the areas that match your lifestyle and budget." 
                        />
                    </StepsList>
                </StepsRoot>
            </VStack>
        </Stack>
    )
}
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

    useEffect(() => {
        if (location.state?.scrollPositionBestValueAreas && bestValueAreasCarouselRef.current) {
            bestValueAreasCarouselRef.current.scrollLeft = location.state.scrollPositionBestValueAreas;
        }

        if (location.state?.scrollPositionYoungProfessionals && youngProfessionalsCarouselRef.current) {
            youngProfessionalsCarouselRef.current.scrollLeft = location.state.scrollPositionYoungProfessionals;
        }

        if (location.state?.scrollPositionFamilyAreas && familyAreasCarouselRef.current) {
            familyAreasCarouselRef.current.scrollLeft = location.state.scrollPositionFamilyAreas;
        }
    }, [location])

    return (
        <Stack
            direction={"column"}
            width={totalWidth}
            transform={transform}
            marginTop={8}
            marginBottom={24}
            paddingX={pageMarginX}
            fontFamily={"Inter"}
        >
            <VStack
                alignItems={"flex-start"}
            >
                <LocaleText
                    id="heroText"
                    fontSize={"xx-large"}
                    fontWeight={"bold"}
                    color={"primary"}
                />
                <LocaleText
                    id="mainDescription"
                    fontSize={"large"}
                    marginBottom={4}
                    color={"primary"}
                />
            </VStack>
            {
                bestValueAreas && bestValueAreas.length > 0 && (
                    <VStack
                        alignItems={"flex-start"}
                        gap={0}
                    >
                        <LocationCarousel
                            id="youngProfessionals"
                            localeTitleId={"youngProfessionalAreas"}
                            districtHighlights={youngProfessionalAreas}
                            currency={currency}
                            handleCardClick={handleCardClick}
                            ref={youngProfessionalsCarouselRef}
                        />
                        <div style={{ height: 32 }} />
                        <LocationCarousel
                            id="families"
                            localeTitleId={"familyAreas"}
                            districtHighlights={familyAreas}
                            currency={currency}
                            handleCardClick={handleCardClick}
                            ref={familyAreasCarouselRef}
                        />
                        <div style={{ height: 32 }} />
                        <LocationCarousel
                            id="bestValueAreas"
                            localeTitleId={"bestValueAreas"}
                            districtHighlights={bestValueAreas}
                            currency={currency}
                            handleCardClick={handleCardClick}
                            ref={bestValueAreasCarouselRef}
                        />

                        <div style={{ height: 48 }} />
                        <MoreSpecificBtn />
                    </VStack>
                )
            }
        </Stack>
    )
}

const MoreSpecificBtn = () => {

    const navigate = useNavigate();

    return (
        <Button
            width={"100%"}
            variant={"plain"}
            flexDirection={"row"}
            paddingX={0}
            alignItems={"center"}
            justifyContent={"space-between"}
            onClick={() => navigate("/votes")}
        >
            <VStack
                alignItems={"flex-start"}
                gap={0}
            >
                <LocaleText
                    id="moreSpecificBtnTitle"
                    fontSize={"md"}
                    fontWeight={"bold"}
                    color={"primary"}
                />
                <LocaleText
                    id="moreSpecificBtnText"
                    fontSize={"sm"}
                    color={"gray.500"}
                    textWrap={"wrap"}
                    textAlign={"left"}
                />
            </VStack>
            <FaArrowRight
                style={{
                    width: 16,
                    height: 16
                }}
            />
        </Button>
    )
}
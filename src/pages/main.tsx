import { Stack, useBreakpointValue, Text, VStack, HStack, Button } from "@chakra-ui/react"
import "@fontsource/inter";
import { useFetchBestValueAreas } from "../hooks/use-best-value-areas";
import { LocationCardMinimal } from "../components/location-card-minimal/location-card-minimal";
import { FaArrowRight } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { LocaleText } from "../contexts/internationalization";
import { useLocalCurrency } from "../hooks/use-local-currency";
import { useEffect, useRef } from "react";

export const Main = () => {

    const { data: bestValueAreas } = useFetchBestValueAreas();

    const totalWidth = useBreakpointValue({ base: "100%", lg: "50%" });
    const transform = useBreakpointValue({ base: "translateX(0%)", lg: "translateX(50%)" });
    const pageMarginX = useBreakpointValue({ base: 4, lg: 0 });
    const { data: currency } = useLocalCurrency();
    const scrollPosition = useRef(0);
    const carouselRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const location = useLocation();

    const handleCardClick = (districtCode: string) => {
        navigate(`/location-analysis/${districtCode}`, {
            state: {
                scrollPosition: scrollPosition.current
            }
        });
    }

    useEffect(() => {
        if(location.state?.scrollPosition && carouselRef.current) {
            carouselRef.current.scrollLeft = location.state.scrollPosition;
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
                        <LocaleText 
                            id="bestValueAreas"
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
                            ref={carouselRef}
                            onScroll={(e) => scrollPosition.current = e.currentTarget.scrollLeft}
                        >
                            {bestValueAreas.sort((a, b) => b.highlights.length - a.highlights.length).map((area) => (
                                <LocationCardMinimal
                                    districtHighlights={area}
                                    key={area.districtCode}
                                    currency={currency}
                                    handleCardClick={handleCardClick}
                                />
                            ))}
                        </HStack>
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
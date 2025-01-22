import { Button, Text, Image, HStack, useBreakpointValue } from "@chakra-ui/react"
import rightmove from "../../assets/rightmove.svg";
import { FaExternalLinkAlt } from "react-icons/fa";

export const DistrictExternalLink = ({ district }: { district: string }) => {
    
    const borderRadius = useBreakpointValue({ base: 0, lg: 8 });
    const handleClick = () => {
        // @ts-ignore
        window.sa_event('external_link_partner')
        window.open(`https://www.rightmove.co.uk/property-to-rent/${district}.html`, "_blank", 'noopener,noreferrer');
    }
    const fontSize = useBreakpointValue({ base: 14, lg: 16 });
    const rightmoveLogoSize = useBreakpointValue({ base: 4, lg: 5 });
    const externalLinkIconSize = useBreakpointValue({ base: 16, lg: 20 });

    return (
        <Button
            width={"100%"}
            direction={"row"}
            justifyContent={"space-between"}
            padding={4}
            paddingY={8}
            boxShadow={"md"}
            borderRadius={borderRadius}
            marginTop={4}
            variant={"outline"}
            alignItems={"center"}
            onClick={handleClick}
        >
            <HStack
                alignItems={"center"}
            >
                <Image
                    src={rightmove}
                    width={rightmoveLogoSize}
                    height={rightmoveLogoSize}
                />
                <Text
                    fontSize={fontSize}
                    color={"gray.500"}
                    marginLeft={2}
                    textWrap={"wrap"}
                    textAlign={"left"}
                >
                    Like the look of this area? Search for properties in <b>{district}</b> on <b>Rightmove</b>
                </Text>
            </HStack>
            <FaExternalLinkAlt
                style={{
                    width: externalLinkIconSize,
                    height: externalLinkIconSize,
                }}
            />
        </Button>
    )
}
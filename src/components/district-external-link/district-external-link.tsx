import { Button, Image, HStack, useBreakpointValue } from "@chakra-ui/react"
import rightmove from "../../assets/rightmove.svg";
import { FaExternalLinkAlt } from "react-icons/fa";
import { LocaleText } from "../../contexts/internationalization";

const STRING_IDS = ["externalLinkText"];

export const DistrictExternalLink = ({ district }: { district: string }) => {
    
    const isSmallScreen = useBreakpointValue({ base: true, lg: false });
    const borderRadius = useBreakpointValue({ base: 0, lg: 8 });
    const handleClick = () => {
        // @ts-ignore
        window.sa_event('external_link_partner');
        // @ts-ignore
        window.gtag('event', 'conversion', { 'send_to': 'AW-956745982/flJvCN_oj5EaEP6Rm8gD'});
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
            boxShadow={isSmallScreen ? "none" : "md"}
            borderRadius={borderRadius}
            marginTop={4}
            variant={"outline"}
            alignItems={"center"}
            onClick={handleClick}
            border={isSmallScreen ? "none" : "auto"}
        >
            <HStack
                alignItems={"center"}
            >
                <Image
                    src={rightmove}
                    width={rightmoveLogoSize}
                    height={rightmoveLogoSize}
                />
                <LocaleText 
                    id={"externalLinkText"}
                    replacements={{ district }}
                    fontSize={fontSize}
                    color={"gray.500"}
                    marginLeft={2}
                    textWrap={"wrap"}
                    textAlign={"left"}
                />
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
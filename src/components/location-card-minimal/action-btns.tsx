import { LocaleText, useLocaleString } from "../../contexts/internationalization";
import { Separator, VStack, Text, HStack, Button } from "@chakra-ui/react"
import { MdArrowForward, } from "react-icons/md"
import { FaExternalLinkAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type Props = {
    districtCode: string;
}

export const ActionButtons = (
    { districtCode }: Props
) => {

    const navigate = useNavigate();
    const handleExternalClick = () => {
        // @ts-ignore
        window.sa_event('external_link_partner');
        // @ts-ignore
        window.gtag('event', 'conversion', { 'send_to': 'AW-956745982/flJvCN_oj5EaEP6Rm8gD'});
        window.open(`https://www.rightmove.co.uk/property-to-rent/${districtCode}.html`, "_blank", 'noopener,noreferrer');
    }

    const viewListingsBtnText = useLocaleString({
        id: "viewListingsBtn"
    });
    const areaInsightsBtnText = useLocaleString({
        id: "areaInsightsBtn"
    });

    return (
        <VStack
            width={"100%"}
            height={"100%"}
            justifyContent={"flex-end"}
            paddingBottom={4}
            gap={2}
        >
            <Button
                w={"100%"}
                bgColor={"primary"}
                _hover={{
                    opacity: 0.8
                }}
                justifyContent={"space-between"}
                h={8}
                onClick={() => navigate(`/location-analysis/${districtCode}`)}
            >
                {areaInsightsBtnText} <MdArrowForward />
            </Button>
            <Button
                w={"100%"}
                bgColor={"primary"}
                color={"white"}
                _hover={{
                    opacity: 0.8
                }}
                justifyContent={"space-between"}
                h={8}
                onClick={handleExternalClick}
            >
                {viewListingsBtnText} <FaExternalLinkAlt style={{
                    width: 16,
                    height: 16,
                }}/>
            </Button>
        </VStack>
    )
}
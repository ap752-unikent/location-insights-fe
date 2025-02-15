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

    return (
        <VStack
            width={"100%"}
            height={"100%"}
            justifyContent={"flex-end"}
            paddingBottom={4}
            gap={4}
        >
            <Separator />
            <HStack
                width={"100%"}
                justifyContent={"space-between"}
                paddingX={3}
            >
                <LocaleText 
                    id="exploreDistrictMore"
                    replacements={{ district: districtCode }}
                    fontSize={"xs"}
                    color={"gray.500"}
                />
                <MdArrowForward />
            </HStack>
        </VStack>
    )
}
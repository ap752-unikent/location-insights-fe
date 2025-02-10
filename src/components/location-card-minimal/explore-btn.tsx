import { LocaleText } from "../../contexts/internationalization";
import { Separator, VStack, Text, HStack } from "@chakra-ui/react"
import { MdArrowForward } from "react-icons/md"

type Props = {
    districtCode: string;
}

export const ExploreBtn = (
    { districtCode }: Props
) => {


    return (
        <VStack
            width={"100%"}
            maxH={16}
            height={"100%"}
            justifySelf={"flex-end"}
            gap={0}
        >
            <Separator />
            <HStack
                width={"100%"}
                height={"100%"}
                justifyContent={"space-between"}
                paddingX={4}
                paddingY={2}
                alignItems={"center"}
            >
                <LocaleText 
                    id="exploreDistrictMore"
                    fontSize={"xs"}
                    color={"gray.500"}
                    replacements={{
                        district: districtCode
                    }}
                />
                <MdArrowForward />
            </HStack>
        </VStack>
    )
}
import { LocaleText, useLocaleString } from "../../contexts/internationalization";
import { HStack, useToken, Text} from "@chakra-ui/react"
import { useMemo } from "react";
import { IoIosCash } from "react-icons/io";

type Props = {
    averagePrice: number;
    currencyCode: string;
}

export const AveragePrice = ({
    averagePrice,
    currencyCode
} : Props) => {

    const [primary] = useToken("colors", ["primary"]);
    const priceFormatted = useMemo(() => {
        return `${averagePrice.toFixed(0)} ${currencyCode}`;
    }, [averagePrice]);

    return (
        <HStack
            gap={4}
            paddingX={3}
        >
            <IoIosCash 
                color={primary}
                size={48}
                style={{
                    flexGrow: 1
                }}
            />
            <LocaleText 
                id="averageRoomPrice"
                fontSize={"xs"}
                color={"gray.500"}
                replacements={{
                    value: priceFormatted
                }}
            />
        </HStack>
    )
}
import { Text } from "@chakra-ui/react";

type Props = {
    text: string;
    icon: JSX.Element;
    count: number;
}

export const PlacesText = ({ text, icon, count }: Props) => {

    if (count === 0) {
        return null;
    }

    return (
        <Text
            fontSize={"sm"}
            color={"gray.500"}
            fontWeight={"bold"}
            style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row"
            }}
        >
            {icon} {count} {text}
        </Text>
    )
}
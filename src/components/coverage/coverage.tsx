import { Stack } from "@chakra-ui/react"
import { Dot } from "../dot/dot";
import { Text } from "@chakra-ui/react";

type Props = {
    color: string;
    score: number;
}

export const Coverage = ({
    color,
    score
} : Props) => {
    return (
        <Stack
            direction="row"
            alignItems={"center"}
        >
            <Dot 
                color={color}
                size={16}
            />
            <Text
                fontSize={"xs"}
                fontWeight={"bold"}
                color={"gray.500"}
            >{score}%</Text>
        </Stack>
    )
}
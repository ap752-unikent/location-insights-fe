import { Stack, Text} from "@chakra-ui/react"
import { PropsWithChildren } from "react";

type Props = {
    title: string;
    icon: JSX.Element;
}

export const SummarySkeleton = (
    {
        title,
        icon,
        children
    } : PropsWithChildren<Props>
) => {
    return (
        <Stack>
            <Text
                fontSize={"md"}
                fontWeight={"bold"}
                color={"gray.500"}
                style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row"
                }}
            >
                {title} &nbsp; {icon}
            </Text>
            {children}
        </Stack>
    )
}
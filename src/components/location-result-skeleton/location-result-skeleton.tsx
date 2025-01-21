import { forwardRef, PropsWithChildren } from "react";
import { Stack, useBreakpointValue } from "@chakra-ui/react";
import { Heading } from "../location-result/heading";

type Props = {
    district: string;
    type: "card" | "page";
};

export const LocationResultSkeleton = forwardRef<HTMLDivElement, PropsWithChildren<Props>>(
    ({ district, children, type}, ref) => {

        const borderRadius = useBreakpointValue({ base: 0, lg: 8 });

        return (
            <Stack
                backgroundColor="background"
                borderRadius={borderRadius}
                boxShadow={"md"}
                ref={ref}
                gap={0}
            >
                <Heading 
                    district={district} 
                />
                {children}
            </Stack>
        );
    }
);

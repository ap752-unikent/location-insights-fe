import { forwardRef, PropsWithChildren } from "react";
import { Stack, useBreakpointValue } from "@chakra-ui/react";
import { Heading } from "../location-result/heading";

type Props = {
    heading: React.ReactNode;
};

export const LocationResultSkeleton = forwardRef<HTMLDivElement, PropsWithChildren<Props>>(
    ({ children, heading}, ref) => {

        const borderRadius = useBreakpointValue({ base: 0, lg: 8 });

        return (
            <Stack
                backgroundColor="background"
                borderRadius={borderRadius}
                boxShadow={"md"}
                ref={ref}
                gap={0}
            >
                {heading}
                {children}
            </Stack>
        );
    }
);

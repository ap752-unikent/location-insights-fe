import { forwardRef, PropsWithChildren } from "react";
import { Stack } from "@chakra-ui/react";
import { Heading } from "../location-result/heading";

type Props = {
    district: string;
};

export const LocationResultSkeleton = forwardRef<HTMLDivElement, PropsWithChildren<Props>>(
    ({ district, children }, ref) => {

        return (
            <Stack
                backgroundColor="background"
                borderRadius={8}
                boxShadow={"md"}
                ref={ref}
                gap={0}
            >
                <Heading district={district} />
                {children}
            </Stack>
        );
    }
);

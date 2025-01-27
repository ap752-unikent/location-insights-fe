import { forwardRef, PropsWithChildren } from "react";
import { Stack, useBreakpointValue } from "@chakra-ui/react";
import { Heading } from "../location-result/heading";

type Props = {
    districtCode: string;
    districtName: string;
    type: "card" | "page";
};

export const LocationResultSkeleton = forwardRef<HTMLDivElement, PropsWithChildren<Props>>(
    ({ districtCode, districtName, children, type}, ref) => {

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
                    districtCode={districtCode}
                    districtName={districtName}
                />
                {children}
            </Stack>
        );
    }
);

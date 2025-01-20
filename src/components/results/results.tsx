import { Stack, Text, useBreakpointValue } from "@chakra-ui/react"
import { Slider } from "../ui/slider"
import { PaginationItems, PaginationNextTrigger, PaginationPrevTrigger, PaginationRoot } from "../ui/pagination"
import { DistrictData } from "../../utils/api-client";
import { useMemo, useState } from "react";
import { LocationResult } from "../location-result/location-result";
import { usePageState } from "../../contexts/page-state";

type Props = {
    districts: DistrictData[] | undefined;
    districtsLoading: boolean;
    weeklyPriceThreshold: number;
    budgetMonthly: number;
    setBudgetMonthly: (value: number) => void;
}

const ITEMS_PER_PAGE = 5;

export const Results = ({
    districts,
    districtsLoading,
    weeklyPriceThreshold,
    budgetMonthly,
    setBudgetMonthly
}: Props) => {

    const { state: { pageNumber }, updateState } = usePageState();
    const isSmallScreen = useBreakpointValue({ base: true, md: false });
    const marginX = useBreakpointValue({ base: 4, lg: 0 });

    const handleSetPage = (newPage: number) => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
        updateState({ pageNumber: newPage });
    }

    const displayStartIndex = useMemo(() => (pageNumber - 1) * ITEMS_PER_PAGE, [pageNumber]);
    const displayEndIndex = useMemo(() => pageNumber * ITEMS_PER_PAGE, [pageNumber]);

    return (
        <Stack
            direction={"column"}
            width={"100%"}
            gap={4}
        >
            <Stack
                direction={"column"}
                gap={0}
                marginX={marginX}
            >
                <Text
                    fontSize={"sm"}
                    color={"gray.500"}
                    fontWeight={"bold"}
                >
                    My budget is £{budgetMonthly} per month for one room (excluding bills)
                </Text>
                <Slider
                    fontWeight={"bold"}
                    fontSize={"xs"}
                    onValueChange={(details) => setBudgetMonthly(details.value[0])}
                    value={[budgetMonthly]}
                    width={isSmallScreen ? "100%" : "50%"}
                    variant={"outline"}
                    min={400}
                    max={3000}
                    step={50}
                />
            </Stack>
            {districtsLoading && <Text>Loading...</Text>}
            {districts && districts.slice(displayStartIndex, displayEndIndex).map((district) => <LocationResult
                key={district.district}
                {...district}
                yourBudget={weeklyPriceThreshold}
            />)}
            <PaginationRoot
                count={districts?.length || 0}
                pageSize={ITEMS_PER_PAGE}
                page={pageNumber}
                onPageChange={(details) => handleSetPage(details.page)}
            >
                <PaginationPrevTrigger />
                <PaginationItems />
                <PaginationNextTrigger />
            </PaginationRoot>
        </Stack>
    )

}
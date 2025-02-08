import { Stack, Text, useBreakpointValue } from "@chakra-ui/react"
import { Slider } from "../ui/slider"
import { PaginationItems, PaginationNextTrigger, PaginationPrevTrigger, PaginationRoot } from "../ui/pagination"
import { DistrictData } from "../../utils/api-client";
import { useMemo } from "react";
import { LocationResult } from "../location-result/location-result";
import { usePageState } from "../../contexts/page-state";
import { useLocalCurrency } from "../../utils/use-local-currency";
import localeCode from "locale-code";
import { LocaleText } from "../../contexts/internationalization";

type Props = {
    districts: DistrictData[] | undefined;
    districtsLoading: boolean;
    weeklyPriceThreshold: number;
    budgetMonthlyGbp: number;
    setBudgetMonthlyGbp: (value: number) => void;
}

const ITEMS_PER_PAGE = 5;

export const Results = ({
    districts,
    districtsLoading,
    weeklyPriceThreshold,
    budgetMonthlyGbp,
    setBudgetMonthlyGbp
}: Props) => {

    const countryCode = localeCode.getCountryCode(navigator.language);
    const { state: { pageNumber }, updateState } = usePageState();
    const { data: currencyData } = useLocalCurrency();
    const currencyValue = useMemo(() => Number((currencyData?.exchangeRate ?? 1) * budgetMonthlyGbp).toFixed(0), [currencyData, budgetMonthlyGbp]);
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
                <LocaleText 
                    fontSize={"sm"}
                    fontWeight={"bold"}
                    color={"gray.500"}
                    id="budgetPerMonth"
                    replacements={{
                        value: (countryCode !== undefined && currencyData?.exchangeRate !== undefined && countryCode.toUpperCase() !== "GB") ? `${currencyValue} ${currencyData?.currency} (£${budgetMonthlyGbp})` : `£${budgetMonthlyGbp}`
                    }}
                />
                <Slider
                    fontWeight={"bold"}
                    fontSize={"xs"}
                    onValueChange={(details) => setBudgetMonthlyGbp(details.value[0])}
                    value={[budgetMonthlyGbp]}
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
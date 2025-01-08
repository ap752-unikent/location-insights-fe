import { useFetchBestDistrict } from "../hooks/use-fetch-best-location";
import { Stack, useBreakpointValue, Tabs, Text } from "@chakra-ui/react"
import "@fontsource/inter";
import { useEffect, useMemo } from "react";
import { VOTE_IDS } from "../constants";
import { Results } from "../components/results/results";
import { useDebounce } from 'use-debounce';
import { TabType } from "../types";
import { usePageState } from "../contexts/page-state";
import { useLocation } from "react-router-dom";
import { VoteCategories } from "../components/vote-categories/vote-categories";
import { useVotesContext } from "../contexts/votes";
import { useVotesToScores } from "../hooks/use-votes-to-scores";
import { allVotesUsed } from "../utils/all-votes-used";

export const Main = () => {

    const { state: { budgetMonthly, activeTab, scrollPosition }, updateState } = usePageState();
    const [budgetMonthlyDebounced] = useDebounce(budgetMonthly, 1000);
    const { state: { votes } } = useVotesContext();
    const scores = useVotesToScores(votes);
    const weeklyPriceThreshold = useMemo(() => budgetMonthlyDebounced / 4, [budgetMonthlyDebounced]);
    const location = useLocation();
    const allVotesUsedMem = useMemo(() => allVotesUsed({ votes }), [votes]);

    useEffect(() => {
        window.scrollTo(0, scrollPosition);
    }, [location, scrollPosition]);

    const isSmallScreen = useBreakpointValue({ base: true, md: false });
    const { districts, districtsLoading } = useFetchBestDistrict({ 
        parksAndNatureImportance: scores.find(s => s.id === VOTE_IDS.parksAndNature)?.value ?? 0, 
        transportLinksImportance: scores.find(s => s.id === VOTE_IDS.transportLinks)?.value ?? 0, 
        convenienceStoresImportance: scores.find(s => s.id === VOTE_IDS.convenienceStores)?.value ?? 0, 
        crimeImportance: scores.find(s => s.id === VOTE_IDS.safety)?.value ?? 0, 
        nightlifeImportance: scores.find(s => s.id === VOTE_IDS.nightlife)?.value ?? 0, 
        weeklyPriceThreshold: weeklyPriceThreshold });

    const handleTabChange = (newTab: TabType) => {
        updateState({ activeTab: newTab });
    }

    const handleSetBudgetMonthly = (value: number) => {
        updateState({ budgetMonthly: value });
    }

    return (
        <Stack
            direction={"column"}
            width={isSmallScreen ? "80%" : "50%"}
            transform={isSmallScreen ? "translateX(10%)" : "translateX(50%)"}
            marginTop={8}
            marginBottom={24}
            fontFamily={"Inter"}
        >
            {
                activeTab === "questionnaire" && (
                    <>
                        <Text
                            fontSize={"md"}
                            fontWeight={"bold"}
                        >
                            Hello there 👋 &nbsp; Welcome to HouseHop!
                        </Text>
                        <Text
                            fontSize={"sm"}
                            marginBottom={4}
                        >

                            Assign votes to each category based on your priorities, and we'll deliver personalized, data-driven recommendations for the best districts in London that align with your lifestyle and housing preferences.                        </Text>
                    </>
                )
            }
            <Tabs.Root
                width={"100%"}
                variant={"enclosed"}
                defaultValue={"questionnaire"}
                onValueChange={(details) => handleTabChange(details.value as TabType)}
                value={activeTab}
                lazyMount={true}
            >
                <Tabs.List>
                    <Tabs.Trigger value="questionnaire">
                        Questionnaire
                    </Tabs.Trigger>
                    <Tabs.Trigger value="results" disabled={!allVotesUsedMem}>
                        Results
                    </Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="results">
                    <Results
                        districts={districts}
                        districtsLoading={districtsLoading}
                        budgetMonthly={budgetMonthly}
                        setBudgetMonthly={handleSetBudgetMonthly}
                        weeklyPriceThreshold={weeklyPriceThreshold}
                    />
                </Tabs.Content>
                <Tabs.Content value="questionnaire">
                    <VoteCategories />
                </Tabs.Content>
            </Tabs.Root>
        </Stack>
    )
}
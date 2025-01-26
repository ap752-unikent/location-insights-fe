import { useFetchBestDistrict } from "../hooks/use-fetch-best-location";
import { Stack, useBreakpointValue, Tabs, Text, VStack } from "@chakra-ui/react"
import "@fontsource/inter";
import { useEffect, useMemo } from "react";
import { TOTAL_VOTES, VOTE_IDS } from "../constants";
import { Results } from "../components/results/results";
import { useDebounce } from 'use-debounce';
import { TabType } from "../types";
import { usePageState } from "../contexts/page-state";
import { useLocation } from "react-router-dom";
import { VoteCategories } from "../components/vote-categories/vote-categories";
import { useVotesContext } from "../contexts/votes";
import { useVotesToScores } from "../hooks/use-votes-to-scores";
import { allVotesUsed } from "../utils/all-votes-used";
import { handleResultsTabClickOnDisabled } from "../utils/handle-results-click-on-disabled";

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

    const totalWidth = useBreakpointValue({ base: "100%", lg: "50%" });
    const transform = useBreakpointValue({ base: "translateX(0%)", lg: "translateX(50%)" });
    const marginTabsX = useBreakpointValue({ base: 4, lg: 0 });
    const questionnaireTabX = useBreakpointValue({ base: 4, lg: 0 });

    const { districts, districtsLoading } = useFetchBestDistrict({
        parksAndNatureImportance: scores.find(s => s.id === VOTE_IDS.parksAndNature)?.value ?? 0,
        transportLinksImportance: scores.find(s => s.id === VOTE_IDS.transportLinks)?.value ?? 0,
        convenienceStoresImportance: scores.find(s => s.id === VOTE_IDS.convenienceStores)?.value ?? 0,
        crimeImportance: scores.find(s => s.id === VOTE_IDS.safety)?.value ?? 0,
        nightlifeImportance: scores.find(s => s.id === VOTE_IDS.nightlife)?.value ?? 0,
        weeklyPriceThreshold: weeklyPriceThreshold
    });

    const handleSetBudgetMonthly = (value: number) => {
        updateState({ budgetMonthly: value });
    }

    const handleResultsTabClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        
        if (!allVotesUsedMem) {
            handleResultsTabClickOnDisabled({
                votes
            });
            return;
        }

        // @ts-ignore
        window.sa_event('results_tab_clicked');
        updateState({ activeTab: "results" });
    }

    const handleVoteTabClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        // @ts-ignore
        window.sa_event('vote_tab_clicked');
        updateState({ activeTab: "questionnaire" });
    }

    return (
        <Stack
            direction={"column"}
            width={totalWidth}
            transform={transform}
            marginTop={8}
            marginBottom={24}
            fontFamily={"Inter"}
        >
            {
                activeTab === "questionnaire" && (
                    <VStack
                        paddingX={marginTabsX}
                        alignItems={"flex-start"}
                    >
                        <Text
                            fontSize={"md"}
                            fontWeight={"bold"}
                        >
                            Hello there 👋 &nbsp; Lets find your perfect London neighborhood! 🏡
                        </Text>
                        <Text
                            fontSize={"sm"}
                            marginBottom={4}
                        >
                            Assign votes to each category based on your priorities, and we'll deliver personalized, data-driven recommendations for the best districts in London that align with your lifestyle and housing preferences.                        </Text>
                    </VStack>
                )
            }
            <Tabs.Root
                width={"100%"}
                variant={"enclosed"}
                defaultValue={"questionnaire"}
                value={activeTab}
                lazyMount={true}
            >
                <Tabs.List
                    marginX={marginTabsX}
                >
                    <Tabs.Trigger 
                        value="questionnaire"
                        onClick={handleVoteTabClick}
                    >
                        Vote
                    </Tabs.Trigger>
                    <Tabs.Trigger
                        value="results"
                        onClick={handleResultsTabClick}
                        style={{
                            cursor: allVotesUsedMem ? "pointer" : "not-allowed",
                        }}
                    >
                        Results
                    </Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="results">
                    <Results
                        districts={districts}
                        districtsLoading={districtsLoading}
                        budgetMonthlyGbp={budgetMonthly}
                        setBudgetMonthlyGbp={handleSetBudgetMonthly}
                        weeklyPriceThreshold={weeklyPriceThreshold}
                    />
                </Tabs.Content>
                <Tabs.Content value="questionnaire"
                    paddingX={questionnaireTabX}
                >
                    <VoteCategories />
                </Tabs.Content>
            </Tabs.Root>
        </Stack>
    )
}
import { Results } from "../components/results/results";
import "@fontsource/inter";
import { VoteCategories } from "../components/vote-categories/vote-categories";
import { VOTE_IDS } from "../constants";
import { LocaleText, useLocaleString } from "../contexts/internationalization";
import { usePageState } from "../contexts/page-state";
import { useVotesContext } from "../contexts/votes";
import { useFetchBestDistrict } from "../hooks/use-fetch-best-location";
import { useVotesRemainingToastText } from "../hooks/use-votes-remaining-toast-text";
import { useVotesToScores } from "../hooks/use-votes-to-scores";
import { allVotesUsed } from "../utils/all-votes-used";
import { handleResultsTabClickOnDisabled } from "../utils/handle-results-click-on-disabled";
import { Stack, Tabs, useBreakpointValue, VStack } from "@chakra-ui/react"
import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useDebounce } from "use-debounce";


export const Votes = () => {

    const { state: { budgetMonthly, activeTab, scrollPosition }, updateState } = usePageState();
    const [budgetMonthlyDebounced] = useDebounce(budgetMonthly, 1000);
    const { state: { votes } } = useVotesContext();
    const scores = useVotesToScores(votes);
    const weeklyPriceThreshold = useMemo(() => budgetMonthlyDebounced / 4, [budgetMonthlyDebounced]);
    const location = useLocation();
    const allVotesUsedMem = useMemo(() => allVotesUsed({ votes }), [votes]);
    const votesRemainingToastText = useVotesRemainingToastText(votes);
    const totalWidth = useBreakpointValue({ base: "100%", lg: "50%" });
    const transform = useBreakpointValue({ base: "translateX(0%)", lg: "translateX(50%)" });
    const questionnaireTabX = useBreakpointValue({ base: 4, lg: 0 });
    const marginTabsX = useBreakpointValue({ base: 4, lg: 0 });

    const tab1 = useLocaleString({ id: "tab1" });
    const tab2 = useLocaleString({ id: "tab2" });

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
                votesRemainingText: votesRemainingToastText
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

    useEffect(() => {
        window.scrollTo(0, scrollPosition);
    }, [location, scrollPosition]);

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
                        alignItems={"flex-start"}
                        paddingX={marginTabsX}
                    >
                        <LocaleText
                            id={"votesPageTitle"}
                            fontSize={"md"}
                            fontWeight={"bold"}
                        />
                        <LocaleText
                            id={"votesPageDescription"}
                            fontSize={"sm"}
                            marginBottom={4}
                        />
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
                        {tab1}
                    </Tabs.Trigger>
                    <Tabs.Trigger
                        value="results"
                        onClick={handleResultsTabClick}
                        style={{
                            cursor: allVotesUsedMem ? "pointer" : "not-allowed",
                        }}
                    >
                        {tab2}
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
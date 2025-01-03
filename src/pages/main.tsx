import { useFetchBestDistrict } from "../hooks/use-fetch-best-location";
import { Stack, useBreakpointValue, Tabs } from "@chakra-ui/react"
import "@fontsource/inter";
import { useEffect, useMemo, useState } from "react";
import { questions } from "../constants";
import { useQuestionsAnswersContext } from "../contexts/questions";
import { useQuestionAnswersScores } from "../hooks/use-question-answers-scores";
import { Results } from "../components/results/results";
import { Questionnaire } from "../components/questionnaire/questionnaire";
import { useDebounce } from 'use-debounce';
import { TabType } from "../types";
import { usePageState } from "../contexts/page-state";
import { useLocation } from "react-router-dom";

export const Main = () => {

    const [budgetMonthly, setBudgetMonthly] = useState(1000);
    const [budgetMonthlyDebounced] = useDebounce(budgetMonthly, 1000);
    const { state: { activeTab, scrollPosition}, updateState } = usePageState();
    const { state: { questionsAnswers } } = useQuestionsAnswersContext();
    const weeklyPriceThreshold = useMemo(() => budgetMonthlyDebounced / 4, [budgetMonthlyDebounced]);
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, scrollPosition);
    }, [location, scrollPosition]);

    const allQuestionsAnswered = useMemo(() => questionsAnswers.length === questions.length, [questionsAnswers]);
    const {
        parksAndNature,
        transportLinks,
        nightlife,
        convenienceStores,
        safety
    } = useQuestionAnswersScores({ questionAnswers: questionsAnswers });

    const isSmallScreen = useBreakpointValue({ base: true, md: false });
    const { districts, districtsLoading } = useFetchBestDistrict({ parksAndNatureImportance: parksAndNature, transportLinksImportance: transportLinks, convenienceStoresImportance: convenienceStores, crimeImportance: safety, nightlifeImportance: nightlife, weeklyPriceThreshold: weeklyPriceThreshold });

    const handleTabChange = (newTab: TabType) => {
        updateState({ activeTab: newTab });
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
                    <Tabs.Trigger value="results" disabled={!allQuestionsAnswered}>
                        Results
                    </Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="results">
                    <Results
                        districts={districts}
                        districtsLoading={districtsLoading}
                        budgetMonthly={budgetMonthly}
                        setBudgetMonthly={setBudgetMonthly}
                        weeklyPriceThreshold={weeklyPriceThreshold}
                    />
                </Tabs.Content>
                <Tabs.Content value="questionnaire">
                    <Questionnaire
                        questions={questions}
                        allQuestionsAnswered={allQuestionsAnswered}
                        updateState={updateState}
                    />
                </Tabs.Content>
            </Tabs.Root>
        </Stack>
    )
}
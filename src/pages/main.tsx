import { LocationResult } from "../components/location-result/location-result";
import { useFetchBestDistrict } from "../hooks/use-fetch-best-location";
import { Stack, Text, useBreakpointValue, Tabs, Button } from "@chakra-ui/react"
import {
    PaginationItems,
    PaginationNextTrigger,
    PaginationPrevTrigger,
    PaginationRoot,
} from "../components/ui/pagination";
import "@fontsource/inter";
import { useMemo, useState } from "react";
import { Question } from "../components/question/question";
import { questions } from "../constants";
import { useQuestionsAnswersContext } from "../contexts/questions";
import { useQuestionAnswersScores } from "../hooks/use-question-answers-scores";

const ITEMS_PER_PAGE = 5;
const weeklyPriceThreshold = 250;

export const Main = () => {

    const { state: { questionsAnswers }} = useQuestionsAnswersContext();

    const allQuestionsAnswered = useMemo(() => questionsAnswers.length === questions.length, [questionsAnswers]);
    const {
        parksAndNature,
        transportLinks,
        nightlife,
        convenienceStores,
        safety
    } = useQuestionAnswersScores({ questionAnswers: questionsAnswers });

    const [currentTab, setCurrentTab] = useState<"questionnaire" | "results">("questionnaire");
    const [page, setPage] = useState(1);
    const isSmallScreen = useBreakpointValue({ base: true, md: false });
    const { districts, districtsLoading } = useFetchBestDistrict({ parksAndNatureImportance: parksAndNature, transportLinksImportance: transportLinks, convenienceStoresImportance: convenienceStores, crimeImportance: safety, nightlifeImportance: nightlife, weeklyPriceThreshold: weeklyPriceThreshold });

    const displayStartIndex = useMemo(() => (page - 1) * ITEMS_PER_PAGE, [page]);
    const displayEndIndex = useMemo(() => page * ITEMS_PER_PAGE, [page]);

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
                onValueChange={(details) => setCurrentTab(details.value as any)}
                value={currentTab}
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
                    <Stack
                        direction={"column"}
                        width={"100%"}
                        gap={4}
                    >
                        {districtsLoading && <Text>Loading...</Text>}
                        {districts && districts.slice(displayStartIndex, displayEndIndex).map((district) => <LocationResult
                            key={district.district}
                            {...district}
                            yourBudget={weeklyPriceThreshold}
                        />)}
                        {/* <PaginationRoot
                            count={districts?.length || 0}
                            pageSize={ITEMS_PER_PAGE}
                            page={page}
                            onPageChange={(details) => setPage(details.page)}
                        >
                            <PaginationPrevTrigger />
                            <PaginationItems />
                            <PaginationNextTrigger />
                        </PaginationRoot> */}
                    </Stack>
                </Tabs.Content>
                <Tabs.Content value="questionnaire">
                    <Stack
                        direction={"column"}
                        width={"100%"}
                        gap={12}
                    >
                       {
                            questions.map((question) => <Question key={question.id} {...question} />)
                       }
                       <Button
                            onClick={() => setCurrentTab("results")}
                            disabled={!allQuestionsAnswered}
                            borderRadius={4}
                            backgroundColor="secondary"
                            width={150}
                       >
                            See your results {`>`}
                       </Button>
                    </Stack>
                </Tabs.Content>
            </Tabs.Root>
        </Stack>
    )
}
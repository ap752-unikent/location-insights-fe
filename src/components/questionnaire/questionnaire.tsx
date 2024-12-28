import { Question as QuestionType} from "../../constants";
import { Button, Stack } from "@chakra-ui/react"
import { Question } from "../question/question";
import { TabType } from "../../pages/main";

type Props = {
    questions: QuestionType[]
    setCurrentTab: (tab: TabType) => void
    allQuestionsAnswered: boolean
}

export const Questionnaire = ({
    questions,
    setCurrentTab,
    allQuestionsAnswered
} : Props) => {

    return (
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
    )
}
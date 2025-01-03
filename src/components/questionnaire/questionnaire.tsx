import { Question as QuestionType} from "../../constants";
import { Button, Stack } from "@chakra-ui/react"
import { Question } from "../question/question";
import { TabType } from "../../types";
import { MdArrowForward } from "react-icons/md"
import { PageState } from "../../contexts/page-state";

type Props = {
    questions: QuestionType[]
    allQuestionsAnswered: boolean
    updateState: (newState: Partial<PageState>) => void
}

export const Questionnaire = ({
    questions,
    allQuestionsAnswered,
    updateState
} : Props) => {

    const handleClick = () => {
        updateState({ pageNumber: 1, activeTab: 'results' });
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
    }

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
                bgColor={"secondary"}
                onClick={handleClick}
                disabled={!allQuestionsAnswered}
                borderRadius={4}
                width={150}
            >
                See your results <MdArrowForward />
            </Button>
        </Stack>
    )
}
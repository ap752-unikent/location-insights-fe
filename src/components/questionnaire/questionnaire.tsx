import { Question as QuestionType} from "../../constants";
import { Button, Stack } from "@chakra-ui/react"
import { Question } from "../question/question";
import { TabType } from "../../pages/main";
import { MdArrowForward } from "react-icons/md"

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

    const handleClick = () => {
        setCurrentTab("results");
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
import { Stack, Text} from "@chakra-ui/react"
import { QuestionButtons } from "../question-buttons/question-buttons"
import { Question as QuestionType} from "../../constants";
import { useQuestionsAnswersContext } from "../../contexts/questions";

type Props = QuestionType;

export const Question = ({
    id, 
    question,
    options
} : Props) => {

    const { state: { questionsAnswers }, actions: { setQuestionAnswer } } = useQuestionsAnswersContext();
    const questionAnswer = questionsAnswers.find((qa) => qa.id === id);

    return (
        <Stack
            direction={"column"}
            width={"100%"}
            gap={2}
        >
            <Text
                fontSize={"sm"}
                fontWeight={"bold"}
                color={"gray.500"}
            >
                {question}
            </Text>
            <QuestionButtons 
                options={options}
                onOptionSelect={(value) => setQuestionAnswer(id, value)}
                selectedOption={questionAnswer?.value}
            />
        </Stack>
    )
}
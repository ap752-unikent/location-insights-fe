import { QUESTION_IDS } from "../constants";
import { QuestionAnswer } from "../contexts/questions";
import { useMemo } from "react";

type Props = {
    questionAnswers: QuestionAnswer[];
}

export const useQuestionAnswersScores = ({
    questionAnswers
}: Props) => {

    const memoizedValue = useMemo(() => {

        const averagedTransportLinkScore = ((questionAnswers.find((qa) => qa.id === QUESTION_IDS.transportLinksDaytime)?.value ?? 1) * 0.75) + ((questionAnswers.find((qa) => qa.id === QUESTION_IDS.transportLinksNighttime)?.value ?? 1) * 0.25);

        return {
            [QUESTION_IDS.parksAndNature]: questionAnswers.find((qa) => qa.id === QUESTION_IDS.parksAndNature)?.value ?? 1,
            transportLinks: averagedTransportLinkScore,
            [QUESTION_IDS.nightlife]: questionAnswers.find((qa) => qa.id === QUESTION_IDS.nightlife)?.value ?? 1,
            [QUESTION_IDS.convenienceStores]: questionAnswers.find((qa) => qa.id === QUESTION_IDS.convenienceStores)?.value ?? 1,
            [QUESTION_IDS.safety]: questionAnswers.find((qa) => qa.id === QUESTION_IDS.safety)?.value ?? 1,
        }
    }, [questionAnswers]);

    return memoizedValue;
}
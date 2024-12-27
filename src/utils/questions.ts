import { questions } from "../constants";

export const getQuestionById = (id: string) => questions.find((question) => question.id === id);

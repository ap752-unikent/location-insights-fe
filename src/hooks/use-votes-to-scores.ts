import { TOTAL_VOTES, VoteCategory } from "../constants";

export const useVotesToScores = (categories: VoteCategory[]) => {
    return categories.map((category) => {
        return {
            id: category.id,
            value: ((category.votes ?? 0) / TOTAL_VOTES) * 10
        }
    });
}
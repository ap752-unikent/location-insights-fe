import { TOTAL_VOTES, VoteCategory } from "../constants";
import { useLocaleString } from "../contexts/internationalization";


export const useVotesRemainingToastText = (votes: VoteCategory[]) => {
    const usedVotes = votes.reduce((acc, category) => acc + (category.votes ?? 0), 0);
    const votesRemaining = TOTAL_VOTES - usedVotes;
    const votesRemainingToastText = useLocaleString({ 
        id: "votesRemainingToast",
        replacements: {
            votesRemaining: votesRemaining.toString()
        } 
    });

    return votesRemainingToastText;
}
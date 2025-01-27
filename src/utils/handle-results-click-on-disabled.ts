import { TOTAL_VOTES, VoteCategory } from "../constants";
import { toaster } from "../components/ui/toaster";

type Props = {
    votes: VoteCategory[];
}

export const handleResultsTabClickOnDisabled = ({
    votes
} : Props) => {

    const usedVotes = votes.reduce((acc, category) => acc + (category.votes ?? 0), 0);
    const votesRemaining = TOTAL_VOTES - usedVotes;

    toaster.create({
        title: `You still have ${votesRemaining} ${votesRemaining > 1 ? "votes" : "vote"} to assign before you can see results`,
        type: "warning"
    });
    // @ts-ignore
    window.sa_event('results_action_clicked_disabled');
}
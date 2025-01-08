import { TOTAL_VOTES, VoteCategory } from "../constants";

type Props = {
    votes: VoteCategory[];
}

export const allVotesUsed = ({
    votes,
}: Props) => {
    const usedVotes = votes.reduce((acc, category) => acc + (category.votes ?? 0), 0);
    if (usedVotes >= TOTAL_VOTES) {
        return true;
    }

    return false;
}
import { useCallback, useMemo } from "react";
import { TOTAL_VOTES, VoteCategory } from "../../constants";
import { useVotesContext } from "../../contexts/votes";
import { Button, Stack } from "@chakra-ui/react";
import { FaVoteYea, FaArrowRight } from "react-icons/fa";
import { Category } from "./category";
import { usePageState } from "../../contexts/page-state";
import { handleResultsTabClickOnDisabled } from "../../utils/handle-results-click-on-disabled";

export const VoteCategories = () => {

    const { updateState } = usePageState();
    const { state, updateCategory, clearVotes } = useVotesContext();

    const votesUsed = useMemo(() => {
        return state.votes.reduce((acc, category) => acc + (category.votes ?? 0), 0);
    }, [state.votes]);

    const handleAddVote = useCallback((category: VoteCategory) => {
        // @ts-ignore
        window.sa_event('vote_added_clicked', {
            category: category.name
        });
        updateCategory({ ...category, votes: (category.votes ?? 0) + 1 }, "increment");
    }, [updateCategory])

    const handleRemove = useCallback((category: VoteCategory) => {

        // @ts-ignore
        window.sa_event('vote_remove_clicked', {
            category: category.name
        });

        if (category.votes === undefined || category.votes === 0) {
            return;
        }

        updateCategory({ ...category, votes: category.votes - 1 }, "decrement");
    }, [updateCategory]);

    const remainingVotes = TOTAL_VOTES - votesUsed;

    const handleResultClick = () => {
        // @ts-ignore
        window.sa_event('see_results_button_clicked');
        updateState({ activeTab: "results" })
    }

    return (
        <>
            <Stack
                direction={"row"}
                marginBottom={2}
                alignItems={"center"}
                justifyContent={"space-between"}
            >
                <Stack
                    direction={"row"}
                    gap={2}
                >
                    {Array.from(Array(remainingVotes).keys()).map((index) => (
                        <FaVoteYea
                            key={index}
                            size={20}
                        />
                    ))}
                </Stack>
                <Button
                    variant={"plain"}
                    onClick={() => clearVotes()}
                >
                    Clear
                </Button>
            </Stack>
            {
                <Stack
                    direction={"column"}
                    gap={4}
                >
                    {
                        state.votes.map(category => (
                            <Category
                                key={category.id}
                                category={category}
                                onClick={() => handleAddVote(category)}
                                onRemove={() => handleRemove(category)}
                            />
                        ))
                    }
                </Stack>
            }
            <Button
                marginTop={8}
                variant={"solid"}
                disabled={votesUsed < TOTAL_VOTES}
                backgroundColor="secondary"
                onClick={handleResultClick}
            >
                See results
                <FaArrowRight
                    color="white"
                    style={{
                        height: 16,
                    }}
                />
            </Button>
        </>
    )
}
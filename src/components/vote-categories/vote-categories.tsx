import { useCallback, useMemo } from "react";
import { TOTAL_VOTES, VoteCategory } from "../../constants";
import { useVotesContext } from "../../contexts/votes";
import { Button, Stack, Text } from "@chakra-ui/react";
import { FaVoteYea, FaMinus } from "react-icons/fa";
import { Category } from "./category";

export const VoteCategories = () => {

    const { state, updateCategory, clearVotes } = useVotesContext();

    const votesUsed = useMemo(() => {
        return state.votes.reduce((acc, category) => acc + (category.votes ?? 0), 0);
    }, [state.votes]);

    const handleRemove = useCallback((category: VoteCategory) => {

        console.log(category);

        if (category.votes === undefined || category.votes === 0) {
            return;
        }

        console.log("Removing vote");

        updateCategory({ ...category, votes: category.votes - 1 }, "decrement");
    }, [updateCategory]);

    const remainingVotes = TOTAL_VOTES - votesUsed;

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
                                onClick={() => updateCategory({ ...category, votes: (category.votes ?? 0) + 1 }, "increment")}
                                onRemove={() => handleRemove(category)}
                            />
                        ))
                    }
                </Stack>
            }
        </>
    )
}
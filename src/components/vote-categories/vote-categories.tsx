import { useCallback, useMemo } from "react";
import { TOTAL_VOTES, VoteCategory } from "../../constants";
import { useVotesContext } from "../../contexts/votes";
import { Button, Stack, Text } from "@chakra-ui/react";
import { FaVoteYea, FaArrowRight } from "react-icons/fa";
import { Category } from "./category";
import { usePageState } from "../../contexts/page-state";
import { handleResultsTabClickOnDisabled } from "../../utils/handle-results-click-on-disabled";
import { toaster } from "../ui/toaster";
import { LocaleText, useLocaleString } from "../../contexts/internationalization";
import { useVotesRemainingToastText } from "../../hooks/use-votes-remaining-toast-text";

export const VoteCategories = () => {

    const { updateState } = usePageState();
    const { updateCategory, clearVotes, localeCategories } = useVotesContext();
    const votesRemainingToastText = useVotesRemainingToastText(localeCategories)
    const votesAllUsedText = useLocaleString({ id: "allVotesUsedToast" });

    const votesUsed = useMemo(() => {
        return localeCategories.reduce((acc, category) => acc + (category.votes ?? 0), 0);
    }, [localeCategories]);

    const remainingVotes = TOTAL_VOTES - votesUsed;

    const handleAddVote = useCallback((category: VoteCategory) => {
        // @ts-ignore
        window.sa_event('vote_added_clicked', {
            category: category.name
        });

        if (remainingVotes === 0) {
            toaster.create({
                title: votesAllUsedText,
                type: "warning"
            });
            return;
        }

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

    const handleResultClick = () => {
        if (remainingVotes > 0) {
            handleResultsTabClickOnDisabled({ votesRemainingText: votesRemainingToastText });
            return;
        }

        // @ts-ignore
        window.sa_event('see_results_button_clicked');
        updateState({ activeTab: "results" })
    }

    const remainingVotesPrefix = remainingVotes > 1 ? "votes" : "vote";
    const clearText = useLocaleString({ id: "clearVotes" });
    const seeResultsText = useLocaleString({ id: "seeResultsBtn" });

    return (
        <>
            <Stack
                direction={"column"}
                gap={0}
            >
                <Stack
                    direction={"row"}
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
                        {clearText}
                    </Button>
                </Stack>
                {
                    remainingVotes > 0 && (
                        <LocaleText 
                            id="votesRemaining"
                            fontSize={"xs"}
                            color={"gray.500"}
                            fontWeight={"bold"}
                            marginBottom={8}
                            replacements={{
                                remainingVotes: `${remainingVotes.toString()} `,
                                prefix: remainingVotesPrefix
                            }}
                        />
                        )
                }
            </Stack>
            {
                <Stack
                    direction={"column"}
                    gap={4}
                >
                    {
                        localeCategories.map(category => (
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
                opacity={votesUsed < TOTAL_VOTES ? 0.5 : 1}
                cursor={votesUsed < TOTAL_VOTES ? "not-allowed" : "pointer"}
                backgroundColor="secondary"
                onClick={handleResultClick}
            >
                {seeResultsText}
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
import { Button, Stack, Text} from "@chakra-ui/react";
import { VoteCategory } from "../../constants";
import { FaVoteYea } from "react-icons/fa";
import { FiMinus } from "react-icons/fi";

type Props = {
    category: VoteCategory;
    onClick: () => void;
    onRemove: () => void;
}

export const Category = ({
    category,
    onClick,
    onRemove
}: Props) => {

    const { name, icon, votes } = category;

    return (
        <Stack
            direction={"row"}
            justifyContent={"space-between"}
            style={{
                cursor: "pointer"
            }}
        >
            <Stack
                direction={"row"}
                gap={4}
                alignItems={"center"}
                onClick={onClick}
                paddingY={4}
                flex={1}
            >
                {icon}
                <Text
                    fontSize={"sm"}
                    color={"gray.500"}
                >
                    {name}
                </Text>
            </Stack>
            <Stack
                direction={"row"}
                gap={2}
                alignItems={"center"}
            >
                {(votes ?? 0) > 0 && Array.from(Array(votes).keys()).map((index) => (
                    <FaVoteYea
                        key={index}
                        size={20}
                    />
                ))}
                {
                    votes !== undefined && votes > 0 && (
                        <Button
                            variant={"plain"}
                            onClick={onRemove}
                        >
                            <FiMinus
                                color="red"
                            />
                        </Button>
                    )
                }
            </Stack>
        </Stack>
    )
}
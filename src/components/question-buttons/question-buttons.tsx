import { Button, Stack } from "@chakra-ui/react"


type Props = {
    options: {
        value: number,
        label: string
    }[],
    onOptionSelect: (value: number) => void,
    selectedOption?: number
}

export const QuestionButtons = (
    {
        options,
        onOptionSelect,
        selectedOption = -1
    } : Props
) => {

    return (
        <Stack
            borderRadius={8}
            direction={"row"}
            width={"100%"}
            gap={1}
        >
            {
                options.map((option) => (
                    <Button
                        variant={selectedOption === option.value ? "solid" : "outline"}
                        key={option.value}
                        onClick={() => onOptionSelect(option.value)}
                        backgroundColor={selectedOption === option.value ? "primary" : "transparent"}
                    >
                        {option.label}
                    </Button>
                ))
            }
        </Stack>
    )

}
import { Stack, Text, useToken } from '@chakra-ui/react';
import { ProgressBar } from '../progress/progress-bar';

type ScoreProps = {
    score: number;
    label: string;
}

type Props = { scores: ScoreProps[]; width: number | string }

export const IndividualScores = ({ scores, width}: Props) => {

    return (
        <Stack
            direction={"column"}
            gap={2}
            marginTop={2}
            width={"50%"}
        >
            {scores.map((score, index) => (
                <IndividualScore key={index} {...score} />
            ))}
        </Stack>
    )
}
const IndividualScore = ({ score, label }: ScoreProps) => {

    const [secondary] = useToken("colors", ["secondary"]);

    return (
        <Stack
            direction={"row"}
            gap={2}
            alignItems={"center"}
        >
            <Text
                fontSize={"xs"}
                fontWeight={"bold"}
                color={"gray.500"}
                width={200}
            >
                {label}
            </Text>
            <ProgressBar 
                value={score} 
                color={secondary} 
                height={6}
            />
        </Stack>
    )
}
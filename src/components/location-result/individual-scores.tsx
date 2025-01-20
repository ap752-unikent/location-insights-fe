import { Stack, Text, useBreakpointValue, useToken } from '@chakra-ui/react';
import { ProgressBar } from '../progress/progress-bar';
import React from 'react';

type ScoreProps = {
    score: number;
    label: string;
    icon: React.ReactNode;
}

type Props = { scores: ScoreProps[] }

export const IndividualScores = ({ scores }: Props) => {

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
const IndividualScore = ({ score, label, icon}: ScoreProps) => {

    const isSmallScreen = useBreakpointValue({ base: true, md: false });
    const [secondary] = useToken("colors", ["secondary"]);

    return (
        <Stack
            direction={"row"}
            gap={2}
            alignItems={"center"}
        >
            {
                isSmallScreen ? (
                    <>
                        {icon}
                    </>
                ) : (
                    <Text
                        fontSize={"xs"}
                        fontWeight={"bold"}
                        color={"gray.500"}
                        width={200}
                    >
                        {label}
                    </Text>
                )
            }
            <ProgressBar
                value={score}
                color={secondary}
                height={6}
            />
        </Stack>
    )
}
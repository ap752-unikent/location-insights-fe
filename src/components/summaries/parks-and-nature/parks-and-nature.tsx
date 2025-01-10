import { Stack, Text } from "@chakra-ui/react";
import { FaTree } from "react-icons/fa";
import { Coverage } from '../../coverage/coverage';
import { SummarySkeleton } from "../summary-skeleton";
import { DistrictInsight } from "../../../types";
import { MdNaturePeople } from "react-icons/md";

type Props = {
    districtData: DistrictInsight;
}

export const ParksAndNature = ({
    districtData
}: Props) => {

    const averageGreenProportion = districtData.weighted.imageAnalysis.greenProportion;
    const averageBlueProportion = districtData.weighted.imageAnalysis.blueProportion;

    const parks = districtData.parks ?? [];

    return (
        <SummarySkeleton
            title={"Parks and Nature"}
            icon={<FaTree />}
        >
            {
                parks.map(park => (
                    <ParkElement
                        key={park.name}
                        parkName={park.displayName.text}
                    />
                ))
            }
            <Text
                fontSize={"sm"}
                color={"gray.500"}
            >
                Like having nature on your doorstep? Here's what you can expect in terms of green and blue spaces in the neighbourhood.
            </Text>
            <Stack
                direction={"column"}
            >
                <CoverageInfo
                    color={"#2E6F40"}
                    score={Number(averageGreenProportion.toFixed(0))}
                    text={"Green spaces such as parks, gardens and nature reserves."}
                />
                <CoverageInfo
                    color={"#0047AB"}
                    score={Number(averageBlueProportion.toFixed(0))}
                    text={"Blue spaces such as rivers, lakes and ponds."}
                />
            </Stack>
        </SummarySkeleton>

    )
}

const ParkElement = ({ parkName }: { parkName: string }) => {
    return (
        <Text
            fontSize={"xs"}
            color={"gray.500"}
            fontWeight={"bold"}
            style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row"
            }}
        >
            <MdNaturePeople
                color={"gray.500"}
                size={24}
                style={{
                    marginRight: "12px"
                }}
            />
            {parkName}
        </Text>
    )
}

const CoverageInfo = ({ color, score, text }: { color: string, score: number, text: string }) => {
    return (
        <Stack
            direction={"row"}
        >
            <Coverage
                color={color}
                score={score}
            />
            <Text
                fontSize={"sm"}
                fontWeight={"bold"}
                color={"gray.500"}
            >
                {text}
            </Text>
        </Stack>
    )
}
import { Stack, Text } from "@chakra-ui/react";
import { IoIosCloudyNight } from "react-icons/io";
import { SummarySkeleton } from "../summary-skeleton";
import { FaTrain } from "react-icons/fa6";
import { LocationData } from "../../../types";
import OvergroundRoundel from "../../../assets/overground-roundel";
import TubeRoundel from "../../../assets/tube-roundel";
import NationalRail from "../../../assets/national-rail";
import { useMemo } from "react";
import { IoIosPartlySunny } from "react-icons/io";

type Props = {
    district: string;
    stations: LocationData["nearestStationsWithWalkingMinutes"];
    commuteTimeToCentralLondon: number
    transitTimeFromCentralLondonNight: number;
}

const MAX_STATION_WALKING_MINUTES = 20;
const MAX_STATION_COUNT = 8;

export const TransportLinks = ({
    district,
    stations,
    commuteTimeToCentralLondon,
    transitTimeFromCentralLondonNight
}: Props) => {

    const filteredStations = stations.filter((station) => station.nearestStationWalkingMinutes.walkingMinutes < MAX_STATION_WALKING_MINUTES);

    const uniqueStationTotalCount = filteredStations.length;
    const uniqueStationsTruncated = filteredStations.slice(0, MAX_STATION_COUNT);
    const averageCommuteTimeToCentralLondon = commuteTimeToCentralLondon;
    const averageTransitTimeFromCentralLondonNight = transitTimeFromCentralLondonNight;

    return (
        <SummarySkeleton
            title={"Transport Links"}
            icon={<FaTrain />}
        >
            <Stack
                direction={"column"}
                paddingRight={8}
                gap={4}
            >
                <Stack>
                    {
                        uniqueStationsTruncated.slice(0, MAX_STATION_COUNT).map((station) => (
                            <StationLabel
                                station={station}
                            />
                        ))
                    }
                    {
                        uniqueStationTotalCount > MAX_STATION_COUNT && (
                            <Text
                                fontSize={"xs"}
                                color={"gray.500"}
                                fontWeight={"bold"}
                            >
                                +{uniqueStationTotalCount - MAX_STATION_COUNT} more
                            </Text>
                        )
                    }
                </Stack>
                <Stack>
                    {
                        <Text
                            fontSize={"sm"}
                            color={"gray.500"}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "row",
                            }}
                        >
                            <IoIosPartlySunny
                                color={"gray.500"}
                                size={40}
                                style={{
                                    marginRight: "12px"
                                }}
                            />
                            Planning to commute often? The average travel time from {district} to Central London, via public transport, is {averageCommuteTimeToCentralLondon.toFixed(0)} minutes during peak hours.
                        </Text>
                    }
                    {
                        <Text
                            fontSize={"sm"}
                            color={"gray.500"}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "row",
                            }}
                        >
                            <IoIosCloudyNight
                                color={"gray.500"}
                                size={32}
                                style={{
                                    marginRight: "12px"
                                }}
                            />
                            Enjoy going out out? Average travel time from Central London, via public transport, at night is {averageTransitTimeFromCentralLondonNight.toFixed(0)} minutes.
                        </Text>
                    }
                </Stack>
            </Stack>
        </SummarySkeleton>
    )
}

const StationLabel = ({ station }: { station: LocationData["nearestStationsWithWalkingMinutes"][0] }) => {

    const icon = useMemo(() => {
        if (station.nearestStation.displayName.toLowerCase().includes("tube station")) {
            return <TubeRoundel />
        } else if (station.nearestStation.displayName.toLowerCase().includes("train station")) {
            return <NationalRail />
        } else {
            return <OvergroundRoundel />
        }
    }, [station.nearestStation.displayName])

    return (
        <Text
            style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "flex-start",
            }}
            key={station.nearestStation.placeId}
            fontSize={"sm"}
            color={"gray.500"}
        >
            {icon}
            &nbsp;
            &nbsp;
            &nbsp;
            {station.nearestStation.displayName}
        </Text>
    )
}
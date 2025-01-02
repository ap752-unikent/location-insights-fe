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
    commuteTimeToCentralLondon: LocationData["commuteTimeToCentralLondon"][];
    transitTimeFromCentralLondonNight: LocationData["transitTimeFromCentralLondonNight"][];
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
    // @ts-expect-error
    const uniqueStations = [...filteredStations.reduce((map, obj) => map.set(obj.nearestStation.displayName, obj), new Map()).values()];
    const uniqueStationTotalCount = uniqueStations.length;
    const uniqueStationsTruncated = uniqueStations.slice(0, MAX_STATION_COUNT);
    const averageCommuteTimeToCentralLondon = useMemo(() => {
        const total = commuteTimeToCentralLondon.reduce((acc, val) => acc + val.railMinutes, 0);
        return total / commuteTimeToCentralLondon.length;
    }, [commuteTimeToCentralLondon]);

    const averageTransitTimeFromCentralLondonNight = useMemo(() => {
        const total = transitTimeFromCentralLondonNight.reduce((acc, val) => acc + val.railMinutes, 0);
        return total / transitTimeFromCentralLondonNight.length
    }, [transitTimeFromCentralLondonNight]);

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
                                size={32}
                                style={{
                                    marginRight: "12px"
                                }}
                            />
                            Planning to commute often? The average travel time from {district} is {averageCommuteTimeToCentralLondon.toFixed(0)} minutes during peak hours.
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
                            Enjoy going out out? Average travel time from Central London at night is {averageTransitTimeFromCentralLondonNight.toFixed(0)} minutes.
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
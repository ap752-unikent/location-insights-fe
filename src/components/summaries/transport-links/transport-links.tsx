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
import { LocaleText, useLocaleString } from "../../../contexts/internationalization";

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

    const transportLinksLabel = useLocaleString({ id: "transportLinksLabel" });

    return (
        <SummarySkeleton
            title={transportLinksLabel}
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
                            <LocaleText 
                                id="extraStationCount"
                                fontSize={"xs"}
                                color={"gray.500"}
                                fontWeight={"bold"}
                                replacements={{
                                    extraStationCount: (uniqueStationTotalCount - MAX_STATION_COUNT).toString()
                                }}
                            />
                        )
                    }
                </Stack>
                <Stack
                    direction={"column"}
                    gap={4}
                >
                    {
                        <Stack
                            direction={"row"}
                            gap={4}
                            alignItems={"center"}
                            color={"gray.500"}
                        >
                            <IoIosPartlySunny
                                size={24}
                                style={{
                                    flexGrow: 1
                                }}
                            />
                            <LocaleText
                                id="commuteTimeText"
                                fontSize={"sm"}
                                color={"gray.500"}
                                width={"100%"}
                                replacements={{
                                    district: `${district} `,
                                    averageCommuteTime: `${averageCommuteTimeToCentralLondon.toFixed(0)} `
                                }}
                            />
                        </Stack>
                    }
                    {
                        <Stack
                            direction={"row"}
                            gap={4}
                            alignItems={"center"}
                            color={"gray.500"}
                        >
                            <IoIosCloudyNight
                                size={24}
                                style={{
                                    flexGrow: 1
                                }}
                            />
                            <LocaleText 
                                id="commuteTimeNightText"
                                fontSize={"sm"}
                                color={"gray.500"}
                                width={"100%"}
                                replacements={{
                                    averageTravelTime: `${averageTransitTimeFromCentralLondonNight.toFixed(0)} `
                                }}
                            />
                        </Stack>
                    }
                    <LocaleText 
                        id="centralLondonCitation"
                        fontSize={"x-small"}
                        color={"gray.500"}
                        fontWeight={"bold"}
                    />
                </Stack>
            </Stack>
        </SummarySkeleton >
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
import L, { LatLng } from "leaflet"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import icon from '../../assets/record.png';
import { Stack, Text } from "@chakra-ui/react";
import { PostcodeInsight } from "../../types";

let DefaultIcon = L.icon({
    iconUrl: icon,
    iconSize: [16, 16],
});

L.Marker.prototype.options.icon = DefaultIcon;

type Props = {
    center: LatLng,
    district: PostcodeInsight
}

export const AnalysisMap = ({
    center,
    district
}: Props) => {
    const markers = [
        {
            label: "Center",
            ...district.center,
        },
        {
            label: "East",
            ...district.east,
        },
        {
            label: "West",
            ...district.west,
        },
        {
            label: "North",
            ...district.north,
        },
        {
            label: "South",
            ...district.south,
        }
    ]

    return (
        <Stack
            gap={0}
            alignSelf={"flex-start"}
        >
            <Text
                fontSize={"xs"}
                fontWeight={"extrabold"}
                color={"gray.500"}
            >
                Points analysed
            </Text>
            <MapContainer
                center={center}
                zoom={12}
                zoomControl={false}
                scrollWheelZoom={true}
                style={{
                    height: "250px",
                    width: "250px",
                    borderRadius: "8px"
                }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    markers.map(marker =>
                    (
                        <Marker position={new LatLng(marker.latitude, marker.longitude)}>
                            <Popup>
                                <Text>
                                    {marker.label} <br />
                                    £{(marker.averageWeeklyPricePerRoom * 4)} pcm
                                </Text>
                            </Popup>
                        </Marker>
                    )
                    )
                }
            </MapContainer>
        </Stack>
    )
}
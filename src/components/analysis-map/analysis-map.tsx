import L, { LatLng } from "leaflet"
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import icon from '../../assets/record.png';
import { Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import { DistrictInsight } from "../../types";
import { useEffect, useLayoutEffect, useState } from "react";

let DefaultIcon = L.icon({
    iconUrl: icon,
    iconSize: [16, 16],
});

L.Marker.prototype.options.icon = DefaultIcon;

type Props = {
    center: LatLng,
    district: DistrictInsight
}

type CustomMarker = {
    label: string;
    latitude: number;
    longitude: number;
    weeklyPricePerRoom: number;
}

export const AnalysisMap = ({
    center,
    district
}: Props) => {

    const mapSize = useBreakpointValue({ base: window.innerWidth - 32, lg: 300 });
    const [hasPageLoaded, setHasPageLoaded] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setHasPageLoaded(true), 1000);
        return () => clearTimeout(timeout);
    }, [])

    const markers: CustomMarker[] = [
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
            {
                hasPageLoaded && (
                    <MapContainer
                        center={center}
                        zoom={12}
                        zoomControl={false}
                        scrollWheelZoom={true}
                        style={{
                            height: mapSize,
                            width: mapSize,
                            borderRadius: 8
                        }}
                    >
                        <MapChildren
                            markers={markers}
                        />
                    </MapContainer>
                )
            }
        </Stack>
    )
}

type MapChildrenProps = {
    markers: CustomMarker[];
}

const MapChildren = ({
    markers
}: MapChildrenProps) => {

    return (
        <>
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
                                £{(marker.weeklyPricePerRoom * 4)} pcm
                            </Text>
                        </Popup>
                    </Marker>
                )
                )
            }
        </>
    )
}
import L, { LatLng } from "leaflet"
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import icon from '../../assets/record.png';
import { Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import { DistrictInsight } from "../../types";
import { useEffect, useState } from "react";
import { LocaleText, useLocaleString } from "../../contexts/internationalization";

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

    const centerLabel = useLocaleString({ id: "centerMarker" });
    const eastLabel = useLocaleString({ id: "eastMarker" });
    const westLabel = useLocaleString({ id: "westMarker" });
    const northLabel = useLocaleString({ id: "northMarker" });
    const southLabel = useLocaleString({ id: "southMarker" });

    useEffect(() => {
        const timeout = setTimeout(() => setHasPageLoaded(true), 1000);
        return () => clearTimeout(timeout);
    }, [])

    const markers: CustomMarker[] = [
        {
            label: centerLabel,
            ...district.center,
        },
        {
            label: eastLabel,
            ...district.east,
        },
        {
            label: westLabel,
            ...district.west,
        },
        {
            label: northLabel,
            ...district.north,
        },
        {
            label: southLabel,
            ...district.south,
        }
    ]

    return (
        <Stack
            gap={0}
            alignSelf={"flex-start"}
        >
            <LocaleText
                id={"pointsAnalysed"}
                fontSize={"xs"}
                fontWeight={"extrabold"}
                color={"gray.500"}
            />
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
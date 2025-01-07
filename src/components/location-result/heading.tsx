import hexToRgba from "hex-to-rgba";
import { Text, Image, Box, Stack, useToken } from "@chakra-ui/react"
import districtToImageSasUrlsRaw from "../../assets/district-to-image-sas-urls.json";

type DistrictToImageSasUrls = { [district: string]: string };
const districtToImageSasUrls = districtToImageSasUrlsRaw as DistrictToImageSasUrls;

type Props = {
    district: string;
}

const HEIGHT = 150;

export const Heading = ({ district }: Props) => {

    const imageUrl = districtToImageSasUrls[district] ?? districtToImageSasUrls["default"];
    const [primary] = useToken("colors", ["primary"]);
    const rgba0 = hexToRgba(primary, 0);
    const rgba1 = hexToRgba(primary, 1);

    return (
        <Stack
            height={HEIGHT}
            position={"relative"}
        >
            <Box
                w='100%'
                h={HEIGHT}
                style={{ position: 'absolute', zIndex: 1 }}
                bgGradient={`linear-gradient(${rgba0},${rgba1})`}
            />
            <Image
                height={HEIGHT}
                borderRadius={"8px 8px 0 0"}
                alt="response"
                src={imageUrl}
                objectFit={"cover"}
            />
            <Text
                fontSize={"xl"}
                fontWeight={"bold"}
                position={"absolute"}
                zIndex={2}
                color={"whiteAlpha.700"}
                bottom={4}
                left={4}
            >
                {district}
            </Text>
        </Stack>
    )
}
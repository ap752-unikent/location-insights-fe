import hexToRgba from "hex-to-rgba";
import { Text, Image, Box, Stack, useToken, useBreakpointValue } from "@chakra-ui/react"
import districtToImageSasUrlsRaw from "../../assets/district-to-image-sas-urls.json";
import { useNavigate } from "react-router-dom";

type DistrictToImageSasUrls = { [district: string]: string };
const districtToImageSasUrls = districtToImageSasUrlsRaw as DistrictToImageSasUrls;

type Props = {
    districtCode: string;
    districtName: string;
    handleHeaderClick?: () => void;
    customBorderRadius?: string;
}

const HEIGHT = 150;

export const Heading = ({ districtCode, districtName, handleHeaderClick, customBorderRadius}: Props) => {

    const borderRadius = useBreakpointValue({ base: 0, lg: "8px 8px 0 0" });
    const imageUrl = districtToImageSasUrls[districtCode] ?? districtToImageSasUrls["default"];
    const [primary] = useToken("colors", ["primary"]);
    const rgba0 = hexToRgba(primary, 0);
    const rgba1 = hexToRgba(primary, 1);

    return (
        <Stack
            height={HEIGHT}
            position={"relative"}
            cursor={handleHeaderClick ? "pointer" : "default"}
            onClick={handleHeaderClick}
        >
            <Box
                w='100%'
                h={HEIGHT}
                style={{ position: 'absolute', zIndex: 1 }}
                bgGradient={`linear-gradient(${rgba0},${rgba1})`}
            />
            <Image
                height={HEIGHT}
                borderRadius={customBorderRadius ?? borderRadius}
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
                {districtCode} {districtName}
            </Text>
        </Stack>
    )
}
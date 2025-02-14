import { useLocaleString } from "../../contexts/internationalization";
import { Button, Stack, Text} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ConsentBanner = () => {
    const [showBanner, setShowBanner] = useState(false);
    const cookieConsentText = useLocaleString({
        id: "cookieConsentText",
    });
    const cookiesLearnMore = useLocaleString({
        id: "cookiesLearnMore",
    });
    const iAcceptText = useLocaleString({
        id: "iAccept",
    })

    useEffect(() => {
        const consentGiven = localStorage.getItem("consentGiven");
        if (consentGiven === null) {
            setShowBanner(true);
        }
    }, []);

    const handleConsent = (consentGiven: boolean) => {
        if (consentGiven) {
            // @ts-ignore
            window.gtag('consent', 'update', {
                'ad_user_data': 'granted',
                'ad_personalization': 'granted',
                'ad_storage': 'granted',
                'analytics_storage': 'granted'
            });

            localStorage.setItem("consentGiven", "true");
        }

        setShowBanner(false);
    };

    if (!showBanner) return null;

    return (
        <Stack
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            position={"fixed"}
            bottom={0}
            left={0}
            right={0}
            padding={4}
            width={"100%"}
            backgroundColor={"primary"}
            color={"white"}
            justifyContent={"center"}
            zIndex={1000}
        >
            <Text
                fontSize={"sm"}
            >
                {cookieConsentText} <a href={"/privacy-policy"} target="_blank" rel="noopener noreferrer" style={{ color: "white", textDecoration: "underline" }}>{cookiesLearnMore}</a>
            </Text>
            <Button
                colorPalette={"gray"}
                color={"white"}
                onClick={() => handleConsent(true)}
                h={8}
            >
                {iAcceptText}
            </Button>
        </Stack>
    )
};

export default ConsentBanner;

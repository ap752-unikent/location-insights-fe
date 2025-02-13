import { Button, Stack, Text} from "@chakra-ui/react";
import { useState, useEffect } from "react";

const ConsentBanner = () => {
    const [showBanner, setShowBanner] = useState(false);

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
            backgroundColor={"gray.800"}
            color={"white"}
            justifyContent={"center"}
            zIndex={1000}
        >
            <Text
                fontSize={"sm"}
                marginRight={4}
            >
                We use cookies for analytics to improve your experience on our site. 
            </Text>
            <Button
                onClick={() => handleConsent(true)}
            >
                Ok
            </Button>
            <Button
                onClick={() => handleConsent(false)}
                marginRight={4}
                background={"gray.800"}
                borderColor={"gray.900"}

            >
                Deny
            </Button>
        </Stack>
    )
};

export default ConsentBanner;

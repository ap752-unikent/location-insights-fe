import React from 'react';
import { Image, useBreakpointValue } from '@chakra-ui/react';
import logoSidewaysBeta from '../../assets/logo-sideways-beta.png';
import { useNavigate } from 'react-router-dom';

export const Header = () => {

    const margin = useBreakpointValue({ base: 8, md: 4 });
    const height = useBreakpointValue({ base: 12, md: 16 });
    const navigate = useNavigate();

    return (
        <Image 
            marginTop={margin}
            marginLeft={margin}
            src={logoSidewaysBeta}
            height={height}
            cursor={"pointer"}
            onClick={() => navigate("/")}
        />
    )
}
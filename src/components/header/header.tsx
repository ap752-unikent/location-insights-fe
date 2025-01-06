import React from 'react';
import { Image, useBreakpointValue } from '@chakra-ui/react';
import logoSidewaysBeta from '../../assets/logo-sideways-beta.png';

export const Header = () => {

    const isSmallScreen = useBreakpointValue({ base: true, md: false });

    return (
        <Image 
            marginTop={isSmallScreen ? 8 : 4}
            marginLeft={isSmallScreen ? 8 : 4}
            src={logoSidewaysBeta}
            height={75}
        />
    )
}
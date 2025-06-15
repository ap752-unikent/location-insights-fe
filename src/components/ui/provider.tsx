"use client"

import { ChakraProvider} from "@chakra-ui/react"
import { system as customSystem } from "../theme"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode"
import "@fontsource/inter";

export function Provider(props: ColorModeProviderProps) {

  return (
    <ChakraProvider
      value={customSystem}
    >
      <ColorModeProvider {...props} forcedTheme="light" />
    </ChakraProvider>
  )
}

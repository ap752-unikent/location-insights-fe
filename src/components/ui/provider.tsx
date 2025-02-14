"use client"

import { ChakraProvider, createSystem, defineConfig, defaultConfig } from "@chakra-ui/react"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode"
import "@fontsource/inter";

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        primary: {
          value: "#2B2D42",
          400: { value: "rgba(43, 45, 66, 0.4)"},
        },
        secondary: {
          value: "#AA1155",
        },
        background: {
          value: "white",
        },
        red: {
          DEFAULT: { value: "#EE0F0F" },
          100: { value: "#EE0F0F" },
        },
      },
    },
  },
})

const customSystem = createSystem(defaultConfig, customConfig)

export function Provider(props: ColorModeProviderProps) {

  const config = {
    initialColorMode: 'light',
    useSystemColorMode: false,
  }

  return (
    <ChakraProvider
      value={customSystem}
    >
      <ColorModeProvider {...props} forcedTheme="light"/>
    </ChakraProvider>
  )
}

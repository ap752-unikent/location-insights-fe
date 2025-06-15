import { createSystem, defineConfig, defaultConfig } from "@chakra-ui/react"

const customConfig = defineConfig({
    theme: {
      tokens: {
        colors: {
          primary: {
            50: { value: "#EBEBF2" },
            100: { value: "#DEDFEA" },
            200: { value: "#C5C7DA" },
            300: { value: "#ADAFC9" },
            400: { value: "#9497B9" },
            500: { value: "#7B7FA9" },
            600: { value: "#636898" },
            700: { value: "#535780" },
            800: { value: "#434667" },
            900: { value: "#33354E" },
            950: { value: "#2B2D42" },
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
      semanticTokens: {
        colors: {
          primary: {
            solid: { value: "{colors.primary.950}" },
            contrast: { value: "{colors.primary.100}" },
            fg: { value: "{colors.primary.950}" },
            muted: { value: "{colors.primary.300}" },
            subtle: { value: "{colors.primary.300}" },
            emphasized: { value: "{colors.primary.950}" },
            focusRing: { value: "{colors.primary.950}" },
          }
        }
      }
    },
  })
  
export const system = createSystem(defaultConfig, customConfig)
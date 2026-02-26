import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
    initialColorMode: "system",
    useSystemColorMode: true,
};

// Or export `extendBaseTheme` if you only want the default Chakra theme tokens to extend (no default component themes)
export const customTheme = extendTheme({ config })
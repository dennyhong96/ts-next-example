import { extendTheme } from "@chakra-ui/react";

// NB: Chakra gives you access to `colorMode` and `theme` in `props`
const theme = extendTheme({
  styles: {
    global: (props: any) => ({
      "#__next": {
        height: "100vh",
      },
    }),
  },
});

export default theme;

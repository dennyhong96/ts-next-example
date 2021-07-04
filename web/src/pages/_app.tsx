import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import PageWithLayoutType from "src/types/pageWithLayout";

import { AuthProvider } from "@contexts/auth";
import theme from "@styles/theme";
// import { addData } from "addData";

type AppLayoutProps = {
  Component: PageWithLayoutType;
  pageProps: any;
};

// addData();

function MyApp({ Component, pageProps }: AppLayoutProps) {
  const queryClient = new QueryClient();

  // https://www.tomasgildev.com/posts/next-persistent-layout-typescript
  const Layout = Component.Layout ?? (({ children }) => children);

  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>

          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}
export default MyApp;

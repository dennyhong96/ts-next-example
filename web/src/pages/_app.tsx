import "@utils/wdyr";
import { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from "react-redux";

import PageWithLayoutType from "src/types/pageWithLayout";

import { AuthProvider } from "@contexts/auth";
import theme from "@styles/theme";
import { ErrorBoundary } from "@components/errorBoundary";
import FullPageErrorFallback from "@components/fullPageErrorFallback";
import ProjectModal from "@components/screens/projects/components/projectModal";
import { store } from "@store/index";

// import { addData } from "addData";
// addData();

type AppLayoutProps = {
  Component: PageWithLayoutType;
  pageProps: any;
};

function MyApp({ Component, pageProps }: AppLayoutProps) {
  const queryClient = new QueryClient();

  // https://www.tomasgildev.com/posts/next-persistent-layout-typescript
  const Layout = Component.Layout ?? (({ children }) => children);
  const SubLayout = Component.SubLayout ?? (({ children }) => children);

  return (
    <ChakraProvider theme={theme}>
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        <AuthProvider>
          <Provider store={store}>
            <QueryClientProvider client={queryClient}>
              <Layout>
                <SubLayout>
                  <Component {...pageProps} />
                  <ProjectModal />
                </SubLayout>
              </Layout>
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </Provider>
        </AuthProvider>
      </ErrorBoundary>
    </ChakraProvider>
  );
}

export default MyApp;

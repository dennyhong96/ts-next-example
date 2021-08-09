// import "@utils/wdyr";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import PageWithLayoutType from "src/types/pageWithLayout";

import { AuthProvider } from "@contexts/auth";
import theme from "@styles/theme";
import { ErrorBoundary } from "@components/errorBoundary";
import FullPageErrorFallback from "@components/fullPageErrorFallback";
import ProjectModal from "@components/screens/projects/components/projectModal";
import TaskModal from "@components/taskModal";
import Profiler from "@components/profiler";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

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

  // TODO: Explore using patching history.pushState to implement useURLQueryParams
  // if (typeof window !== "undefined") {
  //   const pushState = window.history.pushState;
  //   window.history.pushState = function (state) {
  //     window.dispatchEvent(new Event("pushstate"));
  //     return pushState.apply(history, arguments);
  //   };
  // }

  return (
    <Profiler id="_app.tsx" targetPhases={["mount"]}>
      <ChakraProvider theme={theme}>
        <ErrorBoundary fallbackRender={FullPageErrorFallback}>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <Layout>
                <SubLayout>
                  <Box as="main" id="main" width="100%" height="100%">
                    <Component {...pageProps} />
                  </Box>
                  <ProjectModal />
                  <TaskModal />
                </SubLayout>
              </Layout>
              <ReactQueryDevtools initialIsOpen={false} />
            </AuthProvider>
          </QueryClientProvider>
        </ErrorBoundary>
      </ChakraProvider>
    </Profiler>
  );
}

export default MyApp;

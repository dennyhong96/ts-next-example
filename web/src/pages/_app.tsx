import "@utils/wdyr";
import { useState, ReactNode } from "react";
import { Button, ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import PageWithLayoutType from "src/types/pageWithLayout";

import { AuthProvider } from "@contexts/auth";
import theme from "@styles/theme";
import { ErrorBoundary } from "@components/errorBoundary";
import FullPageErrorFallback from "@components/fullPageErrorFallback";
import ProjectModal from "@components/screens/projects/components/projectModal";

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

  const [projectModalOpen, setProjectModalOpen] = useState(false);

  const projectButton: ReactNode = (
    <Button colorScheme="teal" size="sm" marginTop={4} onClick={() => setProjectModalOpen(true)}>
      Create Project
    </Button>
  );

  return (
    <ChakraProvider theme={theme}>
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <Layout projectButton={projectButton}>
              <SubLayout>
                <Component projectButton={projectButton} {...pageProps} />
                <ProjectModal
                  projectModalOpen={projectModalOpen}
                  onClose={() => setProjectModalOpen(false)}
                />
              </SubLayout>
            </Layout>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </AuthProvider>
      </ErrorBoundary>
    </ChakraProvider>
  );
}
export default MyApp;

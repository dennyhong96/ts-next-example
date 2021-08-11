import { FC } from "react";
import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Box, ChakraProvider } from "@chakra-ui/react";

import { AuthProvider } from "@contexts/auth";
import { ErrorBoundary } from "@components/errorBoundary";
import ProjectModal from "@components/screens/projects/components/projectModal";
import TaskModal from "@components/taskModal";
import FullPageErrorFallback from "@components/fullPageErrorFallback";
import theme from "@styles/theme";

// For providers
const Providers: FC = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <ChakraProvider theme={theme}>
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Box as="main" id="main" width="100%" height="100%">
              {children}
            </Box>
            <ProjectModal />
            <TaskModal />
          </AuthProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </ChakraProvider>
  );
};

const customRender = (ui: any, { route = "/projects", ...restOptions } = {}) => {
  window.history.pushState({}, "Test", route);
  return render(ui, { wrapper: Providers, ...restOptions });
};

export * from "@testing-library/react";

export { customRender as render };

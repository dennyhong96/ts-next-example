import { Flex } from "@chakra-ui/react";

import ErrorBox from "@components/errorBox";

const FullPageErrorFallback = ({ error }: { error: Error | null }) => {
  return (
    <Flex
      height={"100vh"}
      width={"100%"}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <ErrorBox error={error} />
    </Flex>
  );
};

export default FullPageErrorFallback;

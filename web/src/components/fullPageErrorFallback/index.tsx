import { Flex, Text } from "@chakra-ui/react";

const FullPageErrorFallback = ({ error }: { error: Error | null }) => {
  return (
    <Flex
      height={"100vh"}
      width={"100%"}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Text color="red" size="lg">
        {error?.message ?? "An error orrcured."}
      </Text>
    </Flex>
  );
};

export default FullPageErrorFallback;

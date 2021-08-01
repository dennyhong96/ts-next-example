import { FC } from "react";
import { Flex, Text } from "@chakra-ui/react";
import HashLoader from "react-spinners/HashLoader";

const FullPageLoading: FC = () => {
  return (
    <Flex
      height={"100%"}
      width={"100%"}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <HashLoader loading size={25} />
      <Text size="md" marginTop={4}>
        Loading...
      </Text>
    </Flex>
  );
};

export default FullPageLoading;

import { Text } from "@chakra-ui/react";

// User-Defined Type Guards: https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards
const isError = (value: any): value is Error => value?.message;

const ErrorBox = ({ error }: { error: unknown }) => {
  if (isError(error)) {
    return (
      <Text color="red" fontSize="md">
        {error.message}
      </Text>
    );
  }

  return null;
};

export default ErrorBox;

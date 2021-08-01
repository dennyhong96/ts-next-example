import { FC } from "react";
import { Stack, Input, Box, IconButton } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

import UserSelect from "@components/userSelect";
import { IProject } from "../../../../types/projects";

interface IParam {
  name: string;
  personId: string;
}

interface ISearchPanelProps {
  param: Pick<IProject, "name" | "personId">;
  setParam: (newParam: IParam) => void;
}

const SearchPanel: FC<ISearchPanelProps> = (props) => {
  const { param, setParam } = props;

  const { name, personId } = param;

  return (
    <Stack as="form" direction="row" marginBottom={4}>
      <Box position="relative">
        <Input
          value={name ?? ""}
          onChange={(evt) => setParam({ ...param, name: evt.target.value })}
          width={500}
          placeholder="Search projects..."
        />
        <IconButton
          onClick={() => setParam({ ...param, name: "" })}
          position="absolute"
          size="xs"
          borderRadius={4}
          right={2}
          color="gray.400"
          css={`
            top: 50%;
            transform: translateY(-50%);
            z-index: 1;
          `}
          aria-label="Clear"
          icon={<CloseIcon />}
        />
      </Box>

      <Box width={200}>
        <UserSelect
          personId={personId}
          onChange={(newPersonId) => setParam({ ...param, personId: newPersonId })}
        />
      </Box>
    </Stack>
  );
};

export default SearchPanel;

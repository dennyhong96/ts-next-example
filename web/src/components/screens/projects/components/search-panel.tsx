import { FC } from "react";
import { Stack, Input, Select, Box } from "@chakra-ui/react";

import { IUser } from "../index";

interface IParam {
  name: string;
  personId: string;
}

interface ISearchPanelProps {
  param: IParam;
  setParam: (newParam: IParam) => void;
  users: IUser[];
}

const SearchPanel: FC<ISearchPanelProps> = (props) => {
  const { param, setParam, users } = props;

  const { name, personId } = param;

  return (
    <Stack as="form" direction="row">
      <Input value={name} onChange={(evt) => setParam({ ...param, name: evt.target.value })} />

      <Box
        css={`
          width: 200px;
        `}
      >
        <Select
          value={personId}
          onChange={(evt) => setParam({ ...param, personId: evt.target.value })}
        >
          <option value="">Select Person</option>
          {users.map((u: IUser) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </Select>
      </Box>
    </Stack>
  );
};

export default SearchPanel;

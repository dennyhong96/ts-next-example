import { FC } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import dayjs from "dayjs";
import HashLoader from "react-spinners/HashLoader";
import { css } from "@emotion/react";

import { IProject, IUser } from "../index";

interface IListProps {
  list: IProject[];
  users: IUser[];
  isLoading: boolean;
}

const List: FC<IListProps> = (props) => {
  const { list, users, isLoading } = props;

  // TODO: use React Table with sorting
  return (
    <Table variant="simple" position="relative" minHeight={250}>
      <Thead opacity={isLoading ? 0.5 : 1} pointerEvents={isLoading ? "none" : "all"}>
        <Tr>
          <Th>Name</Th>
          <Th>Orgnization</Th>
          <Th>Person</Th>
          <Th>Created At</Th>
        </Tr>
      </Thead>
      <Tbody opacity={isLoading ? 0.5 : 1} pointerEvents={isLoading ? "none" : "all"}>
        {list.map((project: IProject) => (
          <Tr key={project.name}>
            <Td>{project.name}</Td>
            <Td>{project.organization}</Td>
            <Td>
              {users.find((u: IUser) => u.id === project.personId)?.name ?? "No user assigned"}
            </Td>
            <Td>{dayjs(project.created).format("MM-DD-YYYY")}</Td>
          </Tr>
        ))}
      </Tbody>

      <HashLoader
        loading={isLoading}
        size={25}
        css={css`
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        `}
      />
    </Table>
  );
};

export default List;

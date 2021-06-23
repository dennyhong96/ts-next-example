import { FC } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

import { IProject, IUser } from "../index";

interface IListProps {
	list: IProject[];
	users: IUser[];
}

const List: FC<IListProps> = props => {
	const { list, users } = props;

	return (
		<Table variant="simple">
			<Thead>
				<Tr>
					<Th>Name</Th>
					<Th>Person</Th>
				</Tr>
			</Thead>
			<Tbody>
				{list.map((project: IProject) => (
					<Tr key={project.name}>
						<Td>{project.name}</Td>
						<Td>
							{users.find((u: IUser) => u.id === project.personId)?.name ?? "No user assigned"}
						</Td>
					</Tr>
				))}
			</Tbody>
		</Table>
	);
};

export default List;

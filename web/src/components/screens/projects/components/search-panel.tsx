import { FC } from "react";
import { Box, Input, Select } from "@chakra-ui/react";

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

const SearchPanel: FC<ISearchPanelProps> = props => {
	const { param, setParam, users } = props;

	const { name, personId } = param;

	return (
		<Box
			as="form"
			css={`
				display: flex;
				margin-bottom: 2rem;
			`}
		>
			<Input value={name} onChange={evt => setParam({ ...param, name: evt.target.value })} />

			<Select value={personId} onChange={evt => setParam({ ...param, personId: evt.target.value })}>
				<option value="">Select Person</option>
				{users.map((u: IUser) => (
					<option key={u.id} value={u.id}>
						{u.name}
					</option>
				))}
			</Select>
		</Box>
	);
};

export default SearchPanel;

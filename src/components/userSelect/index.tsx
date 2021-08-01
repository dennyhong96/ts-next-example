import React from "react";
import { Select } from "@chakra-ui/react";

import useUsers from "@hooks/useUsers";
import { IUser } from "@localTypes/user";

interface IUserSelectProps {
  personId: string;
  onChange: (newPersonId: string) => void;
  defaultOptionName?: string;
}

const UserSelect = (props: IUserSelectProps) => {
  const { personId, onChange, defaultOptionName } = props;

  const { users } = useUsers();

  return (
    <Select value={personId} onChange={(evt) => onChange(evt.target.value)}>
      <option value="">{defaultOptionName || "Select Person"}</option>
      {users?.map((u: IUser) => (
        <option key={u.id} value={u.id}>
          {u.name}
        </option>
      ))}
    </Select>
  );
};

export default UserSelect;

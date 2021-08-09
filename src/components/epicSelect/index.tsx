import React from "react";
import { Select } from "@chakra-ui/react";

import useEpics from "@hooks/useEpics";
import useEpicsQueryKey from "@hooks/useEpicsQueryKey";
import { IEpic } from "@localTypes/epic";

interface IUserSelectProps {
  epicId: string;
  onChange: (newEpicId: string) => void;
  defaultOptionName?: string;
}

const EpicSelect = (props: IUserSelectProps) => {
  const { epicId, onChange, defaultOptionName } = props;

  const { data: Epics } = useEpics(useEpicsQueryKey());

  return (
    <Select value={epicId} onChange={(evt) => onChange(evt.target.value)}>
      <option value="">{defaultOptionName || "Select Epic"}</option>
      {Epics?.map((epic: IEpic) => (
        <option key={epic.id} value={epic.id}>
          {epic.name}
        </option>
      ))}
    </Select>
  );
};

export default EpicSelect;

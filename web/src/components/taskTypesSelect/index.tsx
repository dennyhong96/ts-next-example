import React from "react";
import { Select } from "@chakra-ui/react";

import useTaskTypes from "@hooks/useTaskTypes";
import { ITaskType } from "@localTypes/taskType";

interface IUserSelectProps {
  taskTypeId: string;
  onChange: (newTaskTypeId: string) => void;
  defaultOptionName?: string;
}

const TaskTypesSelect = (props: IUserSelectProps) => {
  const { taskTypeId, onChange, defaultOptionName } = props;

  const { data: taskTypes } = useTaskTypes();

  return (
    <Select value={taskTypeId} onChange={(evt) => onChange(evt.target.value)}>
      <option value="">{defaultOptionName || "Select Task Type"}</option>
      {taskTypes?.map((tt: ITaskType) => (
        <option key={tt.id} value={tt.id}>
          {tt.name}
        </option>
      ))}
    </Select>
  );
};

export default TaskTypesSelect;

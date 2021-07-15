import { AddIcon } from "@chakra-ui/icons";
import { Button, Input, Stack, Box, useOutsideClick, useToast } from "@chakra-ui/react";
import TaskTypesSelect from "@components/taskTypesSelect";
import UserSelect from "@components/userSelect";
import useAddTasks from "@hooks/useAddTasks";
import { useProjectIdInUrl } from "@hooks/useProjectInUrl";
import useTasksQueryKey from "@hooks/useTasksQueryKey";
import React, { FormEvent, RefObject } from "react";
import { useRef } from "react";
import { useState } from "react";
import { TaskContainer } from "./kanbanColumn";

const CreateTask = ({ kanbanId }: { kanbanId: string }) => {
  const { mutateAsync: addTask } = useAddTasks(useTasksQueryKey());
  const projectId = useProjectIdInUrl();
  const [newTaskName, setNewTaskName] = useState("");
  const [processorId, setProcessorId] = useState("");
  const [taskTypeId, setTaskTypeId] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const taskContainerRef = useRef<HTMLElement | undefined>();

  useOutsideClick({
    ref: taskContainerRef as RefObject<HTMLElement>,
    handler: () => setIsAdding(false),
  });

  const toast = useToast();

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();
    if (!newTaskName || !processorId || !taskTypeId) {
      return toast({
        title: "Missing task info",
        description: "Please enter a name for the task, choose a task type, and a processor.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }

    await addTask({
      name: newTaskName,
      processorId,
      projectId,
      kanbanId,
      typeId: taskTypeId,
    });
    setNewTaskName("");
    setProcessorId("");
    setTaskTypeId("");
    setIsAdding(false);
  };

  return (
    <TaskContainer containerRef={taskContainerRef}>
      {isAdding ? (
        <Box as="form" width="100%" onSubmit={handleSubmit}>
          <Stack>
            <Input
              value={newTaskName}
              onChange={(evt) => setNewTaskName(evt.target.value)}
              placeholder="Task name"
            />

            <TaskTypesSelect
              defaultOptionName="Task type"
              taskTypeId={taskTypeId}
              onChange={(newTaskTypeId) => setTaskTypeId(newTaskTypeId)}
            />

            <UserSelect
              defaultOptionName="Processor"
              personId={processorId}
              onChange={(newProcessorId) => setProcessorId(newProcessorId)}
            />

            <Button type="submit" colorScheme="teal">
              Create task
            </Button>
          </Stack>
        </Box>
      ) : (
        <Button leftIcon={<AddIcon />} onClick={() => setIsAdding(true)}>
          Add new task
        </Button>
      )}
    </TaskContainer>
  );
};

export default CreateTask;

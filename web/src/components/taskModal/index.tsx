import React, { FormEvent, Fragment, useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  Stack,
  useToast,
} from "@chakra-ui/react";

import useTaskModal from "@hooks/useTaskModal";
import useEditTask from "@hooks/useEditTask";
import useTasksQueryKey from "@hooks/useTasksQueryKey";
import FullPageLoading from "@components/fullPageLoading";
import TaskTypesSelect from "@components/taskTypesSelect";
import UserSelect from "@components/userSelect";

const INITIAL_FORM_STATE = {
  name: "",
  processorId: "",
  projectId: "",
  epicId: "",
  kanbanId: "",
  typeId: "",
  note: "",
};

const TaskModal = () => {
  const { close, isLoading, taskModalOpen, editingTask } = useTaskModal();
  const { mutateAsync: editTask } = useEditTask(useTasksQueryKey());
  const [form, setForm] = useState(INITIAL_FORM_STATE);
  const toast = useToast();

  useEffect(() => {
    if (!editingTask) return;
    // eslint-disable-next-line
    const { id, ...restTaskInfo } = editingTask;
    setForm(restTaskInfo);
  }, [editingTask]);

  const handleClose = () => {
    close();
    setForm(INITIAL_FORM_STATE);
  };

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();
    if (!editingTask) return;
    if (!form.name || !form.processorId || !form.typeId) {
      return toast({
        title: "Missing task info",
        description: "Please enter a name for the task, choose a task type, and a processor.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }

    await editTask({
      ...form,
      id: editingTask.id,
    });
    handleClose();
  };

  return (
    <Modal isOpen={taskModalOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent justifyContent="center" minHeight={500} width="90%" maxWidth={550}>
        {isLoading ? (
          <FullPageLoading />
        ) : (
          <Fragment>
            <ModalHeader>Edit task - {editingTask?.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack as="form" onSubmit={handleSubmit}>
                <FormControl id="task-name">
                  <FormLabel>Task name</FormLabel>
                  <Input
                    placeholder="Task name"
                    value={form.name}
                    onChange={(evt) => setForm((prev) => ({ ...prev, name: evt.target.value }))}
                  />
                </FormControl>

                <FormControl id="task-type">
                  <FormLabel>Task type</FormLabel>
                  <TaskTypesSelect
                    defaultOptionName="Task type"
                    taskTypeId={form.typeId}
                    onChange={(newTypeId) => setForm((prev) => ({ ...prev, typeId: newTypeId }))}
                  />
                </FormControl>

                <FormControl id="task-processor">
                  <FormLabel>Task processor</FormLabel>
                  <UserSelect
                    defaultOptionName="Processor"
                    personId={form.processorId}
                    onChange={(newProcessorId) =>
                      setForm((prev) => ({ ...prev, processorId: newProcessorId }))
                    }
                  />
                </FormControl>

                <FormControl id="task-note">
                  <FormLabel>Task note</FormLabel>
                  <Textarea
                    value={form.note}
                    placeholder="Task note"
                    onChange={(evt) => setForm((prev) => ({ ...prev, note: evt.target.value }))}
                  />
                </FormControl>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={handleClose}>
                Cancel
              </Button>
              <Button colorScheme="teal" onClick={handleSubmit}>
                Confirm
              </Button>
            </ModalFooter>
          </Fragment>
        )}
      </ModalContent>
    </Modal>
  );
};

export default TaskModal;

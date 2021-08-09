import { FormEvent, Fragment, RefObject, useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
  Heading,
  Stack,
  FormControl,
  FormLabel,
  Box,
} from "@chakra-ui/react";
import ErrorBox from "@components/errorBox";
import useAddEpics from "@hooks/useAddEpics";
import useEpicsQueryKey from "@hooks/useEpicsQueryKey";
import generateId from "@utils/generateId";
import { DateRangePicker, OnChangeProps } from "react-date-range";

const INITIAL_FORM_STATE = {
  name: "",
  start: -1,
  end: -1,
};

const CreateEpicDrawer = (props: {
  returnFocusRef?: RefObject<HTMLElement>;
  isOpen: boolean;
  onClose: () => void;
  projectId: string | undefined;
}) => {
  const { returnFocusRef, isOpen, onClose, projectId } = props;

  const [form, setForm] = useState(INITIAL_FORM_STATE);
  const { mutateAsync: addEpic, error } = useAddEpics(useEpicsQueryKey());

  const handleClose = () => {
    onClose();
    setForm(INITIAL_FORM_STATE);
  };

  const handleAddEpic = async (evt: FormEvent) => {
    evt.preventDefault();
    if (!projectId) return;
    const newEpicId = generateId({ type: "epics" });
    await addEpic({ ...form, newEpicId, projectId });
    handleClose();
  };

  const handleDate = (range: OnChangeProps) => {
    const {
      // @ts-ignore
      selection: { endDate, startDate },
    } = range;
    setForm((prev) => ({
      ...prev,
      start: new Date(startDate).getTime(),
      end: new Date(endDate).getTime(),
    }));
  };

  const selectionRange = {
    startDate: form.start === -1 ? new Date() : new Date(form.start),
    endDate: form.end === -1 ? new Date() : new Date(form.end),
    key: "selection",
  };

  return (
    <Drawer
      size="lg"
      isOpen={isOpen}
      placement="right"
      onClose={handleClose}
      finalFocusRef={returnFocusRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <Fragment>
          <DrawerCloseButton />
          <DrawerHeader>
            <Heading>Create Epic</Heading>
          </DrawerHeader>

          <DrawerBody display="flex" alignItems="center" justifyContent="center">
            <Box as="form" width="100%" maxWidth={600} onSubmit={handleAddEpic}>
              <Stack>
                <FormControl id="project-modal-name">
                  <FormLabel>Epic Name</FormLabel>
                  <Input
                    type="text"
                    value={form.name}
                    onChange={(evt) => setForm((prev) => ({ ...prev, name: evt.target.value }))}
                    placeholder="Please enter epic name"
                  />
                </FormControl>

                <FormControl id="project-modal-name">
                  <FormLabel>Epic Name</FormLabel>
                  <DateRangePicker ranges={[selectionRange]} onChange={handleDate} />
                </FormControl>

                <ErrorBox error={error} />
              </Stack>
            </Box>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={handleClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleAddEpic}>
              Add Epic
            </Button>
          </DrawerFooter>
        </Fragment>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateEpicDrawer;

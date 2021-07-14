import React from "react";
import { Box, Flex, Heading, Text, Button } from "@chakra-ui/react";

import useURLQueryParams from "@hooks/useURLQueryParams";
import useProjects from "@hooks/useProjects";
import useUsers from "@hooks/useUsers";
import List from "./components/list";
import SearchPanel from "./components/search-panel";
import useDebounce from "@hooks/useDebounce";
import useProjectModal from "@hooks/useProjectModal";

export interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface IProject {
  id: string;
  name: string;
  organization: string;
  personId: string;
  created: string;
  pin?: boolean;
}

export interface IParam {
  name: string;
  personId: string;
}

const ProjectsScreen = () => {
  const { open } = useProjectModal();
  const [param, setParam] = useURLQueryParams(["name", "personId"]);
  const debouncedParam = useDebounce(param as IParam, 200);

  const { users } = useUsers();
  const { projects, isLoading, error, retry } = useProjects(debouncedParam);

  // console.log({ param });
  // console.log({ projects });
  // console.log({ users });

  return (
    <Box padding={4}>
      <Flex justifyContent="space-between">
        <Heading mb={4}>Projects List</Heading>
        <Button colorScheme="teal" size="sm" marginTop={4} onClick={open}>
          Create Project
        </Button>
      </Flex>

      <SearchPanel param={param as IParam} setParam={setParam} />

      {error ? (
        <Text color="red" fontSize="md">
          {error.message}
        </Text>
      ) : null}

      <List list={projects ?? []} users={users ?? []} isLoading={isLoading} refresh={retry} />
    </Box>
  );
};

export default ProjectsScreen;

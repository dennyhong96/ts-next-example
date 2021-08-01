import React from "react";
import { Box, Flex, Heading, Button } from "@chakra-ui/react";

import useProjects from "@hooks/useProjects";
import useUsers from "@hooks/useUsers";
import List from "./components/list";
import SearchPanel from "./components/search-panel";
import useDebounce from "@hooks/useDebounce";
import useProjectModal from "@hooks/useProjectModal";
import ErrorBox from "@components/errorBox";
import useProjectsSearchParams from "@hooks/useProjectsSearchParams";

export interface IParam {
  name: string;
  personId: string;
}

const ProjectsScreen = () => {
  const { open } = useProjectModal();
  const [param, setParam] = useProjectsSearchParams();

  const debouncedParam = useDebounce(param as IParam, 200);

  const { users } = useUsers();
  const { data: projects, isLoading, error } = useProjects(debouncedParam);

  // console.log({ param });
  // console.log({ projects });
  // console.log({ users });

  return (
    <Box padding={4}>
      <Flex justifyContent="space-between">
        <Heading mb={4}>Projects List</Heading>
        <Button colorScheme="teal" marginTop={4} onClick={open}>
          Create Project
        </Button>
      </Flex>

      <SearchPanel param={param as IParam} setParam={setParam} />

      <ErrorBox error={error} />

      <List list={projects ?? []} users={users ?? []} isLoading={isLoading} />
    </Box>
  );
};

export default ProjectsScreen;

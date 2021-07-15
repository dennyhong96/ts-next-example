import React, { FC } from "react";
import NextLink from "next/link";
import { Link, Stack, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";

const ProjectLayout: FC = ({ children }) => {
  const router = useRouter();
  const projectId = router.query.id;

  return (
    <Stack direction="row" height="100%">
      <Stack as="aside" padding={4} width="200px" borderRightWidth={1} borderRightColor="gray.100">
        <NextLink href={`/projects/${projectId}/kanban`} passHref>
          <Link color="teal">Kanban Board</Link>
        </NextLink>

        <NextLink href={`/projects/${projectId}/epic`} passHref>
          <Link color="teal">Epic</Link>
        </NextLink>
      </Stack>

      <Box as="main" flex="1">
        {children}
      </Box>
    </Stack>
  );
};

export default ProjectLayout;

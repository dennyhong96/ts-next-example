import React, { FC } from "react";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";
import { useRouter } from "next/router";

const ProjectLayout: FC = ({ children }) => {
  const router = useRouter();
  const projectId = router.query.id;

  return (
    <div>
      <NextLink href={`/projects/${projectId}/kanban`} passHref>
        <Link color="teal">Kanban Board</Link>
      </NextLink>

      <NextLink href={`/projects/${projectId}/epic`} passHref>
        <Link color="teal">Epic</Link>
      </NextLink>

      {children}
    </div>
  );
};

export default ProjectLayout;

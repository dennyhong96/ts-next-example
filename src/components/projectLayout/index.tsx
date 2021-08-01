import React, { FC } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { Link, Stack, Box, Flex } from "@chakra-ui/react";

const ProjectLayout: FC = ({ children }) => {
  const router = useRouter();
  const projectId = router.query.id;

  const routeMenuItems = [
    {
      label: "Kanban Board",
      path: `/projects/${projectId}/kanban`,
    },
    {
      label: "Epic",
      path: `/projects/${projectId}/epic`,
    },
  ];

  return (
    <Flex direction="row" height="100%" width="100%">
      <Stack
        as="aside"
        direction="column"
        padding={4}
        width={200}
        flexBasis={200}
        flexShrink={0}
        flexGrow={0}
        borderRightWidth={1}
        borderRightColor="gray.100"
      >
        {routeMenuItems.map((routeMenuItem) => {
          const isActive = router.asPath === routeMenuItem.path;
          return (
            <NextLink key={routeMenuItem.label} href={routeMenuItem.path} passHref>
              <Link
                padding={2}
                borderRadius={4}
                transition="0.2s ease"
                background={isActive ? "rgba(0, 0, 0, 0.035)" : "transparent"}
                fontWeight={isActive ? 600 : 400}
                color={"gray.700"}
                css={`
                  &:hover,
                  &:focus,
                  &:active {
                    color: teal;
                    text-decoration: none;
                  }
                `}
              >
                {routeMenuItem.label}
              </Link>
            </NextLink>
          );
        })}
      </Stack>

      <Box width="calc(100% - 200px)" flexBasis="calc(100% - 200px)" flexShrink={0} flexGrow={0}>
        {children}
      </Box>
    </Flex>
  );
};

export default ProjectLayout;

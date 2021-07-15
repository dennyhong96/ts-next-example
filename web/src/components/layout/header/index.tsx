import NextLink from "next/link";
import {
  Flex,
  Button,
  Heading,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  Divider,
  Box,
} from "@chakra-ui/react";
import SvgClipboardCheck from "@components/icons/ClipboardCheck";
import { ChevronDownIcon } from "@chakra-ui/icons";

import { useAuth } from "@contexts/auth";
import { Fragment, useState } from "react";
import useProjects from "@hooks/useProjects";
import useProjectModal from "@hooks/useProjectModal";

const User = () => {
  const { logout, user } = useAuth();

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        {user ? user.name || user.email.split("@")[0] : "Profile"}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={logout}>Signout</MenuItem>
      </MenuList>
    </Menu>
  );
};

const Header = () => {
  const { open } = useProjectModal();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { data: projects } = useProjects();
  const pinnedProjects = projects?.filter((p) => p.pin);

  return (
    <Flex
      as="header"
      justifyContent="space-between"
      backgroundColor="white"
      alignItems="center"
      padding={4}
      boxShadow="0 0 5px 0 rgba(0, 0, 0, 0.1)"
    >
      <Stack direction="row" alignItems="center">
        <NextLink href="/" passHref>
          <Link>
            <SvgClipboardCheck style={{ height: "3rem" }} />
          </Link>
        </NextLink>

        <Box
          onMouseEnter={() => setIsPopoverOpen(true)}
          onMouseLeave={() => setIsPopoverOpen(false)}
        >
          <Popover isOpen={isPopoverOpen} onClose={() => setIsPopoverOpen(false)}>
            <PopoverTrigger>
              <span>Projects</span>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverHeader>
                <Heading size="sm">Favorite Projects:</Heading>
              </PopoverHeader>
              <PopoverBody>
                {pinnedProjects?.map((pp) => (
                  <Fragment key={pp.name}>
                    <span>{pp.name}</span>
                    <Divider />
                  </Fragment>
                ))}

                <Button colorScheme="teal" marginTop={4} onClick={open}>
                  Create Project
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>

        <span>Users</span>
      </Stack>

      <User />
    </Flex>
  );
};

export default Header;

import React from "react";
import { IconButton } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

interface IStarProps extends Omit<React.ComponentProps<typeof IconButton>, "onClick"> {
  pinned: boolean;
  onClick: (pinned: boolean) => void;
}

const Star = (props: IStarProps) => {
  const { pinned, onClick, ...restProps } = props;

  return (
    <IconButton
      aria-label="Pin"
      icon={<StarIcon />}
      color={pinned ? "yellow.300" : "gray.300"}
      onClick={() => onClick(!pinned)}
      variant="ghost"
      size="sm"
      borderRadius={4}
      {...restProps}
    />
  );
};

export default Star;

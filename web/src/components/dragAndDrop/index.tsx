import React, { CSSProperties, Fragment, ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import { SerializedStyles } from "@emotion/react";
import {
  Draggable,
  DraggableProps,
  Droppable,
  DroppableProps,
  DroppableProvided,
  DroppableProvidedProps,
} from "react-beautiful-dnd";

type DropProps = Omit<DroppableProps, "children"> & { children: ReactNode };

export const Drop = ({ children, ...restProps }: DropProps) => {
  return (
    <Droppable {...restProps}>
      {(provided) => {
        if (React.isValidElement(children)) {
          return (
            <Fragment>
              {React.cloneElement(children, {
                ...provided.droppableProps,
                ref: provided.innerRef,
                provided,
              })}
              {provided.placeholder}
            </Fragment>
          );
        } else {
          return <div />;
        }
      }}
    </Droppable>
  );
};

type DropChildProps = Partial<
  {
    provided: DroppableProvided;
    css?: string | SerializedStyles;
    style?: CSSProperties;
  } & DroppableProvidedProps
> &
  React.HTMLAttributes<HTMLDivElement>;

export const DropChild = React.forwardRef<HTMLDivElement, DropChildProps>(
  ({ children, css = "", style = {}, ...restProps }, ref) => {
    return (
      <Box as="div" ref={ref} {...restProps} css={css} style={style}>
        {children}
        {restProps.provided?.placeholder}
      </Box>
    );
  },
);
DropChild.displayName = "DropChild";

type DragProps = Omit<DraggableProps, "children"> & { children: ReactNode };

export const Drag = ({ children, ...props }: DragProps) => {
  return (
    <Draggable {...props}>
      {(provided) => {
        if (React.isValidElement(children)) {
          return React.cloneElement(children, {
            ...provided.draggableProps,
            ...provided.dragHandleProps,
            ref: provided.innerRef,
          });
        }
        return <div />;
      }}
    </Draggable>
  );
};

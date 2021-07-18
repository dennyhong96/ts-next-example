import React, { ReactNode } from "react";
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
          return React.cloneElement(children, {
            ...provided.droppableProps,
            ref: provided.innerRef,
            provided,
          });
        } else {
          return <div />;
        }
      }}
    </Droppable>
  );
};

type DropChildProps = Partial<{ provided: DroppableProvided } & DroppableProvidedProps> &
  React.HTMLAttributes<HTMLDivElement>;

export const DropChild = React.forwardRef<HTMLDivElement, DropChildProps>((props, ref) => {
  return <div ref={ref} {...props} />;
});
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

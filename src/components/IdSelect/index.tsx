import React from "react";
import { Select } from "@chakra-ui/react";

import { Raw } from "@localTypes/index";

// Utility type to get all props types from a React component
type SelectProps = React.ComponentProps<typeof Select>;

interface IdSelectProps extends Omit<SelectProps, "onChange"> {
  value: Raw | null | undefined;
  onChange: (value?: number) => void;
  defaultOptionName?: string;
  options?: { name: string; id: number }[];
}

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));

/**
 * value accepts multiple types
 * only passes number|undefined type to onChange
 * isNaN(Number(value)) means currently on default option
 * undefined is passed to onChange if default options is selected
 */
const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionName, options, ...restProps } = props;

  return (
    <Select
      value={toNumber(value)}
      onChange={(evt) => onChange(toNumber(evt.target.value) || undefined)} // 0 -> undefined
      {...restProps}
    >
      {defaultOptionName && <option value={0}>{defaultOptionName}</option>}
      {options?.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </Select>
  );
};

export default IdSelect;

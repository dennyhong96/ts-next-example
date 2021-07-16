import React, { useRef, useEffect, LegacyRef } from "react";
import Mark, { default as _Mark } from "mark.js";

import { Text } from "@chakra-ui/react";

const MarkKeyword = ({ name, keyword }: { name: string; keyword: string }) => {
  const textRef = useRef<HTMLElement | undefined>();
  const instanceRef = useRef<Mark | undefined>();

  useEffect(() => {
    if (!textRef.current) return;
    if (!instanceRef.current) {
      instanceRef.current = new _Mark(textRef.current);
    }
    instanceRef.current.unmark();
    instanceRef.current.mark(keyword);
  }, [keyword]);

  return <Text ref={textRef as LegacyRef<HTMLParagraphElement> | undefined}>{name}</Text>;
};

export default MarkKeyword;

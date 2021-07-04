import { useEffect, useRef } from "react";

const useDocumentTitle = (title: string, keepOnUnmount = true) => {
  const prevTitleRef = useRef<string | null>(null);

  console.log({ prevTitleRef });

  useEffect(() => {
    prevTitleRef.current = document.title;
    document.title = title;

    return () => {
      if (keepOnUnmount) return;
      document.title = prevTitleRef.current ?? "";
    };
  }, [title, keepOnUnmount]);
};

export default useDocumentTitle;

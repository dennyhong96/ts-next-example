import { useState, useEffect, useCallback } from "react";
import queryString, { StringifiableRecord } from "query-string";
import { cleanObject } from "@utils/cleanObject";

const useURLQueryParams = <K extends string>(keys: K[]) => {
  const filterQueryParams = () => {
    const queryParamsObj = queryString.parseUrl(window.location.href).query;
    return keys.reduce(
      (acc, key) => ({ ...acc, [key]: queryParamsObj[key] ?? "" }),
      {} as { [key in K]: unknown },
    );
  };

  const [queryObj, setQueryObj] = useState(
    // Lazy initialization
    filterQueryParams,
  );

  useEffect(() => {
    const handlePopState = () => setQueryObj(filterQueryParams());
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
    // eslint-disable-next-line
  }, []); // primitive types and react states can be put into deps, objects can NOT be put into deps.

  const setQuery = useCallback(
    (newQuery: Partial<{ [key in K]: unknown }>) => {
      const newQueryObj = cleanObject({ ...queryObj, ...newQuery }) as { [key in K]: unknown }; // TODO: type

      setQueryObj(newQueryObj);

      const newhref = queryString.stringifyUrl({
        url: `${window.location.origin}${window.location.pathname}`,
        query: newQueryObj as StringifiableRecord,
      });
      history.pushState({}, "", newhref);
    },
    [queryObj],
  );

  return [queryObj, setQuery] as const; // `as cont` solves `tuple` return type issue
};

export default useURLQueryParams;

// const a = ["jack", 12, { gender: "male" }] as const;

import { useState, useEffect } from "react";
import queryString from "query-string";
import { cleanObject } from "@utils/cleanObject";

const useURLQueryParams = <K extends string>(keys: K[]) => {
  const filterQueryParams = () => {
    const queryParamsObj = queryString.parseUrl(window.location.href).query;
    return keys.reduce(
      (acc, key) => ({ ...acc, [key]: queryParamsObj[key] ?? "" }),
      {} as { [key in K]: string },
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

  const setQuery = (newQuery: Partial<{ [key in K]: string }>) => {
    const newQueryObj = cleanObject({ ...queryObj, ...newQuery }) as { [key in K]: string }; // TODO: type

    setQueryObj(newQueryObj);

    const newhref = queryString.stringifyUrl({
      url: `${window.location.origin}${window.location.pathname}`,
      query: newQueryObj,
    });
    history.pushState({}, "", newhref);
  };

  return [queryObj, setQuery] as const; // `as cont` solves `tuple` return type issue
};

export default useURLQueryParams;

// const a = ["jack", 12, { gender: "male" }] as const;

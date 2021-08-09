import { useState, useEffect, useCallback } from "react";
import queryString, { StringifiableRecord } from "query-string";
import { cleanObject } from "@utils/cleanObject";
import { useRouter } from "next/router";

const useURLQueryParams = <K extends string>(keys: K[]) => {
  const router = useRouter();

  const filterQueryParams = useCallback(() => {
    const queryParamsObj = queryString.parseUrl(window.location.href).query;
    return keys.reduce(
      (acc, key) => ({ ...acc, [key]: queryParamsObj[key] ?? "" }),
      {} as { [key in K]: unknown },
    );
  }, [keys]);

  const [queryObj, setQueryObj] = useState(
    // Lazy initialization
    filterQueryParams,
  );

  useEffect(() => {
    const handleRouting = () => {
      setQueryObj(filterQueryParams());
    };
    router.events.on("routeChangeComplete", handleRouting);
    return () => {
      router.events.off("routeChangeComplete", handleRouting);
    };
  }, [filterQueryParams, router.events]);

  useEffect(() => {
    const handleUrlChange = () => {
      setQueryObj(filterQueryParams());
    };

    window.addEventListener("popstate", handleUrlChange); // When browser back and forward button is clicked
    window.addEventListener("urlChange", handleUrlChange); // When setQueryObj is used
    return () => {
      window.removeEventListener("popstate", handleUrlChange);
      window.removeEventListener("urlChange", handleUrlChange);
    };

    // eslint-disable-next-line
  }, []); // primitive types and react states can be put into deps, objects can NOT be put into deps.

  const setQuery = useCallback(
    (newQuery: Partial<{ [key in K]: unknown }>) => {
      const newQueryObj = cleanObject({ ...queryObj, ...newQuery }) as { [key in K]: unknown }; // TODO: type

      // Modify url
      const newhref = queryString.stringifyUrl({
        url: `${window.location.origin}${window.location.pathname}`,
        query: newQueryObj as StringifiableRecord,
      });
      history.pushState({}, "", newhref);

      setQueryObj(newQueryObj);

      // broadcast other hook instances to refresh state
      window.dispatchEvent(new Event("urlChange"));
    },
    [queryObj],
  );

  return [queryObj, setQuery] as const; // `as cont` solves `tuple` return type issue
};

export default useURLQueryParams;

// const a = ["jack", 12, { gender: "male" }] as const;

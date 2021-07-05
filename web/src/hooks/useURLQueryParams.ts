import { useState, useEffect } from "react";
import queryString from "query-string";

type TQueryObj = { [key in string]: string | string[] };

const useURLQueryParams = (keys: string[]) => {
  const filterQueryParams = () => {
    const queryParamsObj = queryString.parseUrl(window.location.href).query;
    return keys.reduce((acc, k) => ({ ...acc, [k]: queryParamsObj[k] ?? "" }), {} as TQueryObj);
  };

  const [queryObj, setQueryObj] = useState(
    // Lazy initialization
    filterQueryParams,
  );

  useEffect(() => {
    function handlePopState() {
      const newQueryParamsObj = filterQueryParams();
      setQueryObj(newQueryParamsObj);
    }
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
    // eslint-disable-next-line
  }, []);

  const setQuery = (newQuery: TQueryObj) => {
    const newQueryObj = { ...queryObj, ...newQuery };
    setQueryObj(newQueryObj);
    const newhref = queryString.stringifyUrl({
      url: `${window.location.origin}${window.location.pathname}`,
      query: newQueryObj,
    });
    history.pushState({}, "", newhref);
  };

  return [queryObj, setQuery] as const;
};

export default useURLQueryParams;

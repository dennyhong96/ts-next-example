import { useCallback, useReducer, useState } from "react";
import useMountedRef from "@hooks/useMountedRef";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
  stat: "idle",
  data: null,
  error: null,
};

const defaultConfig = {
  throwOnError: false,
};

// Prevent memory leak
const useSafeDispatch = <T>(dispatch: (action: T) => void) => {
  const isMountedRef = useMountedRef();

  return useCallback(
    (action: T) => {
      return isMountedRef.current ? dispatch(action) : void 0; // `void 0` is equal to `undefined`
    },
    [dispatch, isMountedRef],
  );
};

const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
  const [state, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }),
    {
      ...defaultInitialState,
      ...initialState,
    },
  );

  // eslint-disable-next-line
  const [retry, setRetry] = useState(() => () => {}); // Lazy Init

  const safeDispatch = useSafeDispatch(dispatch);

  const setData = useCallback(
    (data: D) =>
      safeDispatch({
        data,
        stat: "success",
        error: null,
      }),
    [safeDispatch],
  );

  const setError = useCallback(
    (error: Error) =>
      safeDispatch({
        error,
        data: null,
        stat: "error",
      }),
    [safeDispatch],
  );

  // run async request
  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error("Please pass in a promise");
      }

      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig.retry(), runConfig);
        }
      }); // Lazy Update

      safeDispatch({ stat: "loading" });

      return promise
        .then((data) => {
          setData(data);
          return data;
        })
        .catch((err) => {
          setError(err);
          if (initialConfig?.throwOnError) {
            return Promise.reject(err);
          }
          return err;
        });
    },
    [setData, setError, initialConfig?.throwOnError, safeDispatch],
  );

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    retry,
    setData,
    setError,
    ...state,
  };
};

export default useAsync;

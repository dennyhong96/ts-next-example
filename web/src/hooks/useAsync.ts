import { useState } from "react";
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

const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });

  // eslint-disable-next-line
  const [retry, setRetry] = useState(() => () => {}); // Lazy Init

  const isMountedRef = useMountedRef();

  const setData = (data: D) =>
    setState({
      data,
      stat: "success",
      error: null,
    });

  const setError = (error: Error) =>
    setState({
      error,
      data: null,
      stat: "error",
    });

  // run async request
  const run = (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
    if (!promise || !promise.then) {
      throw new Error("Please pass in a promise");
    }

    setRetry(() => () => {
      if (runConfig?.retry) {
        run(runConfig.retry(), runConfig);
      }
    }); // Lazy Update

    setState({ ...state, stat: "loading" });

    return promise
      .then((data) => {
        // Prevent memory leak
        if (isMountedRef.current) {
          setData(data);
        }
        return data;
      })
      .catch((err) => {
        setError(err);
        if (initialConfig?.throwOnError) {
          return Promise.reject(err);
        }
        return err;
      });
  };

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

import useAsync from "@hooks/useAsync";
import { renderHook, act } from "../test-utils";

const DEFAULT_STATE: ReturnType<typeof useAsync> = {
  stat: "idle",
  data: null,
  error: null,
  isIdle: true,
  isLoading: false,
  isError: false,
  isSuccess: false,
  run: expect.any(Function), // Any function is fine
  setData: expect.any(Function),
  setError: expect.any(Function),
  retry: expect.any(Function),
};

const LOADING_STATE: ReturnType<typeof useAsync> = {
  ...DEFAULT_STATE,
  stat: "loading",
  isIdle: false,
  isLoading: true,
};

const SUCCESS_STATE: ReturnType<typeof useAsync> = {
  ...DEFAULT_STATE,
  stat: "success",
  isIdle: false,
  isSuccess: true,
};

describe("hooks/useAsync", () => {
  test.only("Should handle async actions", async () => {
    let resolve: any, reject;

    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });

    const { result } = renderHook(() => useAsync());

    console.log(result.current);
    expect(result.current).toBeTruthy();
    expect(result.current).toEqual(DEFAULT_STATE);

    let p: Promise<any>;
    // use act whenever the function changes state, because state change is async
    act(() => {
      p = result.current.run(promise);
    });

    console.log(result.current);
    expect(result.current).toBeTruthy();
    expect(result.current).toEqual(LOADING_STATE);

    const resolvedValue = { mockedValue: "resolved" };
    await act(async () => {
      resolve(resolvedValue);
      await p;
    });

    console.log(result.current);
    expect(result.current).toBeTruthy();
    expect(result.current).toEqual({
      ...SUCCESS_STATE,
      data: resolvedValue,
    });
  });
});

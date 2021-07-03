import { useEffect } from "react";

const useMount = (callback: () => void): void => {
  useEffect(() => {
    callback();
    // TODO: infinite render if callback added to deps
    // eslint-disable-next-line
  }, []);
};

export default useMount;

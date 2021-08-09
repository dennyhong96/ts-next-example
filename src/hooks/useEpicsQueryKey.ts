import useEpicsSearchParams from "./useEpicsSearchParams";

const useEpicsQueryKey = () => {
  return ["epics", useEpicsSearchParams()];
};

export default useEpicsQueryKey;

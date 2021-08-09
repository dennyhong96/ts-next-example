import React, { ProfilerOnRenderCallback, ProfilerProps } from "react";

type TProfilerProps = {
  metadata?: any;
  targetPhases?: ("mount" | "update")[];
} & Omit<ProfilerProps, "onRender">;

let batch: unknown[] = [];

const sendReports = (batchedReports: typeof batch) => {
  console.log("Profiler Reoprts", batchedReports); // Log, or send to analytics DB
};

const batchReports = () => {
  if (!batch.length) return;
  const batchedReports = [...batch];
  sendReports(batchedReports);
  batch = [];
};

setInterval(batchReports, 5000); // Batch profile reports every 5 second

const Profiler = ({ metadata, targetPhases, children, ...restProps }: TProfilerProps) => {
  const reportProfile: ProfilerOnRenderCallback = (
    id, // the "id" prop of the Profiler tree that has just committed
    phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
    actualDuration, // time spent rendering the committed update
    baseDuration, // estimated time to render the entire subtree without memoization
    startTime, // when React began rendering this update
    commitTime, // when React committed this update
    interactions, // the Set of interactions belonging to this update
  ) => {
    // Only care about target phases
    if (!targetPhases || targetPhases.includes(phase)) {
      batch.push({
        id,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime,
        interactions,
        metadata,
      });
    }
  };

  return (
    <React.Profiler onRender={reportProfile} {...restProps}>
      {children}
    </React.Profiler>
  );
};

export default Profiler;

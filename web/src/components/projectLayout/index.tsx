import React, { FC } from "react";

const ProjectLayout: FC = ({ children }) => {
  return (
    <div>
      Sidebar
      {children}
    </div>
  );
};

export default ProjectLayout;

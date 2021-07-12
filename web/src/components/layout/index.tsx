import { useAuth } from "@contexts/auth";
import { Fragment, ReactNode } from "react";

import Header from "./header";

const Layout = ({ children, projectButton }: { children: ReactNode; projectButton: ReactNode }) => {
  const { user } = useAuth();
  return user ? (
    <Fragment>
      <Header projectButton={projectButton} />
      {children}
    </Fragment>
  ) : null;
};

export default Layout;
